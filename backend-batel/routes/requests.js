const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const User = require('../models/User');

// בקשות לפי מחלקה
router.get('/department-requests', async (req, res) => {
  const { department } = req.query;
  try {
    const requests = await Request.find({ department });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשליפה' });
  }
});

// פרטי סטודנט
router.get('/student/:id', async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשליפת פרטי סטודנט' });
  }
});

module.exports = router;
