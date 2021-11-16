import React, { useState } from 'react'
import Login from '../login'
import Signup from '../signup'
import Header from './header'

const Auth = () => {
    const [toggole,setToggole]=useState("login")
    return (
        <>
        
        {
            toggole ==="login"? <Login login={toggole}/>:<Signup/>
        }
           

        </>
    )
}

export default Auth
