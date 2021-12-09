import React, {useState, useEffect} from 'react'
import { Container, Typography} from '@mui/material'
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
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

 

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
        paddingBottom: '10px'
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


export default function TeacherMarks(props) {
    const [marks, setMarks] = useState([]);
    const classes = useStyles();
    const [newMark, setNewMark] = useState();
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        axios.get("http://localhost:8080/mark/student/" + localStorage.getItem('selectedStudent') + "/subject/" + localStorage.getItem('selectedSubject'), { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            console.log(res)
            setMarks(res.data)
        })
    })

    const handleClickOpen = (user) => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
        setNewMark();
    }

    const handleOnChange = (event) => {
        setNewMark(event.target.value);
    } 

    const handleNewMark = (mark) => {
        const data = {
            'studentId': localStorage.getItem("selectedStudent"),
            'subjectId': localStorage.getItem("selectedSubject"),
            'mark': newMark,
            'date': new Date()
        }

        const headers = { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }}

        axios.post("http://localhost:8080/mark", data, headers)
        handleClose();
    }

    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>Students Marks</Typography>
            </Container>
            <Container maxWidth='sm' className={classes.usersList}>
            <TableContainer component={Paper} maxWidth='xl'>
                <Table xl={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Mark</TableCell>
                            <TableCell align="left">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marks.map((mark) => (
                            <TableRow
                            key={mark.id}
                            >
                                <TableCell align="left">{mark.mark}</TableCell>
                                <TableCell align="left">{new Intl.DateTimeFormat('en').format(new Date(mark.date))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
            <Container className={classes.buttonContainer}>
                <Button className={classes.createButton} variant="contained" onClick={handleClickOpen}>New Mark</Button>

                <Dialog maxWidth='xl' open={open} onClose={handleClose}>
                            <DialogTitle alignText='center' id='form-dialog-title'>New Mark</DialogTitle>
                            <DialogContent>
                                <Container className={classes.dialogWindow}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Mark</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={newMark}
                                                        onChange={handleOnChange}
                                                        label="Age"
                                                        >
                                                            <MenuItem value="10">10</MenuItem>
                                                            <MenuItem value="9">9</MenuItem>
                                                            <MenuItem value="8">8</MenuItem>
                                                            <MenuItem value="7">7</MenuItem>
                                                            <MenuItem value="6">6</MenuItem>
                                                            <MenuItem value="5">5</MenuItem>
                                                            <MenuItem value="4">4</MenuItem>
                                                            <MenuItem value="3">3</MenuItem>
                                                            <MenuItem value="2">2</MenuItem>
                                                            <MenuItem value="1">1</MenuItem>
                                                            <MenuItem value="0">0</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                </Container>
                            </DialogContent>
                            <DialogAction>
                                <Button onClick={handleClose} color='primary'>Cancel</Button>
                                <Button onClick={handleNewMark} color='primary'>Create</Button>
                            </DialogAction>
                </Dialog>
            </Container>
            <Footer value="marks" role={props.role}/>
        </div>
    );
}