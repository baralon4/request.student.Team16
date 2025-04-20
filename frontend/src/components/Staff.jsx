import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../header';
import { getFromLocalStorage } from '../utils/services';
import './Welcome.css';

const Staff = () => {
    const [userData, setUserData] = useState(null);
    const [assignedRequests, setAssignedRequests] = useState([]);
    const [departmentRequests, setDepartmentRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const data = getFromLocalStorage('projectFS');
        console.log("👤 נתוני משתמש מה-localStorage:", data);
        setUserData(data);

        if (!data?.user?.username) {
            setIsLoading(false);
            return;
        }

        const fetchRequests = async () => {
            try {
                console.log(" שולח בקשה לפי מחלקה:", data.user.department);
                const assignedResPromise = axios.get(`http://localhost:3006/api/staff/requests?staffUsername=${data.user.username}`, {
                    headers: { 'user-role': 'Staff' }
                });
        
                let departmentResPromise = Promise.resolve({ data: [] });
        
                // בדיקה אם קיימת מחלקה
                if (data.user?.department) {
                    departmentResPromise = axios.get(`http://localhost:3006/api/staff/requests/department-requests?department=${data.user.department}`, {
                        headers: { 'user-role': 'Staff' }
                    });
                }
        
                const [assignedRes, departmentRes] = await Promise.all([
                    assignedResPromise,
                    departmentResPromise
                ]);
        
                console.log(" בקשות אישיות:", assignedRes.data);
                console.log(" בקשות לפי מחלקה:", departmentRes.data);
        
                setAssignedRequests(assignedRes.data);
                setDepartmentRequests(departmentRes.data);
            } catch (err) {
                console.error("Error fetching requests:", err);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchRequests();
    }, []);

    const renderRequestsTable = (requests, title) => (
        <div className="requests-box">
            <h3>{title}</h3>
            <table border="1" className="requests-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>ID</th>
                        <th>Request Type</th>
                        <th>Course</th>
                        <th>Status</th>
                        <th>Submission Date</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length === 0 ? (
                        <tr>
                            <td colSpan="6">No requests found.</td>
                        </tr>
                    ) : (
                        requests.map((req) => (
                            req.student && (
                                <tr key={req._id} onClick={() => setSelectedRequest(req)} style={{ cursor: 'pointer' }}>
                                    <td>{req.student.firstname} {req.student.lastname}</td>
                                    <td>{req.student.id}</td>
                                    <td>{req.requestType?.name || '—'}</td>
                                    <td>{req.course?.name || '—'}</td>
                                    <td>{req.status}</td>
                                    <td>{new Date(req.submissionDate).toLocaleDateString()}</td>
                                </tr>
                            )
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="welcome">
            <div className="welcome-page-container">
                <Header />

                {userData && (
                    <div className="welcome-header-box">
                        <h2>Welcome, {userData.user.username}!</h2>
                        <p>This is your Staff Page.</p>
                    </div>
                )}

                {isLoading ? (
                    <p>Loading requests...</p>
                ) : (
                    <>
                        {renderRequestsTable(assignedRequests, "Student Requests assigned to you")}
                        {renderRequestsTable(departmentRequests, "בקשות לפי המחלקה שלי")}
                    </>
                )}

                {selectedRequest && (
                    <div className="request-details-box">
                        <h3>Request Details</h3>
                        <p><strong>Student:</strong> {selectedRequest.student.firstname} {selectedRequest.student.lastname}</p>
                        <p><strong>Course:</strong> {selectedRequest.course?.name}</p>
                        <p><strong>Type:</strong> {selectedRequest.requestType?.name}</p>
                        <p><strong>Description:</strong> {selectedRequest.description}</p>
                        <p><strong>Status:</strong> {selectedRequest.status}</p>
                        <p><strong>Submission Date:</strong> {new Date(selectedRequest.submissionDate).toLocaleDateString()}</p>

                        {selectedRequest.staffComments?.length > 0 && (
                            <div>
                                <h4>Staff Comments:</h4>
                                <ul>
                                    {selectedRequest.staffComments.map((comment, idx) => (
                                        <li key={idx}>
                                            {comment.comment} - {new Date(comment.date).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button onClick={() => setSelectedRequest(null)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Staff;
