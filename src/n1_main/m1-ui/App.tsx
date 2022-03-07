import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Main from "../Main";
import RoutesX from "./routes/routes";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <>
                    <Main/>
                    <RoutesX/>
                </>
            </HashRouter>
        </div>
    );
}

export default App;
