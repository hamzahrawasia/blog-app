import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store/reducers";

const Header = () => {
    const loggedIn = useSelector(state=> state.loggedIn);
    const dispatch = useDispatch();

    const [value, setValue] = useState();
    return (
        <AppBar position="sticky" sx={{background:"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,148,233,1) 100%);"}}>
            <Toolbar>
                <Typography variant="h4">Blog App</Typography>
              { loggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
                    <Tabs
                    sx={{ ml: "auto" }}
                    textColor="inherit"
                    indicatorColor="primary"
                    value={value}
                    onChange={(e, val) => setValue(val)}
                    >
                        <Tab LinkComponent={NavLink} to="/add" label="Add Blog" />
                        <Tab
                LinkComponent={NavLink}
                to="/myBlogs"
                label="My Blogs"
              />
                        <Tab LinkComponent={NavLink} to="/blogs" label="All Blogs" />
                    </Tabs>
                </Box> }
                <Box display="flex" marginLeft="auto">
                   { !loggedIn && <><Button LinkComponent={NavLink} to="/login" variant='contained' sx={{margin:2, borderRadius: 10}}>Login</Button>
                    <Button LinkComponent={NavLink} to="/signup" variant='contained' sx={{margin:2, borderRadius: 10}}>Sign-up</Button> </>}
                   { loggedIn && <Button onClick={()=> dispatch(actions.logout())} LinkComponent={NavLink} to="/login" variant='contained' sx={{margin:2, borderRadius: 10}}>Logout</Button> }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header