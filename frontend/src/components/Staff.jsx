import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../header';
import { getFromLocalStorage } from '../utils/services';
import './Welcome.css';

const Staff = () => {
    const [userData, setUserData] = useState(null);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null); 
    const [departmentRequests, setDepartmentRequests] = useState([]);

    useEffect(() => {
        const data = getFromLocalStorage("projectFS");
        setUserData(data);
        console.log("USER DATA FROM LOCAL STORAGE:", data);
      
        if (data?.user?.username) {
          // שליפת בקשות של אותו איש סגל
          axios
            .get(`http://localhost:3006/api/staff/requests?staffUsername=${data.user.username}`, {
              headers: { "user-role": "Staff" },
            })
            .then((res) => {
              setRequests(res.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.error("Error loading staff requests:", err);
              setIsLoading(false);
            });
      
         
          axios
            .get(`http://localhost:3006/api/users/by-username/${data.user.username}`)
            .then((res) => {
              const fullUser = res.data;
              console.log("FULL USER DATA FROM API:", fullUser);
      
              if (fullUser?.department) {
                
                axios
                  .get(`http://localhost:3006/api/staff/requests/department-requests?department=${fullUser.department}`, {
                    headers: { "user-role": "Staff" },
                  })
                  .then((res) => {
                    setDepartmentRequests(res.data);
                  })
                  .catch((err) => {
                    console.error("Error loading department requests:", err);
                  });
              }
            })
            .catch((err) => {
              console.error("Error loading full user details:", err);
            });
        } else {
          setIsLoading(false);
        }
      }, []);
      




    return (
        <div className="welcome" dir="rtl">
            <div className="welcome-page-container">
                <Header />

                {userData && (
                    <div className="welcome-header-box">
                        <h2> ברוך הבא לאזור האישי שלך {userData.user.username}</h2>
                        <div style={{ marginTop: "10px" }}>
                        <a href="/staff/student-details" style={{ textDecoration: "none", color: "#1a73e8" }}>
                         🔍 מעבר לפרטי סטודנט
                            </a>
                        </div>
                    </div>
                    
                )}

                <div className="requests-box">
                    <h3>בקשות סטודנטים לטיפולך:</h3>

                    {isLoading ? (
                        <p>...טוען בקשות</p>
                    ) : (
                        <table border="1" className="requests-table">
                            <thead>
                                <tr>
                                    <th>שם הסטודנט</th>
                                    <th>ת.ז</th>
                                    <th>נושא הבקשה</th>
                                    <th>קורס</th>
                                    <th>סטטוס</th>
                                    <th>תאריך הגשה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">לא קיימות בקשות הממתינות לטיפולך</td>
                                    </tr>
                                ) : (
                                    requests.map(req => (
                                        req.student && req.staff ? (
                                            <tr 
                                                key={req._id}
                                                onClick={() => setSelectedRequest(req)} 
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <td>{req.student.firstname} {req.student.lastname}</td>
                                                <td>{req.student.id}</td>
                                                <td>{req.requestType?.name || '—'}</td>
                                                <td>{req.course?.name || '—'}</td>
                                                <td>{req.status}</td>
                                                <td>{new Date(req.submissionDate).toLocaleDateString()}</td>
                                            </tr>
                                        ) : null
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="requests-box" style={{ marginTop: "40px" }}>
                <h3>בקשות לפי המחלקה שלך:</h3>
                {departmentRequests.length === 0 ? (
                    <p>לא קיימות בקשות עבור המחלקה שלך.</p>
                ) : (
                    <table border="1" className="requests-table">
                    <thead>
                        <tr>
                        <th>שם הסטודנט</th>
                        <th>ת.ז</th>
                        <th>נושא</th>
                        <th>קורס</th>
                        <th>סטטוס</th>
                        <th>תאריך הגשה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentRequests.map((req) => (
                        <tr key={req._id}>
                            <td>{req.student?.firstname} {req.student?.lastname}</td>
                            <td>{req.student?.id}</td>
                            <td>{req.requestType?.name || '—'}</td>
                            <td>{req.course?.name || '—'}</td>
                            <td>{req.status}</td>
                            <td>{new Date(req.submissionDate).toLocaleDateString()}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                </div>

                {selectedRequest && ( 
                    <div className="request-details-box">
                        <h2>פרטי הבקשה</h2>
                        <p><strong>שם הסטודנט:</strong> {selectedRequest.student.firstname} {selectedRequest.student.lastname}</p>
                        <p><strong>קורס:</strong> {selectedRequest.course?.name}</p>
                        <p><strong>נושא:</strong> {selectedRequest.requestType?.name}</p>
                        <p><strong>תיאור הבקשה:</strong> {selectedRequest.description}</p>
                        <p><strong>סטטוס:</strong> {selectedRequest.status}</p>
                        <p><strong>תאריך הגשה:</strong> {new Date(selectedRequest.submissionDate).toLocaleDateString()}</p>

                        {selectedRequest.staffComments.length > 0 && (
                            <div>
                                <h4>הערות הסגל:</h4>
                                <ul>
                                    {selectedRequest.staffComments.map((comment, idx) => (
                                        <li key={idx}>
                                            {comment.comment} - {new Date(comment.date).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button onClick={() => setSelectedRequest(null)}>סגור</button>
                    </div>
                )} 
            </div>
        </div>
    );
};

export default Staff;
