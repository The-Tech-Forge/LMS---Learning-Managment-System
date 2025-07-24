"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Target, Award, PlayCircle, FileText, Calendar, TrendingUp, CheckCircle2 } from "lucide-react"
import { mockCourses, mockAnnouncements } from "@/lib/mock-data"
import { useAuth } from "@/components/auth-provider"

export default function StudentDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Enrolled Courses",
      value: "6",
      icon: BookOpen,
      description: "Active courses this semester",
    },
    {
      title: "Overall Progress",
      value: "78%",
      icon: TrendingUp,
      description: "Average completion rate",
    },
    {
      title: "Pending Assignments",
      value: "4",
      icon: FileText,
      description: "Due this week",
    },
    {
      title: "Certificates Earned",
      value: "12",
      icon: Award,
      description: "Completed courses",
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Physics Lab Report",
      course: "Physics Fundamentals",
      dueDate: "2024-02-20",
      type: "assignment",
      priority: "high",
    },
    {
      id: 2,
      title: "Python Basics Quiz",
      course: "Computer Science Basics",
      dueDate: "2024-02-18",
      type: "quiz",
      priority: "medium",
    },
    {
      id: 3,
      title: "Math Problem Set 2",
      course: "Advanced Mathematics",
      dueDate: "2024-02-25",
      type: "assignment",
      priority: "low",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Completed Quiz",
      details: "Algebra Fundamentals - Score: 85%",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      id: 2,
      action: "Submitted Assignment",
      details: "Calculus Problem Set 1 - On time",
      time: "1 day ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 3,
      action: "Joined Live Class",
      details: "Physics Fundamentals - Chapter 5",
      time: "2 days ago",
      icon: PlayCircle,
      color: "text-purple-500",
    },
    {
      id: 4,
      action: "New Material Added",
      details: "Computer Science Basics - Python Loops",
      time: "3 days ago",
      icon: BookOpen,
      color: "text-orange-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your courses today</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          View Schedule
        </Button>
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
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Progress and Upcoming Deadlines */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your current course progress and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={course.thumbnail || "/placeholder.svg"} alt={course.title} />
                    <AvatarFallback>
                      {course.title
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.teacherName}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments and quizzes due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-start space-x-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      deadline.priority === "high"
                        ? "bg-red-500"
                        : deadline.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">{deadline.course}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(deadline.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={deadline.type === "assignment" ? "default" : "secondary"}>{deadline.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Announcements */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <activity.icon className={`mt-1 h-4 w-4 ${activity.color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Latest updates from your institute</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                    <Badge
                      variant={
                        announcement.priority === "high"
                          ? "destructive"
                          : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {announcement.author} • {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start bg-transparent" variant="outline">
              <PlayCircle className="mr-2 h-4 w-4" />
              Join Live Class
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Submit Assignment
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <Target className="mr-2 h-4 w-4" />
              Take Quiz
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Materials
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
