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


export default function StudentMarks(props) {
    const [marks, setMarks] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        axios.get("http://localhost:8080/mark/student/" + localStorage.getItem('userId'), { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
            
        }})
        .then(res => {
            console.log(res)
            setMarks(res.data)
        })
    })

    return(
        <div>
            <Appbar/>
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>My Marks</Typography>
            </Container>
            <Container maxWidth='sm' className={classes.usersList}>
            <TableContainer component={Paper} maxWidth='xl'>
                <Table xl={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Subject</TableCell>
                            <TableCell align="left">Mark</TableCell>
                            <TableCell align="left">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marks.map((mark) => (
                            <TableRow
                            key={mark.id}
                            >
                                <TableCell align="left">{mark.subjectId}</TableCell>
                                <TableCell align="left">{mark.mark}</TableCell>
                                <TableCell align="left">{new Intl.DateTimeFormat('en').format(new Date(mark.date))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
            <Footer value="studentMarks" role={props.role}/>
        </div>
    );
}