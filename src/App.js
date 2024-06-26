import React from 'react';
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MapsPage from "./pages/MapsPage/MapsPage";
import {MapProvider} from "./context/mapContext";
import {LoadingProvider} from "./context/loadingContext";
import {Loading} from "./components/loading/Loading";
import {FiltrosProvider} from "./context/filtrosContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <LoadingProvider>
                    <Loading />
                    <MapProvider>
                        <FiltrosProvider>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/maps" element={<MapsPage />} />
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </Routes>
                        </FiltrosProvider>
                    </MapProvider>
                </LoadingProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
