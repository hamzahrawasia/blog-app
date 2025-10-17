import { TextField, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actions } from "../store/reducers";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false)
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange = (e) =>{
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const sendRequest = async (type="login") => {
       const res = await axios.post(`http://localhost:5001/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err=>console.log(err));

        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) =>{
       e.preventDefault();
       console.log(inputs);
       if(isSignup){
        sendRequest("signup").then((data) => localStorage.setItem("userID",data.user._id))
        .then(()=> dispatch(actions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data))
       } else {
        sendRequest().then((data) => localStorage.setItem("userID",data.user._id))
        .then(()=> dispatch(actions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data))
       }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                maxWidth={400}
                display="flex" 
                flexDirection={'column'} 
                alignItems='center' 
                justifyContent={'center'} 
                boxShadow="10px 10px 20px #ccc"
                padding={3}
                margin='auto'
                marginTop={5}
                borderRadius={5}
                >
                    <Typography variant='h4' padding={3} textAlign={'center'}>{isSignup ? "Signup" : "Login"}</Typography>
                  { isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin="normal"/>}
                    <TextField name="email" onChange={handleChange} type={'email'} value={inputs.email} placeholder="Email" margin="normal"/>
                    <TextField name="password" onChange={handleChange} type={'password'} value={inputs.password} placeholder="Password" margin="normal"/>
                    <Button type="submit" variant='contained' sx={{borderRadius:3, marginTop:3}} color="warning">{isSignup ? "Signup" : "Login"}</Button>
                    <Button onClick={() => setIsSignup(!isSignup)} sx={{borderRadius:3, marginTop:3}}> Switch to {isSignup ? "Login" : "Signup"} </Button>
                </Box>
            </form>
        </div>
    )
}

export default Login