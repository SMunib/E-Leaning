import React from 'react'; 
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom';
import Courses from './Courses'
import { useLocation } from 'react-router-dom';

  
function Home (){ 
    const location = useLocation();
    const userType = location.state.userType;
    return(
        <div className='App'>
            <Navigation userType={userType} />
            <Routes>
                <Route exact path='/Courses' Component={Courses}/>
            </Routes>
        </div>
    )
} 
  
export default Home;