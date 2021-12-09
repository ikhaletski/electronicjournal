import React, {useState, useEffect} from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import Footer from "../components/Footer";
import { makeStyles } from '@mui/styles'
import { Container, Typography, Box} from '@mui/material'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    title: {
        position: "relative",
        paddingTop: '100px'
    }
}))

export default function UserProfile(props) {
    const [userId, setUserId] = useState(48);
    const [user, setUser] = useState();
    const classes = useStyles();
    
    useEffect(() => {
        axios.get("http://localhost:8080/user/" + userId)
        .then(res => {
            console.log(res)
            setUser(res.data)
        })
    })

    return (
        <>
            <Appbar />
            <Container maxWidth='sm' className={classes.title}>
                <Typography variant='h2' align='center'>Profile</Typography>
            </Container>
            <Footer value="profile" role={props.role}/>
        </>
    );
}