import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const DepartmentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // שימי לב לשנות את שם המחלקה כאן בהתאם למשתמש שמחובר בפועל
    axios.get('http://localhost:5000/api/requests/department-requests?department=מדעי המחשב')
      .then(res => setRequests(res.data))
      .catch(() => alert("שגיאה בטעינת בקשות"));
  }, []);

  return (
    <div className="list">
      <h3>בקשות לפי מחלקה</h3>
      {requests.map((r, i) => (
        <div key={i} className="user-card">
          סטודנט: {r.studentId}<br />
          סוג: {r.type}<br />
          סטטוס: {r.status}
        </div>
      ))}
    </div>
  );
};

export default DepartmentRequests;
