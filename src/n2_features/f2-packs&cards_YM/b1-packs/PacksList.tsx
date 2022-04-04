import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./PacksList.module.css"

import {useDispatch} from "react-redux";
import {useDebounce} from "use-debounce";
import {useNavigate} from "react-router-dom";

import DoubleRange from "../../../n1_main/m1-ui/doubleRange/DoubleRange";
import TablesPagination from "../../../n1_main/m1-ui/common/pagination/TablePagination";
import {packsActions} from "../../../n1_main/m2-bll/r2-actions/ActionsPacks";
import {useFridaySelector} from "../../../n1_main/m2-bll/store";
import {InitialCardPacksType, ModeTypes, PackType} from "../../../n1_main/m2-bll/r1-reducers/packsReducer";
import {packsTC} from "../../../n1_main/m2-bll/r3-thunks/ThunkPacks";
import {RoutesXPaths} from "../../../n1_main/m1-ui/routes/routes";
import TableHeader from "../../../n1_main/m1-ui/common/table/TableHeader";
import OnlyOnePackComponent from "./OnlyOnePackComponent";
import {Nullable} from "../../../types/Nullable";
import GlobalError from "../../../n1_main/m1-ui/common/GlobalError/GlobalError";
import Modal from "../../../n1_main/m1-ui/common/ModalWindow/ModalWindow";
import AddPackComponent from "./AddPackComponent";
import {setGlobalErrorAC} from "../../../n1_main/m2-bll/r1-reducers/app-reducer";

const PacksList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const myId = useFridaySelector<string>(state => state.profile.profile._id)
    const packsState = useFridaySelector<InitialCardPacksType>(state => state.packs)
    const packs = useFridaySelector<PackType[]>(state => state.packs.cardPacks)
    const globalError = useFridaySelector<string>(state => state.app.globalError)
    const packMode = useFridaySelector<ModeTypes>(state => state.packs.mode)

    const debouncedSearch = useDebounce<string>(packsState.packName, 1000)
    const debouncedMIN = useDebounce<number>(packsState.minCardsCount, 1000)
    const debouncedMAX = useDebounce<number>(packsState.maxCardsCount, 1000)

    const [selected, setSelected] = useState<'MY' | 'ALL'>('ALL')

    const selectMyOrAll = (value: Nullable<string>) => {
        dispatch(packsActions.allMyAC(value))
        value
            ? setSelected('MY')
            : setSelected('ALL')
    }

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(packsActions.searchAC(e.currentTarget.value))
    }

    const runToCards = (packId: string) => {
        dispatch(packsActions.allMyAC(''))
        dispatch(packsActions.searchAC(''))
        dispatch(packsActions.pageAC(1))
        dispatch(packsActions.minAC(0))
        dispatch(packsActions.maxAC(100))

        navigate(`${RoutesXPaths.CARDS}/${packId}`)
    }

    useEffect(() => {
        dispatch(packsTC())
    }, [debouncedSearch[0], packsState.user_id, debouncedMIN[0], debouncedMAX[0], packsState.pageCount,
        packsState.page, packsState.updated])

    return (
        <div className={style.packsListBlock}>

            <div className={style.showPacks}>
                <h4 className={style.title}>
                    Show packs cards
                </h4>
                <button
                    disabled={isLoad}
                    className={selected === "MY" ? style.selected : style.hoverSelected}
                    onClick={() => selectMyOrAll(myId)}>
                    My
                </button>
                <button
                    disabled={isLoad}
                    className={selected === "ALL" ? style.selected : style.hoverSelected}
                    onClick={() => selectMyOrAll(null)}>
                    All
                </button>
                <h4 className={style.title}>
                    Number of cards
                </h4>
                <DoubleRange/>
                <div className={style.rangeValue}>
                    <div className={style.rangeValue__item}>min : {packsState.minCardsCount}</div>
                    <div className={style.rangeValue__item}>max : {packsState.maxCardsCount}</div>
                </div>
            </div>

            <div className={style.packsList}>
                <div>
                    <h2 className={style.title}>Pack list</h2>
                    <div className={style.searchContainer}>
                        <input
                            placeholder={"Search..."}
                            value={packsState.packName}
                            onChange={onChangeSearchInput}
                            disabled={isLoad}/>
                        <button
                            disabled={isLoad}
                            className={style.buttonSearch}
                            onClick={() => {
                                dispatch(packsActions.packModeAC('add'))
                            }}
                        >
                            Add New
                        </button>
                    </div>
                </div>
                <div className={style.cardsBlock}>
                    <TableHeader/>
                    {
                        packs.map((tableRow, index) => {
                            return (
                                <div key={index} onDoubleClick={() => runToCards(tableRow._id)}>
                                    <OnlyOnePackComponent item={tableRow} runToCards={runToCards}/>
                                </div>
                            )
                        })
                    }
                    <Modal
                        backgroundOnClick={() => {
                            dispatch(packsActions.packModeAC(null))
                            dispatch(setGlobalErrorAC(''))
                        }}
                        show={globalError !== '' || packMode === 'add' || packMode === 'edit'}
                        height={0}
                        width={0}
                        backgroundStyle={
                            globalError !== ''
                                ? {backgroundColor: 'rgba(255,3,3,0.15)'}
                                : {backgroundColor: 'rgba(255,145,3,0.13)'}
                        }
                        enableBackground={true}>
                        {globalError !== '' && <GlobalError/>}
                        {packMode === 'add' && <AddPackComponent/>}
                    </Modal>
                </div>
                <TablesPagination/>
            </div>

        </div>
    )
}

export default PacksList
