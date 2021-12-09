import React , {useState, useEffect}from "react";
import { makeStyles } from '@mui/styles'
import { Paper, Container , Typography, Grid} from '@mui/material'
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        position: "relative",
        paddingTop: '200px',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    content: {
        paddingTop: '50px',
        position: "relative",
        textAlign: "center"
    }
}))


export default function HelloPage(props) {
    const classes = useStyles();
    const [content, setContent] = useState("Log In or Register to continue");
    const [isRedirect, setRedirect] = useState(false);
    localStorage.removeItem("selectedClass");

    useEffect(() => {
        if(localStorage.getItem("isLogin") == "true") {
            axios.get('http://localhost:8080/profile/' + localStorage.getItem("userId"), { headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer_${localStorage.getItem('token')}`
        }}).then(res => {
            console.log(res)
            setContent("Hello " + res.data.firstName + " " + res.data.lastName);
        })
        }
    });
    return (
        <>
            <Appbar />
            <Paper  className={classes.paper} style={{ backgroundImage: `url(https://source.unsplash.com/random)`}}>
                <Container fixed>
                    <Grid container>
                        <Grid item md={6}>
                            <div>
                                <Typography component="h1" variant="h2" color="white" gutterBottom>
                                    Electronic Journal
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <Container fixed>
                <Typography className={classes.content} component="h1" variant="h3" color="inherit" gutterBottom>
                    {content}
                </Typography>
            </Container>
            <Footer role={props.role}/>
        </>
    );
}