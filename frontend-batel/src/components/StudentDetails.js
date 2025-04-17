import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [id, setId] = useState("");

  const fetchDetails = () => {
    axios.get(`http://localhost:5000/api/requests/student/${id}`)
      .then(res => setStudent(res.data))
      .catch(() => alert("שגיאה בשליפת פרטים"));
  };

  return (
    <div className="form">
      <h3>פרטי סטודנט</h3>
      <input placeholder="הכנס ID של סטודנט" onChange={(e) => setId(e.target.value)} />
      <button onClick={fetchDetails}>חפש</button>
      {student && (
        <div className="user-card">
          שם: {student.name}<br />
          אימייל: {student.email}<br />
          תפקיד: {student.role}<br />
          מחלקה: {student.department}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
