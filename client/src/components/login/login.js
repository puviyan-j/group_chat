import React from 'react'
import './login.css'
import { Button } from '@mui/material';
import { auth,provider } from '../../firebase';
import{ signInWithPopup}from "firebase/auth";
import {useDispatch, }from "react-redux"
import { login } from '../../slice/userslice';

function Login() {
    const dispatch = useDispatch()

     const signin = ()=> {
        signInWithPopup(auth,provider)
        .then((res)=> {
            dispatch(login(res.user))
        })
        .catch((err)=>{
            alert(err.message)
        })
     }

    
     
    return (

        <div className='login'>
            <div className='login_container'>
                <img src='https://1.bp.blogspot.com/-tN6DCkDTyT4/XyJoQz9yGcI/AAAAAAAAAF4/aBZwjuwwmb4iG3ZWEPKOZOi59_E4sXS5wCLcBGAsYHQ/s2048/logo%2Bwa%2Bpng%2Byogiancreative.png' alt=''></img>

                <div className='login_text'>
                    <h1> Sign in to whatsapp</h1>
                </div>
                <Button onClick={signin}>
                    signin with google
                </Button>
            </div>
       
            
        </div>

)
}

export default Login