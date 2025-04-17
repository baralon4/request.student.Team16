import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const EditUserRole = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all-users')
      .then(res => setUsers(res.data))
      .catch(() => alert("שגיאה בטעינת משתמשים"));
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/update-role/${id}`, { role: newRole });
      alert("התפקיד עודכן בהצלחה");
    } catch {
      alert("שגיאה בעדכון");
    }
  };

  return (
    <div className="list">
      <h3>עריכת תפקידים</h3>
      {users.map(user => (
        <div key={user._id} className="user-card">
          <b>{user.name}</b> ({user.role}) - {user.department}<br />
          <input
            placeholder="תפקיד חדש"
            onBlur={(e) => updateRole(user._id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default EditUserRole;
