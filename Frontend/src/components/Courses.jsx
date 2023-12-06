import React, { useState, useEffect } from 'react';
import "./Courses.css";
import ReactPlayer from 'react-player'

const RegisteredCourses = ({  userType }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moduleVideos, setModuleVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState([]);
  // const [moduleVideoUrls,setModuleVideoUrls]=useState([]); 
  const [moduleQuizzes, setModuleQuizzes] = useState([]);
  const [newQuizLink, setNewQuizLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      
      if(userType === "teacher"){
      try {
        const token = localStorage.getItem('token');
        // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
        const enrolledResponse = await fetch('http://localhost:2000/reg_course/findforteacher', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const enrolledData = await enrolledResponse.json();
        if (enrolledData.success) {
          setEnrolledCourses(enrolledData.data);
          console.log(enrolledData.data);
        } else { 
          // alert("error"); 
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }else if(userType === "student"){
      try {
        const token = localStorage.getItem('token');
        // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
        const enrolledResponse = await fetch('http://localhost:2000/reg_course/findforstudent', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const enrolledData = await enrolledResponse.json();
        if (enrolledData.success) {
          setEnrolledCourses(enrolledData.data);
          console.log(enrolledData.data);
        } else { 
          // alert("error"); 
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once

 
  const handleCourseClick = (course) => {
    // Set the selected course
    setSelectedCourse(course);
    const initialModuleVideos = Array.from({ length: course.modules }, () => []);
    const initialModuleQuizzes = Array.from({ length: course.modules }, () => '');
    setModuleVideos(initialModuleVideos);
    setModuleQuizzes(initialModuleQuizzes);
    // setModuleVideos([]);
  };

  const handleGoBack = () => {
    setSelectedCourse(null);
    setActiveOption(null);
  };
  
  const handleAddQuizLink = async (moduleIndex) => {
    console.log(newQuizLink);
    try{
      const response = await fetch('http://localhost:2000/quizzes/add',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json',
          // 'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({CourseID: selectedCourse.CourseID,quiz:newQuizLink}),
      });
    const data = await response.json();
    if(data.success){
      console.log(data.message);
      const updatedModuleQuizzes = [...moduleQuizzes];
      updatedModuleQuizzes[moduleIndex] = newQuizLink;
      setModuleQuizzes(updatedModuleQuizzes);
      // Clear the input field after adding the quiz link
      setNewQuizLink('');
    }else{
      alert(data.message);
    }
    // Update the quizzes for the specified module by adding a new quiz link
  }catch(error){
    console.log('Error' +error);alert(error);
  }
  };

  const handleRemoveQuizLink = async (moduleIndex) => {
    try{
      const response = await fetch('http://localhost:2000/quizzes/findspecificquiz',{
        method : 'DELETE',
        headers :{
          'Content-Type':'application/json',
          // 'Authorization':`Bearer ${token}`,
        },
        // body:JSON.stringify({CourseID: selectedCourse.CourseID,VidID:newVideoUrl,URL:newVideoUrl}),
      });
    const data = await response.json();
    if(data.success){
      console.log(data.message);
      const updatedModuleQuizzes = [...moduleQuizzes];
      updatedModuleQuizzes[moduleIndex] = '';
      setModuleQuizzes(updatedModuleQuizzes);
    }else{
      alert(data.message);
    }
    // Update the quizzes for the specified module by adding a new quiz link
  }catch(error){
    console.log('Error' +error);alert(error);
  }
  };

  const handleAddVideo = async (index) => {
    // Update the videos for the specified module by adding a new video
    // const token = localStorage.getItem('token');
    try{
      const response = await fetch('http://localhost:2000/videos/add',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json',
          // 'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({CourseID: selectedCourse.CourseID,VidID:newVideoUrl,URL:newVideoUrl}),
      });
    const data = await response.json();
    if(data.success){
      console.log(data.message);
      const updatedModuleVideos = [...moduleVideos];
      updatedModuleVideos[index] = [...updatedModuleVideos[index], newVideoUrl];
      setModuleVideos(updatedModuleVideos);
      // Clear the input field after adding the video
      setNewVideoUrl('');
    }else{
      alert(data.message);
    }
  }catch(error){
    console.log("error"+error);
  }
}

  const handleRemoveVideo =async (moduleIndex, videoIndex,videoUrl) => {
    // Update the videos for the specified module by removing the video at the given index
    try{
        const response = await fetch(`http://localhost:2000/videos/find/${videoUrl}`,{
        method : 'DELETE',
        headers :{
          'Content-Type':'application/json',
        },
      });
    const data = await response.json();
    if(data.success){
      console.log(data.message);
      const updatedModuleVideos = [...moduleVideos];
      updatedModuleVideos[moduleIndex].splice(videoIndex, 1);
      setModuleVideos(updatedModuleVideos);
      // Clear the input field after adding the video
    }else{
      alert(data.message);
    }
  }catch(error){
    console.log("error"+error);
  }
};

// const handleShowVideos = async () =>{
//   try{
//     const response = await fetch(`http://localhost:2000/videos/find/${selectedCourse.CourseID}`,{
//       method:'GET',
//       headers: {
//         'Content-Type':'application/json',
//       },
//     });
//     const data = await response.json();
//     if(data.success){
//       const videosByModule = {};
//       data.data.forEach((video)=> {
//         const moduleNumber = video.ModuleNumber;
//         if(!videosByModule[moduleNumber]){
//           videosByModule[moduleNumber] = [];
//         }
//         videosByModule[moduleNumber].push(video.VideoURL);
//       });
//       setModuleVideos(Object.values(videosByModule));
//     }else{
//       console.log(data.message);
//     }
//   }catch(err){
//     console.log("err" + err);
//   }
// };

  return (
    <div className="courses">
      {selectedCourse ? (
        <div>
          <h2>{selectedCourse.CourseName}</h2>
          <p>Course Details: {selectedCourse.details}</p>
          <p>Course Code: {selectedCourse.CourseID}</p>
          <p>Course Modules: {selectedCourse.modules} </p>
          <p>Course Duration: {selectedCourse.duration}</p>
          {typeof selectedCourse.modules === 'number' && selectedCourse.modules > 0 ? (
      <div>
        
        <h3>Course Modules:</h3>
        {/* Use a loop to generate the specified number of headings */}
        {[...Array(selectedCourse.modules)].map((_, moduleIndex) => (
          <div key={moduleIndex}>
            {moduleVideos.length>0 && <h4>Module {moduleIndex + 1}</h4>}
            {/* <p>Module Number: {index+1}</p> */}
            {userType === "teacher" && (
        <form className='Url Form'>
          <label>Enter Youtube URL</label>
          <input
            type='text'
            placeholder='Enter Youtube URL'
            required
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)
            }
          />
          <button type='button' onClick={()=> handleAddVideo(moduleIndex)}>
            Add video
          </button>
        </form>
      )}
      {userType === "teacher" && (
        <div>
          <label>Enter Quiz Document Link</label>
          <input
            type='text'
            placeholder='Enter Quiz Document Link'
            value={newQuizLink}
            onChange={(e) => setNewQuizLink(e.target.value)}
          />
          <button type='button' onClick={() => handleAddQuizLink(moduleIndex)}>
            Add quiz link
          </button>
          <button type='button' onClick={() => handleRemoveQuizLink(moduleIndex)}>
            Remove quiz link
          </button>
        </div>
      )}
      {moduleQuizzes[moduleIndex] && (
        <div>
          <p>Quiz Document Link: {moduleQuizzes[moduleIndex]}</p>
       </div> 
       )}


      {/* Render all videos for the current module */}
      {moduleVideos[moduleIndex].map((videoUrl, videoIndex) => (
        <div key={videoIndex}>
          <ReactPlayer url={videoUrl} />
          
          {userType === "teacher" && (
            <button
              type='button'
              onClick={() => handleRemoveVideo(moduleIndex, videoIndex,videoUrl)}
            >
              Remove video
            </button>
          )}
        </div>
      ))}

            <p>Quiz {moduleIndex + 1}: </p>
            {/* Add more details for each module if needed */}
            {/* Additional module details go here */}
          </div>
        ))}
      </div>
    ) : (
      <p>No modules available for this course.</p>
    )}

          {/* Add more course details here */}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <div>
          <section>
            <h2>Enrolled Courses</h2>
            {loading ? (
              <p>Loading enrolled courses...</p>
            ) : Object.keys(enrolledCourses).length > 0 ? (
              <ul>
                {enrolledCourses.map((course) => (
                  <li key={course.CourseID} onClick={() => handleCourseClick(course)}>
                    {course.C_Name}
                  </li>
                ))}
              </ul>
              
            ) : (
              <p>No courses enrolled yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default RegisteredCourses;
