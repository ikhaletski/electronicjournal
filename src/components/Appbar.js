import React from 'react'
import { AppBar, Container, Toolbar, Typography, Box} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School';
import { makeStyles } from '@mui/styles'
import AppBarButtons from './AppBarButtons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    schoolIcon: {
        marginRight: 1
    },
    title: {
        flexGrow: 1
    },
    dialogWindow: {
        paddingTop: '20px'
    }
}))

export default function Appbar() {


    const classes = useStyles();

    return(
        <AppBar position ='fixed' >
            <Container fixed>  
                <Toolbar>
                        <SchoolIcon className={classes.schoolIcon}/>
                        <Typography variant='h6' className={classes.title}>Electronic Journal</Typography>
                        <AppBarButtons></AppBarButtons>
                </Toolbar>
            </Container> 
        </AppBar>
    );
} 