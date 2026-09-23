const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', institution: 'Federal Polytechnic Ugep' });
});

// ============================================================
//  SYSTEMS DATA
// ============================================================
const systems = {
  ai: [
    {
      id: 'ai-1',
      name: 'FPU Smart Assistant',
      category: 'Chatbot',
      shortDesc: 'AI chatbot for student enquiries, admissions, and course registration guidance.',
      longDescription:
        'The FPU Smart Assistant is a conversational AI built specifically for Federal Polytechnic Ugep. It handles admissions enquiries, course registration guidance, fee schedules, and departmental information — 24/7.',
      features: [
        '24/7 automated student enquiries',
        'Multi-language: English + Pidgin',
        'Integration with school portal',
        'Context-aware conversation memory',
        'Admin dashboard for updating responses'
      ],
      stack: ['Node.js', 'OpenAI API', 'MongoDB', 'Express'],
      status: 'Live',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/fpu-smart-assistant'
    },
    {
      id: 'ai-2',
      name: 'Student Performance Predictor',
      category: 'Analytics',
      shortDesc: 'ML model that predicts CGPA trends and flags at-risk students early.',
      longDescription:
        'Using historical academic records, this system predicts a student\'s likely CGPA trajectory and flags at-risk students before results are even released.',
      features: [
        'CGPA prediction with 90%+ accuracy',
        'Early warning alerts for at-risk students',
        'Departmental dashboards for HODs',
        'Exportable academic reports (PDF/CSV)',
        'Historical trend analysis'
      ],
      stack: ['Python', 'scikit-learn', 'Flask', 'PostgreSQL'],
      status: 'Live',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/performance-predictor'
    },
    {
      id: 'ai-3',
      name: 'Automated Attendance System',
      category: 'Computer Vision',
      shortDesc: 'Facial recognition attendance for lectures and exams.',
      longDescription:
        'A camera-based attendance system that recognizes students\' faces as they enter a lecture hall. Eliminates manual roll calls and prevents impersonation.',
      features: [
        'Real-time facial recognition',
        'Anti-spoofing (photo/video detection)',
        'Offline mode with sync',
        'Automatic attendance reports per course',
        'Admin override for edge cases'
      ],
      stack: ['OpenCV', 'TensorFlow', 'Express', 'SQLite'],
      status: 'Beta',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/attendance-system'
    },
    {
      id: 'ai-4',
      name: 'Departmental Timetable Optimizer',
      category: 'Optimization',
      shortDesc: 'AI scheduling engine to eliminate clashes across departments.',
      longDescription:
        'Generates optimal lecture timetables by balancing room availability, lecturer schedules, student cohorts, and departmental constraints.',
      features: [
        'Zero-clash timetable generation',
        'Room + lecturer + cohort balancing',
        'What-if scenario simulation',
        'Export to PDF and Excel',
        'Instant rescheduling on lecturer absence'
      ],
      stack: ['Google OR-Tools', 'Node.js', 'MySQL'],
      status: 'Live',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/timetable-optimizer'
    }
  ],

  cyber: [
    {
      id: 'cy-1',
      name: 'FPU Campus Network Monitor',
      category: 'IDS',
      shortDesc: 'Real-time intrusion detection across the polytechnic network.',
      longDescription:
        'A network intrusion detection system monitoring all campus traffic for suspicious patterns, unauthorized access attempts, and malicious traffic.',
      features: [
        'Real-time packet inspection',
        'Signature + anomaly-based detection',
        'Instant SMS/email alerts to ICT unit',
        'GeoIP mapping of attackers',
        'PCAP export for forensics'
      ],
      stack: ['Snort', 'ELK Stack', 'Node.js', 'Redis'],
      status: 'Live',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/campus-network-monitor'
    },
    {
      id: 'cy-2',
      name: 'Student Portal Security Scanner',
      category: 'AppSec',
      shortDesc: 'Automated vulnerability scanning of the school portal.',
      longDescription:
        'A scheduled scanner that continuously probes the FPU student portal and result-checker system for OWASP Top 10 vulnerabilities.',
      features: [
        'OWASP Top 10 automated checks',
        'Scheduled weekly scans',
        'Prioritized remediation report',
        'Historical vulnerability trends',
        'CI/CD pipeline integration'
      ],
      stack: ['OWASP ZAP', 'Node.js', 'PostgreSQL'],
      status: 'Live',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/portal-scanner'
    },
    {
      id: 'cy-3',
      name: 'Examination Malpractice Detector',
      category: 'Anomaly Detection',
      shortDesc: 'Detects suspicious exam submission patterns and IP spoofing.',
      longDescription:
        'Analyzes exam submission metadata — timing, IP addresses, browser fingerprints — to flag likely malpractice using an Isolation Forest model.',
      features: [
        'Real-time submission anomaly scoring',
        'IP / device fingerprint correlation',
        'Answer-pattern similarity detection',
        'Exam officer dashboard',
        'Evidence-ready audit trail'
      ],
      stack: ['Python', 'Isolation Forest', 'Redis', 'FastAPI'],
      status: 'Beta',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/malpractice-detector'
    },
    {
      id: 'cy-4',
      name: 'Multi-Factor Login Portal',
      category: 'IAM',
      shortDesc: 'MFA + SSO for staff and student portals.',
      longDescription:
        'A unified authentication gateway providing Multi-Factor Authentication (TOTP + SMS) and Single Sign-On across all FPU web systems.',
      features: [
        'TOTP + SMS second factor',
        'Single Sign-On across portals',
        'OAuth 2.0 / OIDC compliant',
        'Per-user audit logs',
        'Self-service password reset'
      ],
      stack: ['Passport.js', 'Speakeasy', 'JWT', 'PostgreSQL'],
      status: 'Live',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80',
      externalLink: 'https://example.com/mfa-portal'
    }
  ]
};

const systemsIndex = {};
Object.values(systems).flat().forEach(s => {
  systemsIndex[s.id] = { ...s, domain: s.id.startsWith('ai') ? 'ai' : 'cyber' };
});

app.get('/api/systems', (req, res) => res.json(systems));
app.get('/api/systems/:domain', (req, res) => {
  const { domain } = req.params;
  if (!systems[domain]) return res.status(404).json({ error: 'Domain not found' });
  res.json(systems[domain]);
});
app.get('/api/system/:id', (req, res) => {
  const sys = systemsIndex[req.params.id];
  if (!sys) return res.status(404).json({ error: 'System not found' });
  res.json(sys);
});

// ============ PAGE ROUTES ============
app.get('/',           (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/ai',         (req, res) => res.sendFile(path.join(__dirname, 'public', 'ai.html')));
app.get('/cyber',      (req, res) => res.sendFile(path.join(__dirname, 'public', 'cyber.html')));
app.get('/system/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'system.html')));

app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FPU TechHub running on port ${PORT}`);
  console.log(`🏫 Federal Polytechnic Ugep — AI & Cybersecurity`);
});