import React, {useState, useEffect } from 'react'
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
import TextField from '@mui/material/TextField';


 

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



export default function UsersList(props) {
    const[subjectName, setSubjectName] = useState("");
    const[teacherId, setTeacherId] = useState("");
    const[classId, setClassId] = useState("");
    const [subjects, setSubjects] = useState([]);
    const classes = useStyles();
    const[open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/subject', { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            console.log(res)
            setSubjects(res.data)
        })
    })

    const clearForm = () => {
        setSubjectName("");
        setTeacherId("");
        setClassId("");
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        clearForm();
    }

    const handleCreate = () => {
        axios.post("http://localhost:8080/subject", {
            "subjectName": subjectName,
            "teacherId": teacherId,
            "classId": classId
        }, { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        handleClose();
    }

    const subjectNameHandle = (evant) => {
        setSubjectName(evant.target.value);
    } 
    
    const teacherIdHandle = (evant) => {
        setTeacherId(evant.target.value);
    }
    
    const classIdHandle = (evant) => {
        setClassId(evant.target.value);
    } 

    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>Subjects</Typography>
            </Container>
            <Container maxWidth='md' className={classes.usersList}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Subject Name</TableCell>
                            <TableCell align="left">Teacher Id</TableCell>
                            <TableCell align="left">Class Id</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((subject) => (
                        <TableRow
                        key={subject.id}
                        >
                            <TableCell component="th" scope="user"> {subject.id} </TableCell>
                            <TableCell align="left">{subject.subjectName}</TableCell>
                            <TableCell align="left">{subject.teacherId}</TableCell>
                            <TableCell align="left">{subject.classId}</TableCell>
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
                <Button className={classes.createButton} variant="contained" onClick={handleClickOpen}>Create new subject</Button>

                <Dialog maxWidth='xl' open={open} onClose={handleClose}>
                            <DialogTitle alignText='center' id='form-dialog-title'>Create New Subject</DialogTitle>
                            <DialogContent>
                                <Container className={classes.dialogWindow}>
                                    <TextField fullWidth name="name" id="name" label="Name" variant="standard" value={subjectName} onChange={subjectNameHandle} />
                                    <TextField fullWidth name="teacher" id="teacher" label="Teacher" variant="standard" value={teacherId} onChange={teacherIdHandle}/>
                                    <TextField fullWidth name="class" id="class" label="Class" variant="standard" value={classId} onChange={classIdHandle}/>
                                </Container>
                            </DialogContent>
                            <DialogAction>
                                <Button onClick={handleClose} color='primary'>Cancel</Button>
                                <Button onClick={handleCreate} color='primary'>Create</Button>
                            </DialogAction>
                </Dialog>
            </Container>
            <Footer value='subjects' role={props.role}/>
        </div>
    );
}