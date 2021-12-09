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


export default function StudentSubjects(props) {
    const [subjects, setSubjects] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        axios.get("http://localhost:8080/subject/classId/" + localStorage.getItem('classId'), { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            console.log(res)
            setSubjects(res.data)
        })
    })

    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>My Subjects</Typography>
            </Container>
            <Container maxWidth='sm' className={classes.usersList}>
            <TableContainer component={Paper} maxWidth='xl'>
                <Table xl={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Subject</TableCell>
                            <TableCell align="left">Teacher</TableCell>
                            <TableCell align="left">Class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((subject) => (
                            <TableRow
                            key={subject.id}
                            >
                                <TableCell align="left">{subject.id}</TableCell>
                                <TableCell align="left">{subject.subjectName}</TableCell>
                                <TableCell align="left">{subject.teacherId}</TableCell>
                                <TableCell align="left">{subject.classId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
            <Footer value="studentSubjects" role={props.role}/>
        </div>
    );
}