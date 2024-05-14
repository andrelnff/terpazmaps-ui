import React, {useEffect, useState} from 'react';
import './LoginPage.css';
import {useAuth} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import terpaz from "../../assets/terpaz.png";
import {TextField} from "@mui/material";
import '@fontsource/roboto';


function LoginPage() {
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => setError(false), [username]);
    useEffect(() => setError(false), [password]);


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            navigate('/maps');
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleLogin}>
                <img className="side-image" src={terpaz} alt="Descrição da imagem"/>
                <div className="label-form">
                    <h1>Login</h1>
                    <p>Digite os seus dados de acesso nos campos abaixo.</p>
                </div>
                <div className="input-group">
                    <TextField
                        className="field-input"
                        label="Nome de usuário"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="input-group">
                    <TextField
                        className="field-input"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal" // Adiciona um espaçamento
                    />
                </div>
                {error && <span key={Date.now()} className="fade-out">Email ou senha incorretas!</span>}
                <button className="botao-entrar" type="submit">Entrar</button>
                <div className="box-sign">
                    Ainda não possui cadastro? <a href="/cadastro">Clique aqui</a>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;