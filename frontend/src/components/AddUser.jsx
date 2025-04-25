import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

export default function AddUser() {
  const [formData, setFormData] = useState({
    id: "", // ת"ז
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    role: "student",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData שנשלח לשרת:", formData);
    try {
      await axios.post("http://localhost:3006/api/users/add-user", formData);
      alert("משתמש נוסף בהצלחה");
    } catch (err) {
      console.error("שגיאה בהוספת משתמש:", err);
      alert("שגיאה בהוספת משתמש");
    }
  };

  return (
    <div className="form-container">
      <h2>הוספת משתמש חדש</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          value={formData.id}
          placeholder="תעודת זהות"
          onChange={handleChange}
          required
        />
        <input
          name="username"
          value={formData.username}
          placeholder="שם משתמש"
          onChange={handleChange}
          required
        />
        <input
          name="firstname"
          value={formData.firstname}
          placeholder="שם פרטי"
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          value={formData.lastname}
          placeholder="שם משפחה"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          placeholder="סיסמה"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="student">סטודנט</option>
          <option value="staff">סגל</option>
          <option value="admin">מנהל</option>
        </select>
        <input
          name="department"
          value={formData.department}
          placeholder="מחלקה"
          onChange={handleChange}
          required
        />
        <button type="submit">הוסף</button>
      </form>
    </div>
  );
}
