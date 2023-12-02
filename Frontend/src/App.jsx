// import React,{useEffect,useState} from 'react'

// function App () {
//     const [data, setData] = useState([])
//     useEffect(() => {
//         fetch('http://localhost:2000/student/find')
//         .then(res => res.json())
//         .then(data => setData(data))
//         .catch(err => console.log(err));
//     },[])
//     return(
//         <div style = {{padding: "50px"}}>
//             <table>
//                 <thead>
//                     <th>StudentID</th>
//                     <th>FirstName</th>
//                     <th>LastName</th>
//                     <th>Email</th>
//                     <th>Password</th>
//                     <th>UniversityName</th>
//                     <th>Country</th>
//                     <th>City</th>
//                     <th>PostalCode</th>
//                 </thead>
//                 <tbody>
//                     {data.map((d,i) =>(
//                         <tr key={i}>
//                         <td>{d.StudentID}</td>
//                         <td>{d.FirstName}</td>
//                         <td>{d.LastName}</td>
//                         <td>{d.Email}</td>
//                         <td>{d.Password}</td>
//                         <td>{d.UniversityName}</td>
//                         <td>{d.Country}</td>
//                         <td>{d.City}</td>
//                         <td>{d.PostalCode}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

//export default App;

import React, { Component } from 'react'; 
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Home from './components/home';  
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
import RegisterDetails from './components/RegisterDetails';
import ResetPass from './components/ResetPass'
  
class App extends Component { 
render() { 
    return ( 
    <Router> 
        <div className="App"> 
        <Routes> 
                <Route exact path='/' Component={Login}/>
                <Route exact path='/Courses' Component={Courses}/>
                <Route path="/home/*" Component={Home} />
                <Route path="/help" Component={Help} />
                <Route path="/settings" Component={Settings} />
                <Route path="/log out" Component={Logout} />
                <Route path="/register" Component={Register} />
                <Route path="/register-details" Component={RegisterDetails} />
                <Route path="/register-success" Component={RegisterSuccess} />
                <Route path="/reset-pass" Component={ResetPass} />
        </Routes> 
        </div> 
    </Router> 

); 
} 
} 
  
export default App;