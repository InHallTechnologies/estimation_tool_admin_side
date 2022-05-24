import React, { useEffect, useState } from "react";
import "./authPage.styles.scss";
import logo from '../../assets/logo.png'
import banner from '../../assets/login_image.png'
import { Alert, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { child, get, ref } from "firebase/database";
import { firebaseAuth } from "../../backend/firebaseHandler";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [severityType, setSeverity] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        if (email === "") {
            setVisibility(true)
            setMessage("Please enter Email-Id")
            setSeverity("warning")
            return
        }
        if (password === "") {
            setVisibility(true)
            setMessage("Please enter Password")
            setSeverity("warning")
            return
        }

        setLoading(true)
        if (email === "admin@estimationtool.com") {
            signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
                navigate("/")
                setLoading(false)
            }).catch((error) => {
                setVisibility(true)
                setMessage("Invalid credentials")
                setSeverity("error")
                setLoading(false)
            })
        } else {
            setVisibility(true)
            setMessage("Invalid credentials")
            setSeverity("error")
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <img src={logo} alt="estimation-tool" className="logo" />

            <div className="image-form-container">
                <div className="banner-container">
                    <img src={banner} alt="estimation-tool" className="banner-image" />
                </div>
                <div className="form-container">
                    <p className="form-title">Admin Portal</p>
                    <p className="sub-title">Please login to continue</p>

                    <p className="field-tag">Email-Id</p>
                    <input className="input-field" value={email} onChange={(event)=>{setEmail(event.target.value)}} />

                    <p className="field-tag">Password</p>
                    <input className="input-field" value={password} type={'password'} onChange={(event)=>{setPassword(event.target.value)}} />

                    <Button disabled={loading} style={loading?{backgroundColor:"#FFA481"}:{backgroundColor:"#FE5C1C"}} variant="contained" className="submit-button" onClick={handleLogin}>Login</Button>
                </div>
            </div>
            
            <Snackbar anchorOrigin={{vertical:'top', horizontal:'right'}} open={visibility} autoHideDuration={3000} onClose={()=>{setVisibility(false)}}>
                <Alert onClose={()=>{setVisibility(false)}} severity={severityType} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </div>
    )
}

export default AuthPage;