// Mock data for the LMS system

export interface Institute {
  id: string
  name: string
  type: "school" | "college" | "university" | "training"
  status: "active" | "inactive" | "suspended"
  address: string
  phone: string
  email: string
  website?: string
  studentsCount: number
  teachersCount: number
  coursesCount: number
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  subject: string
  teacherId: string
  teacherName: string
  instituteId: string
  studentsEnrolled: number
  totalChapters: number
  completedChapters: number
  progress: number
  status: "active" | "completed" | "draft"
  startDate: string
  endDate: string
  thumbnail: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  courseId: string
  courseName: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  maxMarks: number
  obtainedMarks?: number
  submissionDate?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  courseId: string
  courseName: string
  questions: number
  duration: number
  attempts: number
  maxAttempts: number
  score?: number
  status: "not_started" | "in_progress" | "completed"
  dueDate: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  date: string
  priority: "low" | "medium" | "high"
  targetAudience: string[]
}

// Mock Institutes
export const mockInstitutes: Institute[] = [
  {
    id: "inst-1",
    name: "Greenwood High School",
    type: "school",
    status: "active",
    address: "123 Education St, Learning City, LC 12345",
    phone: "+1-555-0123",
    email: "info@greenwood.edu",
    website: "https://greenwood.edu",
    studentsCount: 1250,
    teachersCount: 85,
    coursesCount: 45,
    createdAt: "2023-01-15",
  },
  {
    id: "inst-2",
    name: "Tech University",
    type: "university",
    status: "active",
    address: "456 Innovation Ave, Tech City, TC 67890",
    phone: "+1-555-0456",
    email: "admin@techuni.edu",
    website: "https://techuni.edu",
    studentsCount: 8500,
    teachersCount: 420,
    coursesCount: 180,
    createdAt: "2022-08-20",
  },
  {
    id: "inst-3",
    name: "Creative Arts College",
    type: "college",
    status: "active",
    address: "789 Arts Blvd, Creative City, CC 13579",
    phone: "+1-555-0789",
    email: "contact@artscollege.edu",
    studentsCount: 2100,
    teachersCount: 95,
    coursesCount: 65,
    createdAt: "2023-03-10",
  },
]

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Advanced Mathematics",
    description: "Comprehensive course covering calculus, algebra, and statistics",
    subject: "Mathematics",
    teacherId: "teacher-1",
    teacherName: "Dr. Sarah Johnson",
    instituteId: "inst-1",
    studentsEnrolled: 32,
    totalChapters: 12,
    completedChapters: 8,
    progress: 67,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "course-2",
    title: "Physics Fundamentals",
    description: "Introduction to classical and modern physics concepts",
    subject: "Physics",
    teacherId: "teacher-2",
    teacherName: "Prof. Michael Chen",
    instituteId: "inst-1",
    studentsEnrolled: 28,
    totalChapters: 10,
    completedChapters: 5,
    progress: 50,
    status: "active",
    startDate: "2024-01-20",
    endDate: "2024-06-20",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "course-3",
    title: "Computer Science Basics",
    description: "Programming fundamentals and computer science concepts",
    subject: "Computer Science",
    teacherId: "teacher-3",
    teacherName: "Ms. Emily Rodriguez",
    instituteId: "inst-1",
    studentsEnrolled: 45,
    totalChapters: 15,
    completedChapters: 10,
    progress: 67,
    status: "active",
    startDate: "2024-01-10",
    endDate: "2024-07-10",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: "assign-1",
    title: "Calculus Problem Set 1",
    description: "Solve the given calculus problems focusing on derivatives and integrals",
    courseId: "course-1",
    courseName: "Advanced Mathematics",
    dueDate: "2024-02-15",
    status: "submitted",
    maxMarks: 100,
    obtainedMarks: 85,
    submissionDate: "2024-02-14",
  },
  {
    id: "assign-2",
    title: "Physics Lab Report",
    description: "Write a comprehensive lab report on the pendulum experiment",
    courseId: "course-2",
    courseName: "Physics Fundamentals",
    dueDate: "2024-02-20",
    status: "pending",
    maxMarks: 50,
  },
  {
    id: "assign-3",
    title: "Programming Project",
    description: "Create a simple calculator application using Python",
    courseId: "course-3",
    courseName: "Computer Science Basics",
    dueDate: "2024-02-25",
    status: "graded",
    maxMarks: 100,
    obtainedMarks: 92,
    submissionDate: "2024-02-23",
  },
]

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Algebra Fundamentals",
    description: "Test your knowledge of basic algebraic concepts",
    courseId: "course-1",
    courseName: "Advanced Mathematics",
    questions: 20,
    duration: 60,
    attempts: 2,
    maxAttempts: 3,
    score: 85,
    status: "completed",
    dueDate: "2024-02-10",
  },
  {
    id: "quiz-2",
    title: "Newton's Laws",
    description: "Quiz on Newton's three laws of motion",
    courseId: "course-2",
    courseName: "Physics Fundamentals",
    questions: 15,
    duration: 45,
    attempts: 0,
    maxAttempts: 2,
    status: "not_started",
    dueDate: "2024-02-18",
  },
  {
    id: "quiz-3",
    title: "Python Basics",
    description: "Test your understanding of Python programming basics",
    courseId: "course-3",
    courseName: "Computer Science Basics",
    questions: 25,
    duration: 90,
    attempts: 1,
    maxAttempts: 2,
    score: 78,
    status: "completed",
    dueDate: "2024-02-12",
  },
]

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Mid-term Examinations Schedule",
    content:
      "The mid-term examinations will be conducted from March 15-25, 2024. Please check your individual timetables for specific dates and times.",
    author: "Academic Office",
    authorRole: "Administration",
    date: "2024-02-01",
    priority: "high",
    targetAudience: ["students", "teachers"],
  },
  {
    id: "ann-2",
    title: "New Library Resources Available",
    content:
      "We have added new digital resources to our library including e-books and research databases. Access them through the student portal.",
    author: "Library Department",
    authorRole: "Staff",
    date: "2024-01-28",
    priority: "medium",
    targetAudience: ["students", "teachers"],
  },
  {
    id: "ann-3",
    title: "Parent-Teacher Meeting",
    content:
      "The quarterly parent-teacher meeting is scheduled for February 20, 2024. Please confirm your attendance through the parent portal.",
    author: "Principal Office",
    authorRole: "Administration",
    date: "2024-01-25",
    priority: "high",
    targetAudience: ["parents", "teachers"],
  },
]

// Analytics data
export const mockAnalytics = {
  userGrowth: [
    { month: "Jan", students: 1200, teachers: 80, institutes: 15 },
    { month: "Feb", students: 1350, teachers: 85, institutes: 18 },
    { month: "Mar", students: 1500, teachers: 92, institutes: 22 },
    { month: "Apr", students: 1680, teachers: 98, institutes: 25 },
    { month: "May", students: 1850, teachers: 105, institutes: 28 },
    { month: "Jun", students: 2000, teachers: 112, institutes: 30 },
  ],
  courseEngagement: [
    { course: "Mathematics", engagement: 85 },
    { course: "Physics", engagement: 78 },
    { course: "Chemistry", engagement: 82 },
    { course: "Biology", engagement: 88 },
    { course: "Computer Science", engagement: 92 },
  ],
  attendanceData: [
    { day: "Mon", attendance: 95 },
    { day: "Tue", attendance: 92 },
    { day: "Wed", attendance: 88 },
    { day: "Thu", attendance: 90 },
    { day: "Fri", attendance: 85 },
    { day: "Sat", attendance: 78 },
  ],
}
