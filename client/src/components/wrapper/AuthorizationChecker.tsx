import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store'
import {AuthorizationCheckerProps} from '../../model/props'
import {setLogin} from '../../feutures/loginSlice'
import {Navigate} from 'react-router-dom'
import LogoutHeader from '../login/LogoutHeader'

const AuthorizationChecker: React.FC<AuthorizationCheckerProps> = (
    {children}
) => {
    const isLogin = useSelector((state: RootState) => state.login.isLogin)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(setLogin(true))
        }
    }, [dispatch])

    if (!isLogin) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <LogoutHeader/>
            {children}
        </>
    )
}

export default AuthorizationChecker