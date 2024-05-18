import React from 'react';
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MapsPage from "./pages/MapsPage/MapsPage";
import {MapProvider} from "./context/mapContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <MapProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/maps" element={<MapsPage />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </MapProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
