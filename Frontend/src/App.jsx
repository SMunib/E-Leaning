import React, { Component } from 'react'; 
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Home from './components/home'; 
import About from './components/about'; 
import Contact from './components/contact'; 
import './App.css'; 
import Login from './components/Login'
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Help from './components/Help';
import Settings from './components/Settings';
import Logout from './components/Logout';
import Register from './components/Register';
import RegisterSuccess from './components/RegisterSuccess';
import ResetPass from './components/ResetPass'
  
class App extends Component { 
render() { 
    return ( 
    <Router> 
        <div className="App"> 
        <Routes> 
                <Route exact path='/' Component={Login}/>
                <Route exact path='/Courses' Component={Courses}/>
                <Route path="/home" Component={Home} />
                <Route path="/help" Component={Help} />
                <Route path="/settings" Component={Settings} />
                <Route path="/log out" Component={Logout} />
                <Route path="/register" Component={Register} />
                <Route path="/register-success" Component={RegisterSuccess} />
                <Route path="/reset-pass" Component={ResetPass} />
        </Routes> 
        </div> 
    </Router> 

); 
} 
} 
  
export default App;