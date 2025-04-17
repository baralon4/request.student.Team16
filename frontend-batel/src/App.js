import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddUser from './components/AddUser';
import EditUserRole from './components/EditUserRole';
import UserList from './components/UserList';
import DepartmentRequests from './components/DepartmentRequests';
import StudentDetails from './components/StudentDetails';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h2>🧑‍💼 מערכת ניהול משתמשים ובקשות</h2>
        <nav>
          <Link to="/">רשימת משתמשים</Link> |{" "}
          <Link to="/add-user">הוספת משתמש</Link> |{" "}
          <Link to="/edit-role">עריכת תפקיד</Link> |{" "}
          <Link to="/requests">בקשות לפי מחלקה</Link> |{" "}
          <Link to="/student-details">פרטי סטודנט</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-role" element={<EditUserRole />} />
          <Route path="/requests" element={<DepartmentRequests />} />
          <Route path="/student-details" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
