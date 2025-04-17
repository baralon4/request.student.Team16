document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const requestForm = document.getElementById('requestForm');
  const topicSelect = document.getElementById('topicSelect');
  const courseSelect = document.getElementById('courseSelect');
  const requiredDocs = document.getElementById('requiredDocs');
  const successMsg = document.getElementById('successMsg');

  const requiredDocsMap = {
    "בקשה למועד מיוחד": "אישור מחלה / אישור מילואים",
    "דחיית הגשת עבודה": "אישור מחלה / אישור מילואים",
    "בקשה למטלה חלופית חרבות הברזל": "אישור מילואים",
    "הגשת אישורי מילואים": "אישור מילואים",
    "שקלול עבודות בית בציון הסופי": "אישור מילואים"
  };

  startBtn.addEventListener('click', async () => {
    requestForm.classList.remove('hidden');

    // שליפת נושאים
    const topicRes = await fetch('http://localhost:3000/api/topics');
    const topics = await topicRes.json();
    topics.forEach(topic => {
      const opt = document.createElement('option');
      opt.value = topic.name;
      opt.textContent = topic.name;
      topicSelect.appendChild(opt);
    });

    // שליפת קורסים
    const courseRes = await fetch('http://localhost:3000/api/courses');
    const courses = await courseRes.json();
    courses.forEach(course => {
      const opt = document.createElement('option');
      opt.value = course.name;
      opt.textContent = course.name;
      courseSelect.appendChild(opt);
    });
  });

  topicSelect.addEventListener('change', () => {
    step2.classList.remove('hidden');
    const selectedTopic = topicSelect.value;
    const required = requiredDocsMap[selectedTopic];
    requiredDocs.textContent = required ? `📎 יש לצרף: ${required}` : '';
  });

  requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // שמות הקבצים בלבד
    const files = document.getElementById('fileUpload').files;
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
    }

    const data = {
      student: "123456",
      staff: "654321",
      requestType: topicSelect.value,
      courseName: courseSelect.value,
      description: document.getElementById('content').value,
      documents: fileNames, // שמירת שמות הקבצים
      department: "הנדסת תוכנה",
      status: "ממתין",
      submissionDate: new Date(),
      staffComments: []
    };

    try {
      const res = await fetch('http://localhost:3000/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        successMsg.classList.remove('hidden');
        requestForm.reset();
        step2.classList.add('hidden');
        requiredDocs.textContent = '';
      } else {
        alert("שגיאה: " + result.message);
      }
    } catch (err) {
      alert(" שגיאה בשליחה לשרת: " + err.message);
    }
  });
});
