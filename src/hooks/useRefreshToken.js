import axios from '../api/axios';
import useAuth from './useAuth';
import { useContext } from 'react';
import AuthContext from "../context/AuthProvider";
const useRefreshToken = () => {

    const { setAuth } = useAuth();
    const { auth } = useContext(AuthContext);
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                user:response.data.username,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
       
        return response.data.accessToken;
    }
    console.log(auth);
    return refresh;
};

export default useRefreshToken;
