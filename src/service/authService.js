import axios from 'axios';
import Cookies from 'js-cookie';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/login').reply(config => {
    const { username } = JSON.parse(config.data);
    return [200, {
        username: username,
        token: 'token.mock.json.123456'
    }];
});

mock.onPost('/validate-token').reply(config => {
    const { token } = JSON.parse(config.data);
    return [200, {
        isValid: true,
        token: token
    }];
});

export const handleLogin = async (username, password) => {
    try {
        const response = await axios.post('/login', { username, password });
        Cookies.set('authToken', response.data.token, {
            expires: 1,
            secure: true,
            sameSite: 'strict'
        });
        return response;
    } catch (error) {
        console.error('Erro de autenticação', error);
        return null;
    }
};

export const isTokenValid = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
        return false;
    }
    try {
        const response = await axios.post('/validate-token', { token });
        console.log("tokenRevalidado: " + response.data.token);
        return response.data.isValid;
    } catch (error) {
        console.error('Erro ao validar o token', error);
        return false;
    }
};