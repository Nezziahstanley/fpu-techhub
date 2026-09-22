// generate-books.js — creates data/books.json with 200 books
const fs = require('fs');
const path = require('path');

const aiTitles = [
  'Artificial Intelligence: A Modern Approach', 'Deep Learning', 'Pattern Recognition and Machine Learning',
  'Reinforcement Learning: An Introduction', 'Machine Learning: A Probabilistic Perspective',
  'The Elements of Statistical Learning', 'Natural Language Processing with Transformers',
  'Speech and Language Processing', 'Computer Vision: Algorithms and Applications',
  'Probabilistic Robotics', 'Bayesian Reasoning and Machine Learning',
  'Neural Networks and Deep Learning', 'Python Machine Learning', 'Hands-On Machine Learning',
  'Introduction to Statistical Learning', 'Deep Reinforcement Learning',
  'Generative Deep Learning', 'Graph Neural Networks', 'Transformers for NLP',
  'Practical Natural Language Processing', 'AI: A Very Short Introduction',
  'Superintelligence', 'Life 3.0', 'The Master Algorithm', 'Human Compatible',
  'AI Superpowers', 'Machine Learning Engineering', 'Data Science for Business',
  'Storytelling with Data', 'The Hundred-Page Machine Learning Book',
  'Approaching (Almost) Any Machine Learning Problem', 'Feature Engineering for Machine Learning',
  'Designing Machine Learning Systems', 'Interpretable Machine Learning',
  'Explainable AI', 'Fairness and Machine Learning', 'Adversarial Machine Learning',
  'Federated Learning', 'Meta-Learning', 'Few-Shot Learning', 'Self-Supervised Learning',
  'Contrastive Learning', 'Attention Is All You Need', 'BERT: Pre-training of Deep Bidirectional Transformers',
  'Language Models are Few-Shot Learners', 'Mastering the Game of Go', 'Learning to Summarize from Human Feedback',
  'Deep Learning for Computer Vision', 'Medical Image Analysis with Deep Learning',
  'AI in Healthcare', 'AI in Finance', 'AI in Education', 'AI Ethics',
  'Responsible AI', 'AI Governance', 'AI Policy', 'AI Safety', 'AI Alignment',
  'Neuro-Symbolic AI', 'Cognitive Computing', 'Expert Systems', 'Knowledge Graphs',
  'Semantic Web', 'Ontology Engineering', 'Logic Programming', 'Automated Reasoning',
  'Multi-Agent Systems', 'Swarm Intelligence', 'Evolutionary Computation',
  'Genetic Algorithms', 'Fuzzy Logic', 'Rough Sets', 'Bayesian Networks',
  'Hidden Markov Models', 'Gaussian Processes', 'Support Vector Machines',
  'Decision Trees', 'Random Forests', 'Gradient Boosting', 'XGBoost',
  'CatBoost', 'LightGBM', 'Neural Architecture Search', 'AutoML',
  'Transfer Learning', 'Domain Adaptation', 'Active Learning', 'Semi-Supervised Learning',
  'Unsupervised Learning', 'Clustering Algorithms', 'Dimensionality Reduction',
  'Anomaly Detection', 'Recommender Systems', 'Time Series Analysis',
  'Causal Inference', 'Probabilistic Programming', 'Variational Inference',
  'Monte Carlo Methods', 'Markov Chain Monte Carlo', 'Reinforcement Learning Theory',
  'Deep Q-Learning', 'Policy Gradient Methods', 'Actor-Critic Methods'
];

const cyberTitles = [
  'The Web Application Hacker\'s Handbook', 'Cryptography and Network Security',
  'Hacking: The Art of Exploitation', 'Computer Networking: A Top-Down Approach',
  'Practical Malware Analysis', 'The Art of Memory Forensics', 'Applied Cryptography',
  'Serious Cryptography', 'Network Security Essentials', 'Security Engineering',
  'The Tangled Web', 'The Browser Hacker\'s Handbook', 'Web Security Testing Cookbook',
  'The Mobile Application Hacker\'s Handbook', 'iOS Application Security',
  'Android Security Internals', 'The IoT Hacker\'s Handbook', 'Hardware Security',
  'Practical Reverse Engineering', 'The IDA Pro Book', 'Reversing: Secrets of Reverse Engineering',
  'Metasploit: The Penetration Tester\'s Guide', 'The Hacker Playbook 3',
  'Penetration Testing', 'Red Team Field Manual', 'Blue Team Handbook',
  'The Practice of Network Security Monitoring', 'Applied Network Security Monitoring',
  'Network Security Through Data Analysis', 'Practical Packet Analysis',
  'Wireshark Network Analysis', 'TCP/IP Illustrated', 'Unix Network Programming',
  'The Linux Command Line', 'Linux Basics for Hackers', 'Kali Linux Revealed',
  'Mastering Linux Security and Hardening', 'The Shellcoder\'s Handbook',
  'Bug Bounty Bootcamp', 'Real-World Bug Hunting', 'Web Hacking 101',
  'Essential PHP Security', 'SQL Injection Attacks and Defense',
  'XSS Attacks', 'The Cross-Site Scripting Attacks', 'CSRF Attacks',
  'SSL and TLS: Theory and Practice', 'Bulletproof SSL and TLS',
  'Public Key Infrastructure', 'PKI Implementation', 'Blockchain Security',
  'Smart Contract Security', 'Ethereum Security', 'Bitcoin and Cryptocurrency Technologies',
  'Mastering Bitcoin', 'Mastering Ethereum', 'Zero Trust Networks',
  'Zero Trust Security', 'BeyondCorp', 'The Zero Trust Extended Ecosystem',
  'Cloud Security and Privacy', 'AWS Security', 'Azure Security', 'GCP Security',
  'Kubernetes Security', 'Docker Security', 'Container Security',
  'Securing DevOps', 'DevSecOps', 'The DevOps Handbook',
  'Threat Modeling', 'Threat Intelligence', 'Cyber Threat Intelligence',
  'Intelligence-Driven Incident Response', 'Incident Response & Computer Forensics',
  'Digital Forensics and Incident Response', 'Windows Forensic Analysis',
  'File System Forensic Analysis', 'Memory Forensics', 'Mobile Forensics',
  'Cloud Forensics', 'Network Forensics', 'Malware Forensics',
  'Social Engineering', 'The Art of Deception', 'The Art of Intrusion',
  'Ghost in the Wires', 'Countdown to Zero Day', 'Sandworm',
  'The Cuckoo\'s Egg', 'Takedown', 'Kingpin', 'We Are Anonymous',
  'Cyber War', 'The Fifth Domain', 'Dark Territory', 'This Is How They Tell Me the World Ends',
  'Permanent Record', 'The Snowden Files', 'No Place to Hide', 'The Snowden Reader'
];

const aiCategories = ['Foundations', 'Neural Networks', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'AI Ethics', 'Robotics', 'Data Science'];
const cyberCategories = ['Web Security', 'Cryptography', 'Ethical Hacking', 'Networking', 'Malware Analysis', 'Forensics', 'Cloud Security', 'Application Security', 'Threat Intelligence', 'Privacy'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const authors = [
  'Ian Goodfellow', 'Stuart Russell', 'Christopher Bishop', 'Andrew Ng',
  'Yoshua Bengio', 'Yann LeCun', 'Geoffrey Hinton', 'Richard Sutton',
  'Peter Norvig', 'Aurélien Géron', 'François Chollet', 'Andriy Burkov',
  'Bruce Schneier', 'William Stallings', 'Jon Erickson', 'Dafydd Stuttard',
  'Marcus Pinto', 'Michael Sikorski', 'James Kurose', 'Keith Ross'
];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function makeBook(id, title, prefix, categories) {
  const pad = id.toString().padStart(3, '0');
  const bookId = `${prefix}-${pad}`;
  return {
    id: bookId,
    title: title,
    author: rand(authors),
    year: randInt(2005, 2024),
    category: rand(categories),
    level: rand(levels),
    pages: randInt(150, 900),
    language: 'English',
    description: `A comprehensive academic resource on "${title}". This book covers foundational concepts, modern techniques, practical examples, and case studies designed for students and professionals in the field.`,
    chapters: [
      'Introduction & Overview',
      'Core Concepts',
      'Theoretical Foundations',
      'Advanced Techniques',
      'Practical Applications',
      'Case Studies',
      'Best Practices',
      'Future Directions'
    ],
    cover: `https://picsum.photos/seed/${bookId}/400/533`,
    pdfUrl: `https://example.com/books/${bookId}.pdf`
  };
}

const books = {
  ai: aiTitles.slice(0, 100).map((t, i) => makeBook(i + 1, t, 'ai', aiCategories)),
  cyber: cyberTitles.slice(0, 100).map((t, i) => makeBook(i + 1, t, 'cy', cyberCategories))
};

fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'data', 'books.json'), JSON.stringify(books, null, 2));

console.log(`✅ Generated ${books.ai.length} AI books + ${books.cyber.length} cyber books`);
console.log(`   📁 Saved to data/books.json`);
console.log(`   ✏️  Edit pdfUrl fields with real PDF links.`);