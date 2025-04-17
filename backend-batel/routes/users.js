const express = require('express');
const router = express.Router();
const User = require('../models/User');

// הוספת משתמש
router.post('/add-user', async (req, res) => {
  const { name, email, role, department } = req.body;
  try {
    const newUser = new User({ name, email, role, department });
    await newUser.save();
    res.status(201).json({ message: 'משתמש נוסף בהצלחה' });
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
});

// עריכת תפקיד
router.put('/update-role/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
    res.json({ message: 'התפקיד עודכן בהצלחה' });
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בעדכון' });
  }
});

// צפייה בכל המשתמשים
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשליפה' });
  }
});

module.exports = router;
