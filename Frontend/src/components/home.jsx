import React from 'react'; 
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom';
import Courses from './Courses'

  
function Home (){ 
    return(
        <div className='App'>
            <Navigation/>
            <Routes>
                <Route exact path='/Courses' Component={Courses}/>
            </Routes>
        </div>
    )
} 
  
export default Home;