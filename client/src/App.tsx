import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import 'react-quill/dist/quill.snow.css';
import ResumeTableContainer from './containers/ResumeTableContainer'
import Login from './components/login/Login'
import AuthorizationChecker from './components/wrapper/AuthorizationChecker'
import CreateInputFormContainer from './containers/CreateInputFormContainer'
import UpdateInputFormContainer from './containers/UpdateInputFormContainer'

const App = () =>
    (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/resumes"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="/resumes"
                    element={
                        <AuthorizationChecker>
                            <ResumeTableContainer/>
                        </AuthorizationChecker>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <AuthorizationChecker>
                            <CreateInputFormContainer/>
                        </AuthorizationChecker>
                    }
                />
                <Route
                    path={"/:resumeId/update"}
                    element={
                        <AuthorizationChecker>
                            <UpdateInputFormContainer/>
                        </AuthorizationChecker>
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/resumes" />}
                />
            </Routes>
        </Router>
    )

export default App
