const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// התחברות למסד הנתונים
mongoose.connect('mongodb+srv://Dorin:Dorin1234@cluster0.twpdzpc.mongodb.net/loginDB?retryWrites=true&w=majority')
  .then(() => console.log("✅ התחברת ל-MongoDB"))
  .catch(err => console.error("❌ שגיאה בהתחברות:", err));

// אמצעי middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// הגדרת תקייה סטטית לשירות קבצי פרונט
app.use(express.static(path.join(__dirname)));

// שליחת index.html כברירת מחדל
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// סכימה של בקשת סטודנט
const requestSchema = new mongoose.Schema({
  student: String,
  staff: String,
  requestType: String,
  courseName: String,
  description: String,
  documents: [String],
  department: String,
  status: String,
  submissionDate: Date,
  staffComments: [String]
});

const StudentRequest = mongoose.model('studentrequests', requestSchema);

// סכימות לנושאים וקורסים
const topicSchema = new mongoose.Schema({ name: String });
const courseSchema = new mongoose.Schema({ name: String });

const Topic = mongoose.model('Topic', topicSchema, 'requestTopics');
const Course = mongoose.model('Course', courseSchema, 'courses');

// שמירת קבצים שהועלו בתיקיית uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// יצירת בקשה
app.post('/requests', upload.array('documents'), async (req, res) => {
  try {
    const { student, staff, requestType, courseName, description, department, status, submissionDate } = req.body;
    const documentPaths = req.files ? req.files.map(file => file.filename) : [];

    const newRequest = new StudentRequest({
      student,
      staff,
      requestType,
      courseName,
      description,
      documents: documentPaths,
      department,
      status,
      submissionDate,
      staffComments: []
    });

    await newRequest.save();
    res.status(201).json({ message: '✅ הבקשה נשלחה בהצלחה' });
  } catch (err) {
    res.status(500).json({ message: '❌ שגיאה בשמירת הבקשה', error: err.message });
  }
});

// שליפת נושאים
app.get('/api/topics', async (req, res) => {
  const topics = await Topic.find({});
  res.json(topics);
});

// שליפת קורסים
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`🚀 השרת רץ על http://localhost:${port}`);
});
