import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SubjectsList from './pages/SubjectsList';
import UsersList from './pages/UsersList';
import GroupsList from './pages/GroupsList';
import StudentClass from './pages/StudentClass';
import HelloPage from './pages/HelloPage';
import StudentMarks from './pages/StudentMarks';
import UserProfile from './pages/UserProfile';
import StudentSubjects from './pages/StudentSubjects';
import TeacherSubjects from './pages/TeacherSubjects';
import TeacherClass from './pages/TeacherClass';
import TeacherMarks from './pages/TeacherMarks';

function App()  {
  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/users' element={<UsersList/>} />     
          <Route path='/subjects' element={<SubjectsList/>} />
          <Route path='/classes' element={<GroupsList/>}/>
          <Route path='/student/class' element={<StudentClass/>} />
          <Route path='/student/subjects' element={<StudentSubjects />} />
          <Route path='/student/marks' element={<StudentMarks/>} />
          <Route path='/teacher/subjects' element={<TeacherSubjects/>} />
          <Route path='/teacher/subjects/class' element={<TeacherClass />} />
          <Route path='/teacher/subjects/class/student/marks' element={<TeacherMarks />} />
          <Route path='/' element={<HelloPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}

export default App;
