import React, {useState} from 'react'
import { AppBar, Container, Toolbar, Typography, Box} from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    dialogWindow: {
        paddingTop: '20px'
    }
}))


export default function AppBarButtons(props) {
    const[firstName, setFirstName] = useState("");
    const[email, setEmail] = useState("");
    const[lastName, setLastName] = useState("");
    const[phone, setPhone] = useState("");
    const[classId, setClassId] = useState("");
    const[password, setPassword] = useState("");  
    const[openRegisterForm, setOpenRegisterForm] = useState(false);
    const[openLoginForm, setOpenLoginForm] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();



    const handleClickOpenRegisterForm =() => {
        setOpenRegisterForm(true);
    }

    const handleClickOpenLoginForm =() => {
        setOpenLoginForm(true);
    }

    const firstNameHandle = (event) => {
        setFirstName(event.target.value)
    } 

    const lastNameHandle = (event) => {
        setLastName(event.target.value)
    } 

    const phoneHandle = (event) => {
        setPhone(event.target.value)
    } 

    const emailHandle = (event) => {
        setEmail(event.target.value)
    } 
    
    const classIdHandle = (event) => {
        setClassId(event.target.value)
    } 

    const passwordHandle = (event) => {
        setPassword(event.target.value)
    } 

    const clearFieldsHandle = () => {
        setFirstName("");
        setLastName("");
        setClassId("");
        setEmail("");
        setPassword("");
        setPhone("");
        setOpenRegisterForm(false);
        setOpenLoginForm(false);
    }

    const createUserHandle = () => {
        axios.post('http://localhost:8080/auth/register', {
           "firstName": firstName,
           "lastName": lastName,
           "email": email,
           "phone": phone,
           "classId": classId,
           "password": password

        }).then(function(res) {
            console.log(res);
        })
        clearFieldsHandle();

    }

    const handleLogOut = () => {
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        localStorage.setItem('role', '');
        localStorage.setItem('classId', '')
        localStorage.setItem('isLogin', 'false');

        navigate('/');
        window.location.reload();
        
    }

    const logInUserHandle = () => {
        axios.post('http://localhost:8080/auth/login', {
            "username": email,
            "password": password
 
         }).then(function(res) {
             localStorage.setItem('token', res.data.token);
             localStorage.setItem('userId', res.data.id);
             localStorage.setItem('role', res.data.role);
             localStorage.setItem('classId', res.data.classId);
             localStorage.setItem('isLogin', 'true');
             navigate('/');
             window.location.reload();             

         })
         clearFieldsHandle();
    }
    if(localStorage.getItem('isLogin') == 'false') { 
    return (
                        <>
                        <Box mr={3}>
                            <Button color='inherit' variant='outlined' onClick={handleClickOpenLoginForm} >Log In</Button>
                        </Box>
                        <Dialog maxWidth='xl' open={openLoginForm}>
                            <DialogTitle alignText='center' id='form-dialog-title'>Log In</DialogTitle>
                            <DialogContent>
                                <Container className={classes.dialogWindow}>
                                    <TextField fullWidth id="email" label="Email" variant="standard" value={email} onChange={emailHandle}/>
                                    <TextField fullWidth id="password" label="Password" type="password" autoComplete="current-password" variant="standard" onChange={passwordHandle}/>
                                </Container>
                            </DialogContent>
                            <DialogAction>
                                <Button onClick={clearFieldsHandle} color='primary'>Cancel</Button>
                                <Button onClick={logInUserHandle} color='primary'>Log in</Button>
                            </DialogAction>
                        </Dialog>
                        <Button color='secondary' variant='contained' onClick={handleClickOpenRegisterForm}>Sign Up</Button>
                        <Dialog maxWidth='xl' open={openRegisterForm}>
                            <DialogTitle alignText='center' id='form-dialog-title'>Create New User</DialogTitle>
                            <DialogContent>
                                <Container className={classes.dialogWindow}>
                                    <TextField fullWidth id="firstName" label="First Name" variant="standard" value={firstName} onChange={firstNameHandle}/>
                                    <TextField fullWidth id="lastName" label="Last Name" variant="standard" value={lastName} onChange={lastNameHandle}/>
                                    <TextField fullWidth id="phone" label="Phone" variant="standard" value={phone} onChange={phoneHandle}/>
                                    <TextField fullWidth id="class" label="Class" variant="standard" value={classId} onChange={classIdHandle}/>
                                    <TextField fullWidth id="email" label="Email" variant="standard" value={email} onChange={emailHandle}/>
                                    <TextField fullWidth id="password" label="Password" type="password" autoComplete="current-password" variant="standard" onChange={passwordHandle}/>
                                </Container>
                            </DialogContent>
                            <DialogAction>
                                <Button onClick={clearFieldsHandle} color='primary'>Cancel</Button>
                                <Button onClick={createUserHandle} color='primary'>Create</Button>
                            </DialogAction>
                        </Dialog>
                        </>
    );}
    else {return (
                        <Box mr={3}>
                            <Button color='inherit' variant='outlined' onClick={handleLogOut} >Log Out</Button>
                        </Box>
    )}
}