// seedCourses.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dorin:Dorin1234@cluster0.twpdzpc.mongodb.net/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ התחברת ל-MongoDB");
  seedCourses();
})
.catch(err => {
  console.error("❌ שגיאה בחיבור:", err);
});

const courseSchema = new mongoose.Schema({
  name: String
});

const Course = mongoose.model('courses', courseSchema, 'courses');

const courses = [
  { name: "מבוא לתקשורת מחשבים" },
  { name: "בסיסי נתונים" },
  { name: "חישוביות וסיבוכיות" },
  { name: "אנליזה נומרית" },
  { name: "רשתות תקשורת מחשבים" },
  { name: "מבוא לקומפילציה" },
  { name: "ניהול פרויקט תוכנה" },
  { name: "מערכות הפעלה" },
  { name: "אבטחת נתונים" }
];

async function seedCourses() {
  try {
    await Course.insertMany(courses);
    console.log("🎉 הקורסים נוספו בהצלחה למסד הנתונים");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ שגיאה בהוספת הקורסים:", err);
  }
}
