import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import Looks5Icon from '@mui/icons-material/Looks5';





export default function Footer(props) {
    switch(localStorage.getItem('role')) {
    case "ADMIN":
        return (
            <footer style={{position: 'fixed', bottom: '0', width: '100%' }}>
                <BottomNavigation value={props.value} onChange={null}>
                    <BottomNavigationAction label='Users' value='users' icon={<PeopleAltIcon />} href='/users'/>
                    <BottomNavigationAction label='Classes' value='classes' icon={<DashboardIcon />} href='/classes'/>
                    <BottomNavigationAction label='Subjects' value='subjects' icon={<ClassIcon />} href='/subjects'/>
                    <BottomNavigationAction label='Profile' value='profile' icon={<PersonIcon />} href='/profile'/>
                    
                </BottomNavigation>
            </footer>
        );
    case "STUDENT":
        return (
            <footer style={{position: 'fixed', bottom: '0', width: '100%' }}>
                <BottomNavigation value={props.value} onChange={null}>
                    <BottomNavigationAction label='My Marks' value='studentMarks' icon={<Looks5Icon />} href='/student/marks'/>
                    <BottomNavigationAction label='My Class' value='studentClass' icon={<PeopleAltIcon />} href='/student/class'/>
                    <BottomNavigationAction label='My Subjects' value='studentSubjects' icon={<ClassIcon />} href='/student/subjects'/>
                    <BottomNavigationAction label='Profile' value='profile' icon={<PersonIcon />} href='/profile'/>
                    
                </BottomNavigation>
            </footer>
        );
    case "TEACHER":
        return (
            <footer style={{position: 'fixed', bottom: '0', width: '100%' }}>
                <BottomNavigation value={props.value} onChange={null}>
                    <BottomNavigationAction label='Marks' value='marks' icon={<ClassIcon />} href='/teacher/subjects'/>
                    <BottomNavigationAction label='Profile' value='profile' icon={<PersonIcon />} href='/profile'/>
                    
                </BottomNavigation>
            </footer>
        );
    default: 
            return (
                <footer style={{position: 'fixed', bottom: '0', width: '100%' }}>
                <BottomNavigation value={props.value} onChange={null}>                    
                </BottomNavigation>
                </footer>
            )
    }
}