"use client"
import {
  BookOpen,
  Calendar,
  ChevronUp,
  GraduationCap,
  Home,
  LogOut,
  Settings,
  User,
  Users,
  FileText,
  BarChart3,
  Bell,
  MessageSquare,
  Award,
  DollarSign,
  UserCheck,
  Video,
  ClipboardList,
  Target,
  HelpCircle,
  Building2,
  Shield,
  Database,
  CreditCard,
  Mail,
  CalendarIcon,
  PieChart,
  TrendingUp,
  School,
  Users2,
  BookOpenCheck,
  ClipboardCheck,
  MessageCircle,
  Phone,
  Wallet,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Navigation items for different user roles
const navigationItems = {
  admin: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", url: "/admin", icon: Home },
        { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Institutes", url: "/admin/institutes", icon: Building2 },
        { title: "Users", url: "/admin/users", icon: Users },
        { title: "Courses", url: "/admin/courses", icon: BookOpen },
        { title: "Content Library", url: "/admin/content", icon: Database },
      ],
    },
    {
      title: "System",
      items: [
        { title: "Roles & Permissions", url: "/admin/roles", icon: Shield },
        { title: "Subscription Plans", url: "/admin/plans", icon: CreditCard },
        { title: "Reports", url: "/admin/reports", icon: PieChart },
        { title: "Settings", url: "/admin/settings", icon: Settings },
      ],
    },
  ],
  institute: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", url: "/institute", icon: Home },
        { title: "Analytics", url: "/institute/analytics", icon: TrendingUp },
      ],
    },
    {
      title: "Academic",
      items: [
        { title: "Departments", url: "/institute/departments", icon: School },
        { title: "Courses", url: "/institute/courses", icon: BookOpen },
        { title: "Timetable", url: "/institute/timetable", icon: CalendarIcon },
        { title: "Attendance", url: "/institute/attendance", icon: UserCheck },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Users", url: "/institute/users", icon: Users2 },
        { title: "Announcements", url: "/institute/announcements", icon: Mail },
        { title: "Certificates", url: "/institute/certificates", icon: Award },
        { title: "Fee Management", url: "/institute/fees", icon: DollarSign },
      ],
    },
    {
      title: "Reports",
      items: [
        { title: "Reports", url: "/institute/reports", icon: FileText },
        { title: "Feedback", url: "/institute/feedback", icon: MessageSquare },
      ],
    },
  ],
  teacher: [
    {
      title: "Teaching",
      items: [
        { title: "Dashboard", url: "/teacher", icon: Home },
        { title: "My Courses", url: "/teacher/courses", icon: BookOpenCheck },
        { title: "Materials", url: "/teacher/materials", icon: FileText },
        { title: "Live Classes", url: "/teacher/live-classes", icon: Video },
      ],
    },
    {
      title: "Assessment",
      items: [
        { title: "Assignments", url: "/teacher/assignments", icon: ClipboardList },
        { title: "Quizzes", url: "/teacher/quizzes", icon: Target },
        { title: "Gradebook", url: "/teacher/gradebook", icon: ClipboardCheck },
        { title: "Attendance", url: "/teacher/attendance", icon: UserCheck },
      ],
    },
    {
      title: "Communication",
      items: [
        { title: "Discussion Forum", url: "/teacher/forum", icon: MessageCircle },
        { title: "Schedule", url: "/teacher/schedule", icon: Calendar },
      ],
    },
  ],
  student: [
    {
      title: "Learning",
      items: [
        { title: "Dashboard", url: "/student", icon: Home },
        { title: "My Courses", url: "/student/courses", icon: BookOpen },
        { title: "Study Materials", url: "/student/materials", icon: FileText },
        { title: "Live Classes", url: "/student/live-classes", icon: Video },
      ],
    },
    {
      title: "Assessment",
      items: [
        { title: "Assignments", url: "/student/assignments", icon: ClipboardList },
        { title: "Quizzes", url: "/student/quizzes", icon: Target },
        { title: "Results", url: "/student/results", icon: Award },
        { title: "Certificates", url: "/student/certificates", icon: Award },
      ],
    },
    {
      title: "Communication",
      items: [
        { title: "Attendance", url: "/student/attendance", icon: UserCheck },
        { title: "Announcements", url: "/student/announcements", icon: Bell },
        { title: "Discussion Forum", url: "/student/forum", icon: MessageCircle },
      ],
    },
  ],
  parent: [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", url: "/parent", icon: Home },
        { title: "Child Progress", url: "/parent/progress", icon: TrendingUp },
      ],
    },
    {
      title: "Academic",
      items: [
        { title: "Attendance", url: "/parent/attendance", icon: UserCheck },
        { title: "Results", url: "/parent/results", icon: Award },
        { title: "Assignments", url: "/parent/assignments", icon: ClipboardList },
      ],
    },
    {
      title: "Communication",
      items: [
        { title: "Teachers", url: "/parent/teachers", icon: Phone },
        { title: "Fee Status", url: "/parent/fees", icon: Wallet },
      ],
    },
  ],
}

export function AppSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const userNavigation = navigationItems[user.role] || []

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/${user.role}`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ILEARNOVA</span>
                  <span className="truncate text-xs capitalize">{user.role} Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {userNavigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/${user.role}/help`}>
                    <HelpCircle />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href={`/${user.role}/profile`}>
                    <User />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${user.role}/settings`}>
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
