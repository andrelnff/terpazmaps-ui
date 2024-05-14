import React, {createContext, useContext, useEffect, useState} from 'react';
import {handleLogin, isTokenValid} from "../service/authService";
import Cookies from 'js-cookie';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('authData');
        console.log(data)
        if (data) {
            setAuthData(JSON.parse(data));
        } else {
            setAuthData(null)
        }
    }, []);

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await isTokenValid();
            if (!isValid) {
                setAuthData(null);
            }
        };

        checkToken();
    }, []);


    const login = async (username, password) => {
        try {
            const response = await handleLogin(username, password);
            if (response && response.data.token) {
                localStorage.setItem('authData', JSON.stringify(response.data));
                setAuthData(response.data);
                console.log('Login bem-sucedido:', response.data);
            } else {
                console.log('Dados de login inválidos');
            }
        } catch (error) {
            console.error('Erro de autenticação', error);
        }
    }

    const logout = () => {
        Cookies.remove('authToken')
        localStorage.removeItem('authData');
        setAuthData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
