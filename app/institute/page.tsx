"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, UserCheck, Calendar, TrendingUp, ArrowUpRight, Bell, Plus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useAuth } from "@/components/auth-provider"

const attendanceData = [
  { day: "Mon", attendance: 95 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 88 },
  { day: "Thu", attendance: 90 },
  { day: "Fri", attendance: 85 },
  { day: "Sat", attendance: 78 },
]

const enrollmentData = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1350 },
  { month: "Mar", students: 1500 },
  { month: "Apr", students: 1680 },
  { month: "May", students: 1850 },
  { month: "Jun", students: 2000 },
]

export default function InstituteDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Students",
      value: "1,250",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "Enrolled students",
    },
    {
      title: "Total Teachers",
      value: "85",
      change: "+5%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active faculty",
    },
    {
      title: "Active Courses",
      value: "45",
      change: "+8%",
      changeType: "positive" as const,
      icon: BookOpen,
      description: "Running courses",
    },
    {
      title: "Today's Attendance",
      value: "92%",
      change: "-2%",
      changeType: "negative" as const,
      icon: UserCheck,
      description: "Present today",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New student enrolled",
      details: "John Smith joined Computer Science program",
      time: "2 hours ago",
      type: "enrollment",
    },
    {
      id: 2,
      action: "Course completed",
      details: "Advanced Mathematics - 32 students completed",
      time: "4 hours ago",
      type: "course",
    },
    {
      id: 3,
      action: "Teacher assigned",
      details: "Dr. Sarah Johnson assigned to Physics course",
      time: "1 day ago",
      type: "assignment",
    },
    {
      id: 4,
      action: "Fee payment received",
      details: "Monthly fees collected from 150 students",
      time: "2 days ago",
      type: "payment",
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
      title: "Mid-term Examinations",
      date: "2024-02-25",
      time: "9:00 AM",
      type: "exam",
    },
    {
      id: 3,
      title: "Science Fair",
      date: "2024-03-01",
      time: "2:00 PM",
      type: "event",
    },
    {
      id: 4,
      title: "Faculty Meeting",
      date: "2024-03-05",
      time: "3:00 PM",
      type: "meeting",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Institute Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's your institute overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Announcements
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

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
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-red-500 rotate-90" />
                )}
                <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Student Enrollment Trends</CardTitle>
            <CardDescription>Monthly student enrollment over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>Daily attendance rates this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and activities in your institute</CardDescription>
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

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Overview of different departments in your institute</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Computer Science</span>
                <span className="text-sm text-muted-foreground">320 students</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Performance: 85%</span>
                <span>12 courses</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mathematics</span>
                <span className="text-sm text-muted-foreground">280 students</span>
              </div>
              <Progress value={92} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Performance: 92%</span>
                <span>8 courses</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Physics</span>
                <span className="text-sm text-muted-foreground">250 students</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Performance: 78%</span>
                <span>10 courses</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Create Course
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Event
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
