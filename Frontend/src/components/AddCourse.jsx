import React, { useState } from "react";
import "./AddCourse.css";

const AddCourse = () => {
  const [CourseID, setCourseID] = useState("");
  const [CourseName, setCourseName] = useState("");
  const [modules, setModules] = useState("");
  const [duration, setDuration] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:2000/course/add',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({CourseID,CourseName,modules,duration}),
      });
      const result = await response.json();
      if(result.success){
        console.log(result.message);
        //Show Submitted Data
        const data = { CourseID, CourseName, modules, duration };
        setSubmittedData(data);
        // Reset the form
        setCourseID("");
        setCourseName("");
        setModules("");
        setDuration("");
        setAvailableSeats("");
        //End
      }else{
        alert(result.message);
      }
  }catch(error){
    console.log("error" + error);
    // return res.status(500).send();
  }
}
  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="label">Course ID:</div>
          <input
            type="text"
            id="CourseID"
            value={CourseID}
            onChange={(e) => setCourseID(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="label">Course Name:</div>
          <input
            type="text"
            id="CourseName"
            value={CourseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="label">Modules:</div>
          <input
            type="text"
            id="modules"
            value={modules}
            onChange={(e) => setModules(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="label">Duration:</div>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="label">Available Seats:</div>
          <input
            type="text"
            id="duration"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Course</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <p>
            Course ID: {submittedData.CourseID}, Course Name:{" "}
            {submittedData.CourseName}, Modules: {submittedData.modules},
            Duration: {submittedData.duration}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
