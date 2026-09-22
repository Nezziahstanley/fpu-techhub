const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check (Render uses this)
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', institution: 'Federal Polytechnic Ugep' });
});

// Optional API — serves the systems data
const systems = {
  ai: [
    { id: 'ai-1', name: 'FPU Smart Assistant', category: 'Chatbot', desc: 'AI chatbot for student enquiries, admissions, and course registration guidance.' },
    { id: 'ai-2', name: 'Student Performance Predictor', category: 'Analytics', desc: 'ML model that predicts CGPA trends and flags at-risk students early.' },
    { id: 'ai-3', name: 'Automated Attendance System', category: 'Computer Vision', desc: 'Facial recognition attendance for lectures and exams.' },
    { id: 'ai-4', name: 'Departmental Timetable Optimizer', category: 'Optimization', desc: 'AI scheduling engine to eliminate clashes across departments.' }
  ],
  cyber: [
    { id: 'cy-1', name: 'FPU Campus Network Monitor', category: 'IDS', desc: 'Real-time intrusion detection across the polytechnic network.' },
    { id: 'cy-2', name: 'Student Portal Security Scanner', category: 'AppSec', desc: 'Automated vulnerability scanning of the school portal and result checker.' },
    { id: 'cy-3', name: 'Examination Malpractice Detector', category: 'Anomaly Detection', desc: 'Detects suspicious exam submission patterns and IP spoofing.' },
    { id: 'cy-4', name: 'Multi-Factor Login Portal', category: 'IAM', desc: 'MFA + SSO for staff and student portals.' }
  ]
};

app.get('/api/systems', (req, res) => {
  res.json(systems);
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FPU TechHub running on port ${PORT}`);
  console.log(`🏫 Federal Polytechnic Ugep — AI & Cybersecurity Systems`);
});