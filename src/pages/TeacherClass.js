import React, {useState, useEffect} from 'react'
import { Container, Typography, Box} from '@mui/material'
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
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

 

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


export default function TeacherClass(props) {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();
    
    useEffect(() => {

        axios.get('http://localhost:8080/student/class/' + localStorage.getItem('selectedClass'), { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            console.log(res)
            setUsers(res.data)
        })
    })

    const handleSelect = (studentId) => {
        localStorage.setItem("selectedStudent", studentId);
        navigate("/teacher/subjects/class/student/marks");
    }

    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>My Class</Typography>
            </Container>
            <Container maxWidth='md' className={classes.usersList}>
            <TableContainer component={Paper} maxWidth='xl'>
                <Table xl={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                            key={user.id}
                            >
                                <TableCell align="left">{user.firstName}</TableCell>
                                <TableCell align="left">{user.lastName}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">{user.phone}</TableCell>
                                <TableCell align="left">
                                <Box mr={3}>
                                            <Button color='inherit' variant='outlined' onClick={() => handleSelect(user.id)}>Select</Button>
                                </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
            <Footer value="marks"/>
        </div>
    );
}