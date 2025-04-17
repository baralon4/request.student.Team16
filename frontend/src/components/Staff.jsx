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

    useEffect(() => {
        const data = getFromLocalStorage('projectFS');
        setUserData(data);

        if (data?.user?.username) {
            axios.get(
                `http://localhost:3006/api/staff/requests?staffUsername=${data.user.username}`,
                {
                    headers: {
                        'user-role': 'Staff'
                    }
                }
            )
            .then(res => {
                setRequests(res.data);
                setIsLoading(false); 
            })
            .catch(err => {
                console.error('Error loading staff requests:', err);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false); 
        }
    }, []);

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

                <div className="requests-box">
                    <h2>Student Requests assigned to you:</h2>

                    {isLoading ? (
                        <p>Loading requests...</p>
                    ) : (
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
                                        <td colSpan="6">No requests assigned.</td>
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

                {selectedRequest && ( 
                    <div className="request-details-box">
                        <h3>Request Details</h3>
                        <p><strong>Student:</strong> {selectedRequest.student.firstname} {selectedRequest.student.lastname}</p>
                        <p><strong>Course:</strong> {selectedRequest.course?.name}</p>
                        <p><strong>Type:</strong> {selectedRequest.requestType?.name}</p>
                        <p><strong>Description:</strong> {selectedRequest.description}</p>
                        <p><strong>Status:</strong> {selectedRequest.status}</p>
                        <p><strong>Submission Date:</strong> {new Date(selectedRequest.submissionDate).toLocaleDateString()}</p>

                        {selectedRequest.staffComments.length > 0 && (
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
