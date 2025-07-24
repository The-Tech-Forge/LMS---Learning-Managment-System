"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Calendar, Play, FileText, Award, Search } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"

export default function StudentCoursesPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid gap-6">
            {mockCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={course.thumbnail || "/placeholder.svg"} alt={course.title} />
                      <AvatarFallback>
                        {course.title
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{course.title}</h3>
                          <p className="text-muted-foreground">{course.description}</p>
                          <p className="text-sm text-muted-foreground mt-1">Instructor: {course.teacherName}</p>
                        </div>
                        <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" />
                          {course.completedChapters}/{course.totalChapters} chapters
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          {course.studentsEnrolled} students
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          Due: {new Date(course.endDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}% complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <Play className="mr-2 h-4 w-4" />
                          Continue Learning
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Materials
                        </Button>
                        <Button variant="outline">
                          <Award className="mr-2 h-4 w-4" />
                          Assignments
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No completed courses yet</h3>
              <p className="text-muted-foreground text-center">
                Complete your enrolled courses to see them here and earn certificates!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorite courses</h3>
              <p className="text-muted-foreground text-center">Mark courses as favorites to quickly access them here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
