import React, { useEffect, useState } from "react";
import Header from '../header';
import { getFromLocalStorage } from "../utils/services"
import './Welcome.css';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const data = getFromLocalStorage('projectFS');
      setUserData(data);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("projectFS");
      window.location.href = "/";
    };
  
    return (
      <div className="welcome-page-container">
        <Header />
  
        <div className="welcome-header-box">
          {userData && (
            <>
              <h2>שלום, {userData.user.username}!</h2>
              <p>זהו דף הניהול שלך.</p>
            </>
          )}
        </div>
  
        <div className="admin-links">
          <h3>פעולות ניהוליות:</h3>
          <ul>
            <li><Link to="/admin/add-user">הוספת משתמש</Link></li>
            <li><Link to="/admin/edit-role">עריכת תפקיד</Link></li>
            <li><Link to="/admin/user-list">רשימת משתמשים</Link></li>
          
            
          </ul>
        </div>
  
    
      </div>
    );
  };
  
  export default Admin;
  