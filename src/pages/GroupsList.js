import React, {useState, useEffect } from 'react';
import { Container, Typography, Box} from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
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
import TextField from '@mui/material/TextField'


 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    title: {
        position: "relative",
        marginBottom: 4,
        paddingTop: '100px'
    },
    usersList: {
        paddingTop: '40px',
        merginBottom: 10
    },
    underLine: {
        paddingTop: '2px',
        paddingBottom: '100px'
    },
    createButton: {
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0)'
    },
    buttonContainer: {
        paddingTop: '40px'
    },
    dialogWindow: {
        paddingTop: '20px'
    }
}))



export default function GroupsSList(props) {
    const [groups, setGroups] = useState([]);
    const classes = useStyles();
    const[open, setOpen] = useState(false);
    const[groupName, setGroupName] = useState();
    const[teacherId, setTeacherId] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/group', { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            console.log(res)
            setGroups(res.data)
        })
    })


    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setGroupName("");
        setTeacherId("");
    }

    const handleGroupName = (event) => {
        setGroupName(event.target.value);
    }

    const handleTeacherId = (event) => {
        setTeacherId(event.target.value);
    }

    const handleCreate = () => {
        axios.post('http://localhost:8080/group', {
            "groupName": groupName,
            "teacherId": teacherId
        },  { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        handleClose();
    }


    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>Classes</Typography>
            </Container>
            <Container maxWidth='sm' className={classes.usersList}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Class Name</TableCell>
                            <TableCell align="left">Teacher Id</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map((group) => (
                        <TableRow
                        key={group.id}
                        >
                            <TableCell align="left"> {group.id} </TableCell>
                            <TableCell align="left">{group.groupName}</TableCell>
                            <TableCell align="left">{group.teacherId}</TableCell>
                            <TableCell align="right">
                                <Box mr={3}>
                                    <Button color='inherit' variant='outlined'>Delete</Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
            <Container className={classes.buttonContainer}>
                <Button className={classes.createButton} variant="contained" onClick={handleClickOpen}>Create new class</Button>

                <Dialog maxWidth='xl' open={open} onClose={handleClose}>
                            <DialogTitle alignText='center' id='form-dialog-title'>Create New Class</DialogTitle>
                            <DialogContent>
                                <Container className={classes.dialogWindow}>
                                    <TextField fullWidth name="groupName" id="groupName" label="Class Name" variant="standard" value={groupName} onChange={handleGroupName}/>
                                    <TextField fullWidth name="teacherId" id="teacherId" label="Teacher id" variant="standard" value={teacherId} onChange={handleTeacherId}/>
                                </Container>
                            </DialogContent>
                            <DialogAction>
                                <Button onClick={handleClose} color='primary'>Cancel</Button>
                                <Button onClick={handleCreate} color='primary'>Create</Button>
                            </DialogAction>
                </Dialog>
            </Container>
            <Footer value='classes' role={props.role}/>
        </div>
    );
}