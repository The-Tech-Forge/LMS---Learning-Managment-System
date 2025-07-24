"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Building2, Users, BookOpen, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { mockAnalytics } from "@/lib/mock-data"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Institutes",
      value: "30",
      change: "+12%",
      changeType: "positive" as const,
      icon: Building2,
      description: "Active educational institutions",
    },
    {
      title: "Total Users",
      value: "12,543",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      description: "Students, teachers, and staff",
    },
    {
      title: "Active Courses",
      value: "1,247",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: BookOpen,
      description: "Currently running courses",
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "-2.4%",
      changeType: "negative" as const,
      icon: DollarSign,
      description: "Subscription revenue",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New institute registered",
      details: "Tech University joined the platform",
      time: "2 hours ago",
      type: "institute",
    },
    {
      id: 2,
      action: "Course milestone reached",
      details: "Advanced Mathematics reached 1000 enrollments",
      time: "4 hours ago",
      type: "course",
    },
    {
      id: 3,
      action: "System maintenance completed",
      details: "Database optimization and security updates",
      time: "1 day ago",
      type: "system",
    },
    {
      id: 4,
      action: "New subscription plan activated",
      details: "Premium plan purchased by 5 institutes",
      time: "2 days ago",
      type: "subscription",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your LMS platform performance and metrics</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          View Full Report
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
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
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
            <CardTitle>User Growth Trends</CardTitle>
            <CardDescription>Monthly growth of students, teachers, and institutes</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockAnalytics.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#8884d8" name="Students" />
                <Bar dataKey="teachers" fill="#82ca9d" name="Teachers" />
                <Bar dataKey="institutes" fill="#ffc658" name="Institutes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Course Engagement</CardTitle>
            <CardDescription>Engagement rates by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={mockAnalytics.courseEngagement}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="engagement"
                >
                  {mockAnalytics.courseEngagement.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities and updates</CardDescription>
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Add New Institute
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Review Courses
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Current system performance and resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Server Load</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Usage</span>
                <span className="text-sm text-muted-foreground">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-muted-foreground">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
