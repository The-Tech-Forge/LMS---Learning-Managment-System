"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  ClipboardList,
  Award,
  Plus,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Video,
  FileText,
} from "lucide-react"
import { mockCourses } from "@/lib/mock-data"
import { useAuth } from "@/components/auth-provider"

export default function TeacherDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "My Courses",
      value: "8",
      icon: BookOpen,
      description: "Active courses this semester",
    },
    {
      title: "Total Students",
      value: "245",
      icon: Users,
      description: "Across all courses",
    },
    {
      title: "Pending Reviews",
      value: "12",
      icon: ClipboardList,
      description: "Assignments to grade",
    },
    {
      title: "Avg. Performance",
      value: "84%",
      icon: Award,
      description: "Student success rate",
    },
  ]

  const todaySchedule = [
    {
      id: 1,
      time: "09:00 AM",
      course: "Advanced Mathematics",
      type: "Live Class",
      students: 32,
      status: "upcoming",
    },
    {
      id: 2,
      time: "11:30 AM",
      course: "Physics Fundamentals",
      type: "Lab Session",
      students: 28,
      status: "upcoming",
    },
    {
      id: 3,
      time: "02:00 PM",
      course: "Computer Science Basics",
      type: "Live Class",
      students: 45,
      status: "completed",
    },
    {
      id: 4,
      time: "04:00 PM",
      course: "Advanced Mathematics",
      type: "Office Hours",
      students: 8,
      status: "upcoming",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Assignment Submitted",
      details: "15 students submitted Physics Lab Report",
      time: "30 minutes ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 2,
      action: "Quiz Completed",
      details: "Python Basics Quiz - Average score: 78%",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      id: 3,
      action: "New Question Posted",
      details: "Student asked about calculus derivatives",
      time: "4 hours ago",
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      id: 4,
      action: "Material Uploaded",
      details: "Added Chapter 6 slides to Physics course",
      time: "1 day ago",
      icon: BookOpen,
      color: "text-purple-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, {user?.name}!</h1>
          <p className="text-muted-foreground">You have 3 classes scheduled for today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Content
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
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Schedule and Course Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes and activities for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        item.status === "completed"
                          ? "bg-green-500"
                          : item.status === "upcoming"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    />
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.time}</p>
                      <Badge variant={item.status === "completed" ? "secondary" : "default"}>{item.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{item.course}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type} • {item.students} students
                    </p>
                  </div>
                  {item.status === "upcoming" && (
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Overview of your courses and student progress</CardDescription>
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
                    <p className="text-sm text-muted-foreground">{course.studentsEnrolled} students enrolled</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {course.completedChapters}/{course.totalChapters} chapters
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                    <Button size="sm" variant="ghost">
                      Analytics
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Pending Tasks */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your courses</CardDescription>
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
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Grade Physics Lab Reports</p>
                  <p className="text-xs text-muted-foreground">15 submissions pending</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Review Quiz Questions</p>
                  <p className="text-xs text-muted-foreground">Math Quiz due tomorrow</p>
                </div>
                <Badge variant="default">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Update Course Materials</p>
                  <p className="text-xs text-muted-foreground">Add Chapter 7 content</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Respond to Forum Posts</p>
                  <p className="text-xs text-muted-foreground">8 student questions</p>
                </div>
                <Badge variant="outline">Low</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common teaching tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start bg-transparent" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Start Live Class
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Upload Materials
            </Button>
            <Button className="justify-start bg-transparent" variant="outline">
              <ClipboardList className="mr-2 h-4 w-4" />
              Grade Submissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
