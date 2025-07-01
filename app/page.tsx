"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, FileText, Settings, TrendingUp, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react"
import AssessmentForm from "@/components/assessment-form"
import DataVisualization from "@/components/data-visualization"
import QuarterlyEvaluation from "@/components/quarterly-evaluation"
import AdminBundleManager from "@/components/admin-bundle-manager"

export default function PKPDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [userRole, setUserRole] = useState<"admin" | "puskesmas" | "dinkes">("puskesmas")

  const dashboardStats = [
    {
      title: "Total Indikator",
      value: "156",
      description: "Klaster 1-5 Aktif",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Progress Pengisian",
      value: "78%",
      description: "122 dari 156 indikator",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Evaluasi Triwulan",
      value: "3/4",
      description: "TW1-3 Selesai",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      title: "Status Verifikasi",
      value: "Pending",
      description: "Menunggu review Dinkes",
      icon: Clock,
      color: "text-yellow-600",
    },
  ]

  const recentActivities = [
    {
      action: "Pengisian Klaster 1 - Upaya Kesehatan Masyarakat",
      time: "2 jam yang lalu",
      status: "completed",
    },
    {
      action: "Evaluasi Triwulan 3 - Analisis Program",
      time: "1 hari yang lalu",
      status: "pending",
    },
    {
      action: "Update Bundle Indikator 2024",
      time: "3 hari yang lalu",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sistem Monitoring PKP</h1>
            <p className="text-sm text-gray-600">Penilaian Kinerja Puskesmas - Klaster 1-5</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={userRole === "admin" ? "default" : "secondary"}>
              {userRole === "admin" ? "Admin Dinkes" : userRole === "puskesmas" ? "Puskesmas" : "Dinkes"}
            </Badge>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as any)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="puskesmas">Puskesmas</option>
              <option value="dinkes">Dinkes</option>
              <option value="admin">Admin Dinkes</option>
            </select>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Penilaian
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Visualisasi
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Evaluasi
            </TabsTrigger>
            {userRole === "admin" && (
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Bundle Manager
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Pengisian per Klaster</CardTitle>
                  <CardDescription>Status pengisian indikator berdasarkan klaster</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Klaster 1 - UKM", progress: 85 },
                    { name: "Klaster 2 - UKP", progress: 72 },
                    { name: "Klaster 3 - UKK", progress: 90 },
                    { name: "Klaster 4 - Manajemen", progress: 65 },
                    { name: "Klaster 5 - Mutu", progress: 78 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                  <CardDescription>Riwayat aktivitas sistem PKP</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {activity.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        )}
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment">
            <AssessmentForm userRole={userRole} />
          </TabsContent>

          {/* Visualization Tab */}
          <TabsContent value="visualization">
            <DataVisualization />
          </TabsContent>

          {/* Evaluation Tab */}
          <TabsContent value="evaluation">
            <QuarterlyEvaluation userRole={userRole} />
          </TabsContent>

          {/* Admin Tab */}
          {userRole === "admin" && (
            <TabsContent value="admin">
              <AdminBundleManager />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
