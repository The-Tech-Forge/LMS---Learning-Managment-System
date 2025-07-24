"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, FileText, Upload, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { mockAssignments } from "@/lib/mock-data"

export default function StudentAssignmentsPage() {
  const pendingAssignments = mockAssignments.filter((a) => a.status === "pending")
  const submittedAssignments = mockAssignments.filter((a) => a.status === "submitted")
  const gradedAssignments = mockAssignments.filter((a) => a.status === "graded")

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Track and submit your course assignments</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assignments..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submittedAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Assignments</CardTitle>
              <CardDescription>View all your course assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{assignment.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{assignment.courseName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assignment.status === "graded"
                              ? "default"
                              : assignment.status === "submitted"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assignment.obtainedMarks ? (
                          <span className="font-medium">
                            {assignment.obtainedMarks}/{assignment.maxMarks}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {assignment.status === "pending" ? (
                            <Button size="sm">
                              <Upload className="mr-1 h-4 w-4" />
                              Submit
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>Assignments that need to be submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                  >
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Urgent</Badge>
                      <Button size="sm">
                        <Upload className="mr-1 h-4 w-4" />
                        Submit Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submitted">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Assignments</CardTitle>
              <CardDescription>Assignments waiting for grading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submittedAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted:{" "}
                        {assignment.submissionDate ? new Date(assignment.submissionDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Under Review</Badge>
                      <Button size="sm" variant="outline">
                        View Submission
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graded">
          <Card>
            <CardHeader>
              <CardTitle>Graded Assignments</CardTitle>
              <CardDescription>Completed assignments with scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradedAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                      <p className="text-xs text-muted-foreground">
                        Graded:{" "}
                        {assignment.submissionDate ? new Date(assignment.submissionDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-semibold text-lg">
                          {assignment.obtainedMarks}/{assignment.maxMarks}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((assignment.obtainedMarks! / assignment.maxMarks) * 100)}%
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Feedback
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
