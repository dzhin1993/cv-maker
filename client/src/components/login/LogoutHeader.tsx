import React from 'react'
import {Nav, Navbar, NavbarBrand} from 'reactstrap'
import {googleLogout} from '@react-oauth/google'
import {setLogin} from '../../feutures/loginSlice'
import {useDispatch} from 'react-redux'

const LogoutHeader: React.FC = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    googleLogout()
    localStorage.removeItem("token")
    dispatch(setLogin(false))
  };

    return (
        <Navbar light expand="md">
            <NavbarBrand/>
            <Nav className="ml-auto" navbar>
                <span style={{cursor: "pointer"}} onClick={logOut}>
                    <div>
                         <img alt="not found" src="/images/logout_icon.png"/>
                    </div>
                </span>
            </Nav>
        </Navbar>
    )
}

export default LogoutHeader