import React, {useState, useEffect} from 'react'
import { Container, Typography, Box} from '@mui/material'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    title: {
        position: "relative",
        paddingTop: '100px'
    },
    usersList: {
        paddingTop: '40px',
        paddingBottom: '100px'
    }
}))


export default function UsersList(props) {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("USER");
    const [userId, setUserId] = useState();
    const classes = useStyles();
    
     useEffect(() => {
        axios.get('http://localhost:8080/user', { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            setUsers(res.data)
            console.log(res)
        })
    })

    const handleClickOpen = (user) => {
        setRole(user.role);
        setUserId(user.id);
        setOpen(true);
    }

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    } 

    const handleClose = () => {
        setOpen(false);
        setRole("USER");
        setUserId("");
    }

    const handleSubmit = () => {
        axios.put("http://localhost:8080/user/role/" + userId, {
            'role': role
        },
        {headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }});
        handleClose();
    }

    const deleteUserHandle = (user) => {
        const id = user.id;
        axios.delete('http://localhost:8080/user/' + id, { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
    }

    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>Users</Typography>
            </Container>
            <Container maxWidth='xl' className={classes.usersList}>
            <TableContainer component={Paper} maxWidth='xl'>
                <Table xl={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Class</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                            key={user.id}
                            >
                                <TableCell align="left">{user.id}</TableCell>
                                <TableCell align="left">{user.firstName}</TableCell>
                                <TableCell align="left">{user.lastName}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">{user.phone}</TableCell>
                                <TableCell align="left" >{user.classId}</TableCell>
                                <TableCell align="left" >{user.role}</TableCell>
                                <TableCell align="right">
                                    <Box mr={3}>
                                        <Button color='inherit' variant='outlined' onClick={() => handleClickOpen(user)}>Role</Button>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Box mr={3}>
                                        <Button color='inherit' variant='outlined' onClick={() => deleteUserHandle(user)}>Del</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog maxWidth='xl' open={open} onClose={null}>
                                                <DialogTitle alignText='center' id='form-dialog-title'>Change Role</DialogTitle>
                                                <DialogContent>
                                                    <Container className={classes.dialogWindow}>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={role}
                                                        onChange={handleChangeRole}
                                                        label="Age"
                                                        >
                                                            <MenuItem value="USER">USER</MenuItem>
                                                            <MenuItem value="STUDENT">STUDENT</MenuItem>
                                                            <MenuItem value="TEACHER">TEACHER</MenuItem>
                                                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    </Container>
                                                </DialogContent>
                                                <DialogAction>
                                                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                                                    <Button onClick={handleSubmit} color='primary'>Submit</Button>
                                                </DialogAction>
                                    </Dialog>
            </Container>
            <Footer value="users" role={props.role}/>
        </div>
    );
}