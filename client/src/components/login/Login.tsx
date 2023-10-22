import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {RootState} from '../../store'
import {setLogin} from '../../feutures/loginSlice'
import {CredentialResponse, GoogleLogin} from '@react-oauth/google'

const Login: React.FC  = () => {
    const isLogin = useSelector((state: RootState) => state.login.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogin) {
            navigate('/resumes');
        }
    }, [isLogin, navigate]);

    const responseMessage = ({credential}: CredentialResponse) => {
        if (credential) {
            localStorage.setItem("token", credential)
            dispatch(setLogin(true))
        }
    };

    return (
        <div className="centerLogin">
            <GoogleLogin theme="filled_blue" onSuccess={responseMessage}/>
        </div>
    );
}

export default Login