import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all-users')
      .then(res => setUsers(res.data))
      .catch(() => alert("שגיאה בטעינה"));
  }, []);

  return (
    <div className="list">
      <h3>רשימת משתמשים</h3>
      {users.map(user => (
        <div key={user._id} className="user-card">
          <b>{user.name}</b> - {user.email} - {user.role} - {user.department}
        </div>
      ))}
    </div>
  );
};

export default UserList;
