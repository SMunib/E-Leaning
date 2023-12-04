import React, { useState } from "react";
import "./AddCourse.css";

const AddCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [modules, setModules] = useState("");
  const [duration, setDuration] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store the submitted data
    const data = { courseId, courseName, modules, duration };
    setSubmittedData(data);

    // Reset the form
    setCourseId("");
    setCourseName("");
    setModules("");
    setDuration("");
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="label">Course ID:</div>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="label">Course Name:</div>
          <input
            type="text"
            id="courseName"
            value={courseName}
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

        <button type="submit">Add Course</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <p>
            Course ID: {submittedData.courseId}, Course Name:{" "}
            {submittedData.courseName}, Modules: {submittedData.modules},
            Duration: {submittedData.duration}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
