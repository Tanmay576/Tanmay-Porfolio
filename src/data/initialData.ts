import { 
  UserProfile, 
  EducationItem, 
  SkillItem, 
  ProjectItem, 
  CertificateItem, 
  VaultDocument,
  LearningHubItem,
  DeveloperNetworkProfile,
  TimelineEvent,
  AchievementItem,
  BlogPostItem
} from '../types';

export const INITIAL_PROFILE: UserProfile = {
  name: 'Tanmay Garai',
  headline: '3rd Year CSE Student • Web Developer • Programmer',
  shortBio: '3rd Year Computer Science Engineering student at Pandit Raghunath Murmu Smriti Mahavidyalaya passionate about programming, web development, problem solving and building modern digital products.',
  personalIntro: 'Hello! I am Tanmay Garai, a 3rd Year Computer Science Engineering student at Pandit Raghunath Murmu Smriti Mahavidyalaya. I have a strong passion for software development, web technologies, and programming. I enjoy learning new technologies, experimenting with real-world projects, and turning ideas into useful digital applications.',
  careerGoal: 'To build impactful software systems, engineer clean web architectures, and grow into a skilled Software Engineer.',
  profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  college: 'Pandit Raghunath Murmu Smriti Mahavidyalaya',
  course: 'Computer Science Engineering (CSE)',
  department: 'Computer Science & Engineering Department',
  yearSemester: '3rd Year Student',
  passingYear: '2026',
  cgpa: '8.85 / 10.0',
  email: 'garai.com2006@gmail.com',
  phone: '+91 98765 43210',
  location: 'Bankura, West Bengal, India',
  socialLinks: {
    github: 'https://github.com/tanmaygarai',
    linkedin: 'https://linkedin.com/in/tanmaygarai',
    instagram: 'https://instagram.com/tanmaygarai',
    youtube: 'https://youtube.com',
    twitter: 'https://twitter.com',
    leetcode: 'https://leetcode.com/tanmaygarai',
  },
  resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  resumeFileName: 'Tanmay_Garai_CSE_Resume.pdf',
  resumeUpdatedAt: 'September 2026',
  stats: {
    projectsCount: 10,
    certificatesCount: 6,
    codingProblemsCount: 500,
    cgpaScore: '8.85',
  },
};

export const INITIAL_SKILLS: SkillItem[] = [
  // Programming
  { id: 'sk-c', name: 'C', category: 'Programming', proficiency: 78, levelLabel: 'Intermediate', overview: 'Procedural programming, memory pointers, structures, file I/O, and low-level algorithmic logic.', keyTopics: ['Pointers', 'Structures', 'Dynamic Memory', 'File Handling'] },
  { id: 'sk-cpp', name: 'C++', category: 'Programming', proficiency: 80, levelLabel: 'Intermediate', overview: 'Object-oriented programming, Standard Template Library (STL), and competitive problem solving.', keyTopics: ['STL Vectors & Maps', 'Classes & Objects', 'Inheritance', 'Templates'] },
  { id: 'sk-java', name: 'Java', category: 'Programming', proficiency: 70, levelLabel: 'Learning', overview: 'Core Java, OOP principles, exception handling, multithreading, and collections framework.', keyTopics: ['Collections API', 'JVM Internals', 'Multithreading', 'OOP Design'] },
  { id: 'sk-py', name: 'Python', category: 'Programming', proficiency: 75, levelLabel: 'Intermediate', overview: 'Scripting, algorithmic prototyping, backend automation, and data structure manipulation.', keyTopics: ['Data Structures', 'File Handling', 'Decorators', 'APIs'] },
  { id: 'sk-js', name: 'JavaScript', category: 'Programming', proficiency: 82, levelLabel: 'Intermediate', overview: 'Modern ECMAScript (ES6+), async/await, closures, promises, and browser DOM manipulation.', keyTopics: ['ES6+', 'Event Loop', 'Promises & Fetch', 'DOM APIs'] },
  { id: 'sk-ts', name: 'TypeScript', category: 'Programming', proficiency: 74, levelLabel: 'Intermediate', overview: 'Static type checking, interfaces, generics, union types, and robust React development.', keyTopics: ['Type Annotations', 'Interfaces', 'Generics', 'Utility Types'] },

  // Web Development
  { id: 'sk-html', name: 'HTML', category: 'Web Development', proficiency: 88, levelLabel: 'Intermediate', overview: 'Semantic markup, accessibility (a11y), responsive meta tags, and structured document design.', keyTopics: ['Semantic Tags', 'Forms & Validation', 'SEO Basics', 'Accessibility'] },
  { id: 'sk-css', name: 'CSS', category: 'Web Development', proficiency: 84, levelLabel: 'Intermediate', overview: 'Modern styling with Tailwind CSS, Flexbox, CSS Grid, custom animations, and responsive breakpoints.', keyTopics: ['Tailwind CSS', 'Flexbox & Grid', 'Keyframes', 'Variables'] },
  { id: 'sk-react', name: 'React', category: 'Web Development', proficiency: 80, levelLabel: 'Intermediate', overview: 'Functional components, hooks, context state management, component lifecycles, and Vite SPA tooling.', keyTopics: ['Hooks', 'Context API', 'State Management', 'Virtual DOM'] },
  { id: 'sk-node', name: 'Node.js', category: 'Web Development', proficiency: 72, levelLabel: 'Learning', overview: 'Server-side runtime, npm ecosystem, asynchronous non-blocking event-driven architectures.', keyTopics: ['Event Loop', 'Buffer & Streams', 'NPM Scripts', 'File System'] },
  { id: 'sk-express', name: 'Express', category: 'Web Development', proficiency: 75, levelLabel: 'Learning', overview: 'RESTful API routing, JSON middleware, error handling, and backend server configuration.', keyTopics: ['Routing', 'Middleware', 'CORS & Auth', 'REST Design'] },

  // Database
  { id: 'sk-mysql', name: 'MySQL', category: 'Database', proficiency: 76, levelLabel: 'Intermediate', overview: 'Relational database schema modeling, normalization, complex JOIN queries, and transactions.', keyTopics: ['SELECT & JOINs', 'Normalization', 'Indexes', 'ACID Properties'] },
  { id: 'sk-mongodb', name: 'MongoDB', category: 'Database', proficiency: 70, levelLabel: 'Learning', overview: 'NoSQL document storage, BSON collections, indexing, and flexible unstructured data design.', keyTopics: ['Document Model', 'CRUD Operations', 'Aggregation Pipeline', 'Indexes'] },

  // Computer Science
  { id: 'sk-dsa', name: 'Data Structures', category: 'Computer Science', proficiency: 78, levelLabel: 'Intermediate', overview: 'Arrays, linked lists, stacks, queues, trees, binary search trees, heaps, and graphs.', keyTopics: ['Trees & Graphs', 'Heaps', 'Linked Lists', 'Hash Maps'] },
  { id: 'sk-algo', name: 'Algorithms', category: 'Computer Science', proficiency: 75, levelLabel: 'Intermediate', overview: 'Sorting & searching, recursion, two-pointer techniques, greedy algorithms, and dynamic programming.', keyTopics: ['Big-O Analysis', 'Divide & Conquer', 'Dynamic Programming', 'Graph Traversal'] },
  { id: 'sk-dbms', name: 'DBMS', category: 'Computer Science', proficiency: 79, levelLabel: 'Intermediate', overview: 'Database architecture, ER modeling, relational calculus, transaction management, and concurrency control.', keyTopics: ['ER Modeling', 'Relational Algebra', 'Concurrency Control', 'Recovery'] },
  { id: 'sk-os', name: 'Operating Systems', category: 'Computer Science', proficiency: 76, levelLabel: 'Intermediate', overview: 'Process scheduling, threads, synchronization, semaphores, deadlock handling, and virtual memory paging.', keyTopics: ['Process Scheduling', 'Virtual Memory', 'Deadlocks', 'Semaphores'] },
  { id: 'sk-cn', name: 'Computer Networks', category: 'Computer Science', proficiency: 74, levelLabel: 'Intermediate', overview: 'OSI 7-layer model, TCP/IP stack, IP addressing & subnets, routing algorithms, HTTP/HTTPS, and DNS.', keyTopics: ['TCP/IP Stack', 'Subnetting', 'HTTP/S & DNS', 'Routing Protocols'] },

  // Tools
  { id: 'sk-git', name: 'Git', category: 'Tools', proficiency: 82, levelLabel: 'Intermediate', overview: 'Version control branching, staging, rebasing, stash workflows, and commit history management.', keyTopics: ['Branching', 'Rebase & Merge', 'Conflict Resolution', 'Git CLI'] },
  { id: 'sk-gh', name: 'GitHub', category: 'Tools', proficiency: 84, levelLabel: 'Intermediate', overview: 'Collaborative development, pull requests, issue tracking, markdown documentation, and GitHub Pages.', keyTopics: ['Pull Requests', 'Issue Tracking', 'Actions Basics', 'Releases'] },

  // Cyber Security
  { id: 'sk-crypto', name: 'Cryptography', category: 'Cyber Security', proficiency: 68, levelLabel: 'Familiar', overview: 'Symmetric vs asymmetric ciphers, hashing (SHA-256), RSA algorithms, digital signatures, and SSL/TLS handshake.', keyTopics: ['AES & RSA', 'Cryptographic Hash', 'Public Key Infra', 'Digital Signatures'] },
  { id: 'sk-sec', name: 'Cyber Security', category: 'Cyber Security', proficiency: 66, levelLabel: 'Familiar', overview: 'Fundamental security principles (CIA triad), OWASP Top 10 vulnerabilities (SQLi, XSS), and secure coding.', keyTopics: ['OWASP Top 10', 'Authentication & JWT', 'Input Sanitization', 'Network Firewalls'] },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-knowmore',
    title: 'KnowMoreQuiz',
    description: 'An interactive real-time quiz application designed for students and trivia enthusiasts. Features multi-category technical questions, time-attack modes, instantaneous score evaluation, and responsive cyber-themed UI.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vite', 'Web Storage API'],
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/example/knowmorequiz',
    liveDemoUrl: 'https://example.com/knowmorequiz',
    status: 'Completed',
    featured: true,
    startDate: 'Nov 2025',
    endDate: 'Jan 2026',
    highlights: [
      'Engineered dynamic timed quiz engine with instant score telemetry',
      'Configurable question pools covering Computer Science, DSA, and General Tech',
      'Smooth layout animations and interactive review breakdown'
    ]
  },
  {
    id: 'proj-telecom',
    title: 'Shree Krishna Telecom Website',
    description: 'Full-featured web portal for a modern retail and telecommunications store. Includes live product catalog displays, mobile recharge & DTH inquiry workflows, device repair tracking, and localized customer support integrations.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Responsive Design'],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/example/shree-krishna-telecom',
    liveDemoUrl: 'https://example.com/telecom',
    status: 'Completed',
    featured: true,
    startDate: 'Sep 2025',
    endDate: 'Nov 2025',
    highlights: [
      'Interactive catalog for smartphones, accessories, and network SIM plans',
      'Direct WhatsApp inquiry integration and service appointment request flow',
      'Optimized lightweight asset delivery with 99+ mobile performance score'
    ]
  },
  {
    id: 'proj-travels',
    title: 'Meghpyon Tour & Travels',
    description: 'A dynamic travel agency website offering curated tour package exploration, destination galleries, itinerary timelines, and online booking inquiry forms for mountain and cultural expeditions.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Formspree'],
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/example/meghpyon-travels',
    liveDemoUrl: 'https://example.com/meghpyon',
    status: 'Completed',
    featured: true,
    startDate: 'Jul 2025',
    endDate: 'Aug 2025',
    highlights: [
      'Interactive travel itinerary modal with day-by-day activity timelines',
      'Filterable package selector by duration, region, and budget category',
      'Custom image gallery with high-res lightbox preview experience'
    ]
  },
  {
    id: 'proj-vault',
    title: 'CloudVault - Academic Document Vault',
    description: 'Secure, encrypted digital document vault and academic repository with Firebase Cloud Storage, Firestore metadata synchronization, instant PDF/Image viewers, and multi-filter file searching.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase Auth', 'Firestore', 'Firebase Storage'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/example/cloud-vault',
    liveDemoUrl: '#',
    status: 'Completed',
    featured: true,
    startDate: 'Jan 2026',
    endDate: 'Mar 2026',
    highlights: [
      'Granular Firestore security rules preventing unauthorized file metadata exposure',
      'Embedded PDF canvas and pan/zoom image previewers with file details',
      'Categorized dashboard with instant category filtering and search'
    ]
  },
  {
    id: 'proj-dsa',
    title: 'Algorithm & Data Structure Visualizer',
    description: 'Interactive visual playground illustrating sorting algorithms (QuickSort, MergeSort) and graph traversals (BFS, DFS, Dijkstra) in step-by-step animations for student learning.',
    technologies: ['React', 'TypeScript', 'Canvas API', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/example/algo-visualizer',
    liveDemoUrl: '#',
    status: 'Completed',
    featured: false,
    startDate: 'May 2025',
    endDate: 'Jun 2025',
    highlights: [
      'Interactive play/pause, step execution, and custom array input generation',
      'Visual Big-O comparisons and memory usage telemetry per algorithm'
    ]
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    name: 'Python for Everybody & Programming Foundations',
    organization: 'University of Michigan / Coursera',
    issueDate: 'January 2026',
    certificateId: 'UMICH-PY-2026-TG',
    credentialUrl: 'https://coursera.org/verify',
    fileUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
    fileType: 'image',
    skillsLearned: ['Python Basics', 'Data Structures', 'Web Scraping', 'Database Access'],
    description: 'Comprehensive specialization covering core Python programming, data retrieval, and data processing.',
    category: '📜 Certificates'
  },
  {
    id: 'cert-2',
    name: 'Data Structures and Algorithms Fundamentals',
    organization: 'NPTEL / IIT Kharagpur',
    issueDate: 'November 2025',
    certificateId: 'NPTEL-DSA-2025-081',
    credentialUrl: 'https://nptel.ac.in',
    fileUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    fileType: 'image',
    skillsLearned: ['Asymptotic Complexity', 'Sorting & Searching', 'Trees', 'Graphs'],
    description: 'Rigorous academic certification on fundamental algorithms, recurrence relations, and memory-efficient data structures.',
    category: '📜 Certificates'
  },
  {
    id: 'cert-3',
    name: 'Full Stack Web Development & React Bootcamp',
    organization: 'Udemy / Angela Yu',
    issueDate: 'August 2025',
    certificateId: 'UC-REACT-882109',
    credentialUrl: 'https://udemy.com/certificate/UC-REACT-882109',
    fileUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    fileType: 'image',
    skillsLearned: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    description: 'Hands-on project certification demonstrating full-stack engineering with modern JavaScript and React.',
    category: '📜 Certificates'
  },
  {
    id: 'cert-4',
    name: 'Introduction to Cybersecurity & Defensive Practices',
    organization: 'Cisco Networking Academy',
    issueDate: 'April 2025',
    certificateId: 'CSCO-SEC-99824',
    credentialUrl: 'https://cisco.netacad.com/verify',
    fileUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    fileType: 'image',
    skillsLearned: ['Network Security', 'Cryptography', 'Malware Defense', 'Firewalls'],
    description: 'Fundamental security training covering threat analysis, authentication protocols, and defense strategies.',
    category: '📜 Certificates'
  },
  {
    id: 'cert-5',
    name: 'Database Management Systems & SQL Mastery',
    organization: 'Oracle Academy',
    issueDate: 'January 2025',
    certificateId: 'ORCL-DBMS-77215',
    credentialUrl: 'https://academy.oracle.com',
    fileUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    fileType: 'image',
    skillsLearned: ['SQL Queries', 'Relational Schema', 'Transactions', 'Triggers'],
    description: 'Certified in database relational design, multi-table joins, subqueries, and database indexing.',
    category: '📜 Certificates'
  },
  {
    id: 'cert-6',
    name: 'C Programming & Problem Solving',
    organization: 'HackerRank Certified',
    issueDate: 'October 2024',
    certificateId: 'HR-C-CERT-3391',
    credentialUrl: 'https://hackerrank.com/certificates',
    fileUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    fileType: 'image',
    skillsLearned: ['Pointers', 'Memory Allocation', 'String Processing', 'Recursion'],
    description: 'Validated proficiency in solving algorithmic problems and memory management using C.',
    category: '📜 Certificates'
  }
];

export const INITIAL_SAMPLE_DOCS: VaultDocument[] = [
  {
    id: 'doc-seed-1',
    userId: 'demo-user',
    fileName: 'Tanmay_Garai_CSE_Resume_2026.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    storagePath: '/users/demo-user/resume/Tanmay_Garai_CSE_Resume_2026.pdf',
    category: 'Resume',
    fileType: 'pdf',
    fileSize: 184500, // ~180 KB
    description: 'Current ATS-formatted Computer Science Engineering undergraduate resume highlighting projects, skills, and coursework.',
    tags: ['Resume', 'CV', 'Placement', 'Software Engineering'],
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
    isFavorite: true
  },
  {
    id: 'doc-seed-2',
    userId: 'demo-user',
    fileName: 'BTech_CSE_Semester_V_GradeCard.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    storagePath: '/users/demo-user/documents/BTech_CSE_Semester_V_GradeCard.pdf',
    category: 'Academic Documents',
    fileType: 'pdf',
    fileSize: 412000,
    description: 'Official Semester 5 Academic Transcript and Grade Report for Computer Science Engineering. SGPA: 8.95.',
    tags: ['Transcript', 'Semester 5', 'Grades', 'Academic'],
    createdAt: '2026-01-20T14:30:00Z',
    updatedAt: '2026-01-20T14:30:00Z',
    isFavorite: true
  },
  {
    id: 'doc-seed-3',
    userId: 'demo-user',
    fileName: 'Operating_Systems_Process_Scheduling_Notes.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    storagePath: '/users/demo-user/notes/Operating_Systems_Process_Scheduling_Notes.pdf',
    category: 'Notes',
    fileType: 'pdf',
    fileSize: 620400,
    description: 'Comprehensive study revision notes covering CPU scheduling algorithms, virtual memory paging, semaphores, and synchronization.',
    tags: ['Operating Systems', 'Notes', 'Exams', 'CSE'],
    createdAt: '2025-11-10T09:15:00Z',
    updatedAt: '2025-11-10T09:15:00Z',
    isFavorite: false
  },
  {
    id: 'doc-seed-4',
    userId: 'demo-user',
    fileName: 'Data_Structures_Quick_Reference_Sheet.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    storagePath: '/users/demo-user/study/Data_Structures_Quick_Reference_Sheet.pdf',
    category: 'Study Materials',
    fileType: 'pdf',
    fileSize: 535000,
    description: 'Detailed cheat sheet containing Big-O time and space complexities, binary tree formulas, and graph traversal patterns.',
    tags: ['DSA', 'Study Material', 'Algorithms', 'Reference'],
    createdAt: '2025-10-05T16:20:00Z',
    updatedAt: '2025-10-05T16:20:00Z',
    isFavorite: true
  },
  {
    id: 'doc-seed-5',
    userId: 'demo-user',
    fileName: 'KnowMoreQuiz_System_Architecture_Diagram.png',
    fileUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    storagePath: '/users/demo-user/projects/KnowMoreQuiz_System_Architecture_Diagram.png',
    category: 'Projects',
    fileType: 'png',
    fileSize: 840000,
    description: 'System architectural blueprint, component state diagram, and data flow pipeline for the KnowMoreQuiz application.',
    tags: ['KnowMoreQuiz', 'Architecture', 'Projects', 'Design'],
    createdAt: '2025-12-01T11:00:00Z',
    updatedAt: '2025-12-01T11:00:00Z',
    isFavorite: false
  },
  {
    id: 'doc-seed-6',
    userId: 'demo-user',
    fileName: 'Python_Programming_Specialization_Certificate.png',
    fileUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
    storagePath: '/users/demo-user/certificates/Python_Programming_Specialization_Certificate.png',
    category: 'Certificates',
    fileType: 'png',
    fileSize: 720000,
    description: 'Verified Certificate of Completion for Python for Everybody issued by Coursera & University of Michigan.',
    tags: ['Certificate', 'Python', 'Coursera', 'Verified'],
    createdAt: '2026-01-28T15:45:00Z',
    updatedAt: '2026-01-28T15:45:00Z',
    isFavorite: true
  }
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: 'edu-btech',
    level: 'Undergraduate (3rd Year CSE)',
    institution: 'Pandit Raghunath Murmu Smriti Mahavidyalaya',
    boardOrUniversity: 'Bankura University / Affiliated University',
    degreeOrStream: 'Computer Science Engineering (CSE) - 3rd Year',
    duration: '2023 - 2026',
    scoreOrCgpa: '8.85 CGPA',
    passingYear: '2026',
    location: 'Bankura, West Bengal, India',
    description: 'Currently pursuing Computer Science Engineering at Pandit Raghunath Murmu Smriti Mahavidyalaya and developing practical knowledge in programming, software development, and computer science fundamentals.',
    highlights: [
      '3rd Year CSE Department student with consistent academic distinction',
      'Core coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Software Engineering',
      'Developed real-world web projects including KnowMoreQuiz and Shree Krishna Telecom'
    ]
  },
  {
    id: 'edu-hs',
    level: 'Higher Secondary (12th)',
    institution: 'Higher Secondary Vidyalaya',
    boardOrUniversity: 'West Bengal Council of Higher Secondary Education (WBCHSE)',
    degreeOrStream: 'Science Stream (Physics, Chemistry, Mathematics, Computer Science)',
    duration: '2020 - 2022',
    scoreOrCgpa: '91.4%',
    passingYear: '2022',
    location: 'West Bengal, India',
    description: 'Strong foundation in mathematical physics, analytical calculus, and foundational computer programming in C and Python.',
    highlights: [
      'Scored 95/100 in Mathematics & Computer Science',
      'District Science Seminar and Logic Olympiad Participant'
    ]
  },
  {
    id: 'edu-madhyamik',
    level: 'Madhyamik (10th)',
    institution: 'High School',
    boardOrUniversity: 'West Bengal Board of Secondary Education (WBBSE)',
    degreeOrStream: 'General Secondary Academic Education',
    duration: '2010 - 2020',
    scoreOrCgpa: '90.2%',
    passingYear: '2020',
    location: 'West Bengal, India',
    description: 'Comprehensive secondary schooling with distinction in Mathematics and Physical Sciences.',
    highlights: [
      'Top distinction marks across scientific subjects',
      'Active participation in school mathematics and quiz competitions'
    ]
  }
];

export const INITIAL_LEARNING_HUB: LearningHubItem[] = [
  {
    id: 'learn-1',
    title: 'Java & Object-Oriented Design',
    category: 'Core Language',
    description: 'Deepening understanding of Java memory model, Garbage Collection, multithreading, and Clean Code principles.',
    status: 'In Progress',
    progress: 72,
    iconName: 'Coffee',
    keyConcepts: ['JVM Architecture', 'Collections Framework', 'Concurrency', 'Design Patterns']
  },
  {
    id: 'learn-2',
    title: 'Python & Scripting Automation',
    category: 'Core Language',
    description: 'Exploring asynchronous IO, web scraping, automation scripts, and backend microservice prototypes.',
    status: 'Practicing',
    progress: 78,
    iconName: 'Terminal',
    keyConcepts: ['Asyncio', 'FastAPI', 'Data Parsing', 'Unit Testing']
  },
  {
    id: 'learn-3',
    title: 'Data Structures & Algorithms (DSA)',
    category: 'Computer Science',
    description: 'Actively solving graph algorithms, dynamic programming problems, and binary tree traversals on LeetCode.',
    status: 'Active Focus',
    progress: 80,
    iconName: 'Cpu',
    keyConcepts: ['Graphs (BFS/DFS)', 'Dynamic Programming', 'Binary Trees', 'Two Pointers']
  },
  {
    id: 'learn-4',
    title: 'Modern Web Development (React + Node)',
    category: 'Full Stack',
    description: 'Building responsive full-stack applications with React, TypeScript, Node.js, and serverless architectures.',
    status: 'Practicing',
    progress: 82,
    iconName: 'Globe',
    keyConcepts: ['Component Lifecycles', 'REST APIs', 'JWT Authentication', 'Tailwind CSS']
  },
  {
    id: 'learn-5',
    title: 'Database Management Systems (DBMS)',
    category: 'Data Engineering',
    description: 'Practicing SQL query optimization, database normalization (1NF-BCNF), indexing strategies, and ACID properties.',
    status: 'In Progress',
    progress: 76,
    iconName: 'Database',
    keyConcepts: ['Indexing & B-Trees', 'ACID Transactions', 'Joins & Subqueries', 'Schema Design']
  },
  {
    id: 'learn-6',
    title: 'Operating Systems (OS)',
    category: 'Systems',
    description: 'Studying CPU scheduling algorithms, virtual memory paging, process synchronization, semaphores, and deadlocks.',
    status: 'In Progress',
    progress: 75,
    iconName: 'Layers',
    keyConcepts: ['Process Scheduling', 'Virtual Memory', 'Semaphores & Locks', 'Deadlocks']
  },
  {
    id: 'learn-7',
    title: 'Computer Networks (CN)',
    category: 'Networking',
    description: 'Mastering TCP/IP vs OSI layers, subnetting, sliding window flow control, DNS, and HTTP/3 transport.',
    status: 'In Progress',
    progress: 74,
    iconName: 'Network',
    keyConcepts: ['TCP/IP Protocol Suite', 'Subnetting & Routing', 'DNS & Socket APIs', 'HTTPS & TLS']
  },
  {
    id: 'learn-8',
    title: 'Cryptography',
    category: 'Security',
    description: 'Understanding symmetric & asymmetric encryption, RSA mathematics, SHA-256 hashing, and digital certificates.',
    status: 'Exploring',
    progress: 68,
    iconName: 'Key',
    keyConcepts: ['RSA & AES', 'Hashing Algorithms', 'Public Key Infrastructure', 'Digital Signatures']
  },
  {
    id: 'learn-9',
    title: 'Cyber Security Essentials',
    category: 'Security',
    description: 'Analyzing web application vulnerabilities based on OWASP Top 10, cross-site scripting (XSS), and SQL injection defense.',
    status: 'Exploring',
    progress: 65,
    iconName: 'Shield',
    keyConcepts: ['OWASP Top 10', 'Penetration Testing Basics', 'Input Sanitization', 'Firewalls']
  }
];

export const INITIAL_DEVELOPER_NETWORK: DeveloperNetworkProfile[] = [
  {
    id: 'dev-github',
    platform: 'GitHub',
    username: 'tanmaygarai',
    profileUrl: 'https://github.com',
    metrics: '25+ Repositories • Active Contributions',
    badgeText: 'Open Source & Projects',
    color: 'from-gray-700 to-zinc-900'
  },
  {
    id: 'dev-leetcode',
    platform: 'LeetCode',
    username: 'tanmay_garai',
    profileUrl: 'https://leetcode.com',
    metrics: '220+ Problems Solved • DSA Practice',
    badgeText: 'Algorithmic Problem Solving',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'dev-hackerrank',
    platform: 'HackerRank',
    username: 'tanmaygarai_dev',
    profileUrl: 'https://hackerrank.com',
    metrics: '5-Star C & Problem Solving',
    badgeText: 'Verified Skill Badges',
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'dev-codechef',
    platform: 'CodeChef',
    username: 'tanmay_g',
    profileUrl: 'https://codechef.com',
    metrics: 'Active Contestant • Div 3',
    badgeText: 'Competitive Programming',
    color: 'from-amber-700 to-amber-950'
  },
  {
    id: 'dev-gfg',
    platform: 'GeeksforGeeks',
    username: 'tanmaygarai',
    profileUrl: 'https://geeksforgeeks.org',
    metrics: '150+ Coding Score • Articles Read',
    badgeText: 'CS Fundamentals & DSA',
    color: 'from-green-600 to-emerald-900'
  }
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2026',
    title: 'Computer Science Engineering (Final Year)',
    subtitle: 'Advanced Systems, Cloud Vault & Capstone Engineering',
    description: 'Engaged in core distributed software development, full-stack systems engineering, and preparing for competitive software engineering opportunities.',
    tags: ['B.Tech CSE', 'CloudVault', 'System Design', 'Algorithms'],
    status: 'Current'
  },
  {
    year: '2025',
    title: 'Programming & Web Development Expansion',
    subtitle: 'Full-Stack Web, Projects & Core CS Theory',
    description: 'Built production web apps including KnowMoreQuiz, Shree Krishna Telecom, and Meghpyon Travels. Mastered React, Tailwind, and database modeling.',
    tags: ['KnowMoreQuiz', 'React', 'DBMS', 'Operating Systems'],
    status: 'Completed'
  },
  {
    year: '2024',
    title: 'Started Exploring Computer Science',
    subtitle: 'Foundational Programming, C/C++ & DSA',
    description: 'Began deep dive into computational thinking, C & C++ memory pointer mechanics, object-oriented concepts, and fundamental data structures.',
    tags: ['C / C++', 'Object-Oriented Design', 'DSA Foundations', 'Linux'],
    status: 'Completed'
  },
  {
    year: '2022',
    title: 'Higher Secondary (Science Stream)',
    subtitle: 'Physics, Chemistry, Mathematics & Computing Foundations',
    description: 'Completed 10+2 Higher Secondary examination with 91.4% aggregate and top honors in Mathematics and Computer Science.',
    tags: ['WBCHSE 91.4%', 'Pure Mathematics', 'Computing Foundations'],
    status: 'Completed'
  },
  {
    year: '2020',
    title: 'Secondary Education (Madhyamik)',
    subtitle: 'Distinction with 90.2%',
    description: 'Completed foundational secondary schooling with distinction across all core academic disciplines.',
    tags: ['WBBSE 90.2%', 'General Sciences', 'Academic Distinction'],
    status: 'Completed'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    emoji: '🏆',
    title: 'Coding Competitions & DSA Practice',
    category: 'Competitive Programming',
    description: 'Active participant in algorithmic problem solving, collegiate coding contests, and solved 500+ coding problems across LeetCode, HackerRank, and CodeChef.',
    date: '2025 - 2026',
    badge: '500+ Solved'
  },
  {
    id: 'ach-2',
    emoji: '📜',
    title: 'Verified Technical Certifications',
    category: 'Credentials',
    description: 'Earned 6+ industry-recognized certifications in Python Programming, Data Structures & Algorithms, Full Stack Web Development, and Cybersecurity Fundamentals.',
    date: '2025 - 2026',
    badge: '6 Certs'
  },
  {
    id: 'ach-3',
    emoji: '🚀',
    title: 'Production Project Launches',
    category: 'Software Engineering',
    description: 'Designed, engineered, and deployed real-world applications including the KnowMoreQuiz student platform, Shree Krishna Telecom business portal, and CloudVault document vault.',
    date: '2025 - 2026',
    badge: 'Live Apps'
  },
  {
    id: 'ach-4',
    emoji: '🎓',
    title: 'Academic Distinction in 3rd Year CSE',
    category: 'Academics',
    description: 'Maintained 8.85 CGPA aggregate in Computer Science Engineering at Pandit Raghunath Murmu Smriti Mahavidyalaya with high marks in System Programming & Mathematics.',
    date: '2023 - 2026',
    badge: '8.85 CGPA'
  },
  {
    id: 'ach-5',
    emoji: '💡',
    title: 'Hackathons & Technical Innovation',
    category: 'Innovation',
    description: 'Participated in collegiate hackathons designing student productivity tools, encrypted document repositories, and interactive visual learning platforms.',
    date: '2025',
    badge: 'Innovator'
  },
  {
    id: 'ach-6',
    emoji: '📚',
    title: 'Computer Science Learning Milestones',
    category: 'Self Learning',
    description: 'Completed comprehensive practical tracks across Object-Oriented Java, Python Automation, React ecosystem, Relational DBMS (MySQL), and Network Protocols.',
    date: '2024 - 2026',
    badge: 'Milestone'
  }
];

export const INITIAL_BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'blog-crypto',
    title: 'What is Cryptography?',
    category: 'Computer Science',
    date: '2026',
    readTime: '4 min read',
    description: 'Notes on how mathematical encryption and modern ciphers keep data private, authenticated, and secure across distributed networks.',
    content: [
      'Cryptography is the science and art of protecting information by transforming it into an unreadable format that only authorized parties with the appropriate secret key can decipher.',
      'In computer science, modern cryptography is founded on the CIA Triad: Confidentiality (ensuring unauthorized parties cannot read data), Integrity (ensuring data has not been altered in transit), and Authentication (verifying the identity of communicators).',
      'The two primary paradigms are Symmetric Cryptography (where the same secret key is used for encryption and decryption, such as AES-256) and Asymmetric Cryptography (which uses a public/private key pair, such as RSA and Elliptic Curve Cryptography).',
      'As a CSE student, studying mathematical primitives like modular arithmetic, prime factorization, and SHA-256 cryptographic hashing illuminates how the entire modern web—including HTTPS, SSH, and blockchain—maintains trust over untrusted channels.'
    ],
    tags: ['Cryptography', 'Security', 'AES', 'RSA', 'Networking']
  },
  {
    id: 'blog-xor',
    title: 'XOR Operation Explained',
    category: 'Programming',
    date: '2026',
    readTime: '3 min read',
    description: 'A quick breakdown of the XOR bitwise operator (^) and its ubiquitous uses in parity checks, finding unique elements, and encryption masks.',
    content: [
      'The Exclusive OR (XOR, denoted by ^ in C, C++, Java, and JavaScript) evaluates to 1 (true) if and only if its operand inputs are different. If both bits are identical (0 and 0, or 1 and 1), XOR evaluates to 0.',
      'Key mathematical properties of XOR: 1) Identity: x ^ 0 = x. 2) Self-Inverse: x ^ x = 0. 3) Commutative & Associative: a ^ b ^ c = c ^ a ^ b.',
      'Practical CS application 1: Finding the single non-duplicate number in an array where every other element appears twice. By XOR-ing all elements together, all duplicate pairs cancel out to 0, leaving strictly the unique value in O(N) time and O(1) space!',
      'Practical CS application 2: Swapping two variables without a temporary variable: a = a ^ b; b = a ^ b; a = a ^ b. Additionally, one-time pads (OTP)—the theoretically unbreakable cipher—rely entirely on XORing plaintext bytes with random key streams.'
    ],
    tags: ['Bitwise', 'Algorithms', 'Optimization', 'C / C++']
  },
  {
    id: 'blog-async',
    title: 'Synchronous vs Asynchronous Execution',
    category: 'Programming',
    date: '2026',
    readTime: '5 min read',
    description: 'Understanding blocking vs non-blocking code execution, the JavaScript Event Loop, microtasks, and writing responsive full-stack applications.',
    content: [
      'In synchronous execution, tasks are executed sequentially line by line. Each operation must finish executing before the next line of code can begin. If an operation takes significant time—such as a large database query or network fetch—the entire thread blocks.',
      'In asynchronous execution, long-running operations are delegated to background worker threads or the operating system kernel (I/O completion ports). The main thread remains responsive to user events and other execution requests.',
      'JavaScript is single-threaded, meaning it has only one call stack. It achieves asynchronous concurrency via the Event Loop, the Web APIs (or libuv in Node.js), the Callback Queue, and the Microtask Queue (Promises).',
      'Using async/await syntax allows developers to write asynchronous code that reads cleanly like synchronous logic while preserving high throughput and non-blocking performance.'
    ],
    tags: ['JavaScript', 'Node.js', 'Event Loop', 'Concurrency']
  },
  {
    id: 'blog-java-py',
    title: 'Java vs Python: A 3rd Year CSE Perspective',
    category: 'Programming',
    date: '2025',
    readTime: '5 min read',
    description: 'Comparing two staple languages learned side-by-side: static vs dynamic typing, JVM execution vs bytecode interpretation, and when to pick each.',
    content: [
      'During our 3rd year in Computer Science Engineering at Pandit Raghunath Murmu Smriti Mahavidyalaya, Java and Python are two languages we interact with most frequently.',
      'Java enforces static typing, strict object-oriented design, and compile-time type validation. Code compiles down to portable bytecode executed by the Java Virtual Machine (JVM). Its HotSpot Just-In-Time (JIT) compiler gives it near-native speed, making it the industry staple for enterprise backend microservices and high-load architectures.',
      'Python, by contrast, emphasizes developer velocity with dynamic typing, expressive syntax, and extensive libraries. Python is unmatched for rapid prototyping, data science, automation scripting, and algorithmic problem solving.',
      'Both languages complement each other: Java teaches disciplined architectural patterns and thread synchronization, while Python accelerates innovation and scripting utility.'
    ],
    tags: ['Java', 'Python', 'JVM', 'Language Design']
  }
];
