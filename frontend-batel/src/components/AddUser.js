import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const AddUser = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', department: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/add-user', formData);
      alert('משתמש נוסף!');
      setFormData({ name: '', email: '', role: '', department: '' });
    } catch (err) {
      alert('שגיאה בהוספה');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>הוספת משתמש</h3>
      <input name="name" placeholder="שם" onChange={handleChange} value={formData.name} required />
      <input name="email" type="email" placeholder="אימייל" onChange={handleChange} value={formData.email} required />
      <input name="role" placeholder="תפקיד" onChange={handleChange} value={formData.role} required />
      <input name="department" placeholder="מחלקה" onChange={handleChange} value={formData.department} required />
      <button type="submit">הוסף</button>
    </form>
  );
};

export default AddUser;
