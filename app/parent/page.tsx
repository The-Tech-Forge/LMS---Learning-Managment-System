"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, UserCheck, Award, TrendingUp, Calendar, MessageCircle, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useAuth } from "@/components/auth-provider"

const attendanceData = [
  { week: "Week 1", attendance: 95 },
  { week: "Week 2", attendance: 88 },
  { week: "Week 3", attendance: 92 },
  { week: "Week 4", attendance: 85 },
  { week: "Week 5", attendance: 90 },
  { week: "Week 6", attendance: 87 },
]

const gradeData = [
  { subject: "Mathematics", grade: 85 },
  { subject: "Physics", grade: 78 },
  { subject: "Chemistry", grade: 92 },
  { subject: "Biology", grade: 88 },
  { subject: "English", grade: 90 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ParentDashboard() {
  const { user } = useAuth()

  const childInfo = {
    name: "Alex Johnson",
    class: "Grade 10-A",
    rollNumber: "2024001",
    avatar: "/placeholder.svg?height=40&width=40",
    currentGPA: "3.8",
    attendance: "89%",
  }

  const stats = [
    {
      title: "Current GPA",
      value: childInfo.currentGPA,
      icon: Award,
      description: "Overall performance",
    },
    {
      title: "Attendance Rate",
      value: childInfo.attendance,
      icon: UserCheck,
      description: "This semester",
    },
    {
      title: "Active Courses",
      value: "6",
      icon: BookOpen,
      description: "Enrolled subjects",
    },
    {
      title: "Pending Assignments",
      value: "3",
      icon: TrendingUp,
      description: "Due this week",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Assignment Submitted",
      details: "Mathematics Problem Set 3 - Submitted on time",
      time: "2 hours ago",
      type: "assignment",
    },
    {
      id: 2,
      action: "Quiz Completed",
      details: "Physics Quiz - Score: 85/100",
      time: "1 day ago",
      type: "quiz",
    },
    {
      id: 3,
      action: "Attendance Marked",
      details: "Present in all classes today",
      time: "1 day ago",
      type: "attendance",
    },
    {
      id: 4,
      action: "Teacher Feedback",
      details: "Excellent progress in Chemistry lab work",
      time: "2 days ago",
      type: "feedback",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "2024-02-20",
      time: "10:00 AM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Mathematics Test",
      date: "2024-02-22",
      time: "9:00 AM",
      type: "test",
    },
    {
      id: 3,
      title: "Science Project Due",
      date: "2024-02-25",
      time: "11:59 PM",
      type: "assignment",
    },
    {
      id: 4,
      title: "Monthly Fee Due",
      date: "2024-02-28",
      time: "End of day",
      type: "payment",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
          <p className="text-muted-foreground">Track your child's academic progress and activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Teachers
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Child Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Child Information</CardTitle>
          <CardDescription>Current academic details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={childInfo.avatar || "/placeholder.svg"} alt={childInfo.name} />
              <AvatarFallback>
                {childInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{childInfo.name}</h3>
              <p className="text-muted-foreground">{childInfo.class}</p>
              <p className="text-sm text-muted-foreground">Roll Number: {childInfo.rollNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{childInfo.currentGPA}</div>
                <div className="text-xs text-muted-foreground">Current GPA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{childInfo.attendance}</div>
                <div className="text-xs text-muted-foreground">Attendance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Weekly attendance over the past 6 weeks</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Current grades by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="grade"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your child's latest academic activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        event.type === "payment"
                          ? "bg-red-500"
                          : event.type === "test"
                            ? "bg-orange-500"
                            : event.type === "assignment"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                  <Badge variant={event.type === "payment" ? "destructive" : "outline"} className="capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>Detailed performance in each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gradeData.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <span className="text-sm text-muted-foreground">{subject.grade}%</span>
                </div>
                <Progress value={subject.grade} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Grade: {subject.grade >= 90 ? "A" : subject.grade >= 80 ? "B" : subject.grade >= 70 ? "C" : "D"}
                  </span>
                  <span>Class Average: {subject.grade - 5}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common parent tasks and communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start bg-transparent" variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Teacher
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Pay Fees
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <Award className="mr-2 h-4 w-4" />
              View Certificates
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
