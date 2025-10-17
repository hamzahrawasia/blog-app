import React, {useState} from "react";
import { Box, InputLabel, Typography, TextField, Button} from "@mui/material";
import { purple } from '@mui/material/colors';
import axios from "axios";

const labelStyle = {mb:1,mt:2,fontSize: '24px', fontWeight:'bold'};
const color = purple[200];
const AddBlog = () => {
    const [inputs, setInputs] = useState({
        title:"",
        description:"",
        imageURL:"",
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    };
    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5001/add", {
            title:inputs.title,
            description: inputs.description,
            image: inputs.imageURL,
            user: localStorage.getItem("userID")
        }).catch(err => console.log(err));
        const data = await res.data;
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data=>console.log(data));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                border={3} 
                borderColor="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,148,233,1) 100%);"
                borderRadius={10} 
                boxShadow="15px 15px 30px #ccc" 
                padding={3}
                margin={"auto"} 
                marginTop={4}
                display='flex' 
                flexDirection={'column'} 
                width={"80%"}
                >
                    <Typography fontWeight={'bold'} padding={3} color="grey" variant="h2" textAlign={'center'}>Post Your Blog</Typography>
                    <InputLabel sx={labelStyle}>Title</InputLabel>
                    <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant="outlined"/>
                    <InputLabel sx={labelStyle}>Description</InputLabel>
                    <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant="outlined"/>
                    <InputLabel sx={labelStyle}>Image URL</InputLabel>
                    <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='normal' variant="outlined"/>
                    <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Create Blog</Button>
                </Box>
            </form>
        </div>
    )
}

export default AddBlog;