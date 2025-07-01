"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, BarChart3, Target, Calendar } from "lucide-react"

export default function DataVisualization() {
  const monthlyData = [
    { month: "Jan", klaster1: 85, klaster2: 72, klaster3: 90, klaster4: 65, klaster5: 78 },
    { month: "Feb", klaster1: 88, klaster2: 75, klaster3: 92, klaster4: 68, klaster5: 80 },
    { month: "Mar", klaster1: 90, klaster2: 78, klaster3: 94, klaster4: 70, klaster5: 82 },
    { month: "Apr", klaster1: 87, klaster2: 80, klaster3: 91, klaster4: 72, klaster5: 85 },
    { month: "May", klaster1: 92, klaster2: 82, klaster3: 95, klaster4: 75, klaster5: 87 },
    { month: "Jun", klaster1: 89, klaster2: 85, klaster3: 93, klaster4: 78, klaster5: 89 },
    { month: "Jul", klaster1: 94, klaster2: 87, klaster3: 96, klaster4: 80, klaster5: 91 },
    { month: "Aug", klaster1: 91, klaster2: 89, klaster3: 94, klaster4: 82, klaster5: 88 },
    { month: "Sep", klaster1: 95, klaster2: 91, klaster3: 97, klaster4: 85, klaster5: 92 },
    { month: "Oct", klaster1: 93, klaster2: 88, klaster3: 95, klaster4: 83, klaster5: 90 },
    { month: "Nov", klaster1: 96, klaster2: 92, klaster3: 98, klaster4: 87, klaster5: 94 },
    { month: "Des", klaster1: 94, klaster2: 90, klaster3: 96, klaster4: 85, klaster5: 92 },
  ]

  const radarData = [
    { cluster: "UKM", value: 94, fullMark: 100 },
    { cluster: "UKP", value: 90, fullMark: 100 },
    { cluster: "UKK", value: 96, fullMark: 100 },
    { cluster: "Manajemen", value: 85, fullMark: 100 },
    { cluster: "Mutu", value: 92, fullMark: 100 },
  ]

  const indicatorData = [
    { name: "Cakupan K4", target: 95, actual: 92, score: 7 },
    { name: "Cakupan Imunisasi", target: 90, actual: 94, score: 10 },
    { name: "Deteksi Dini PTM", target: 80, actual: 75, score: 4 },
    { name: "Kunjungan Neonatus", target: 85, actual: 88, score: 10 },
    { name: "Pelayanan KB", target: 75, actual: 82, score: 10 },
  ]

  const summaryStats = [
    {
      title: "Rata-rata Skor",
      value: "89.2",
      change: "+2.3",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Klaster Tertinggi",
      value: "UKK (96)",
      change: "Konsisten",
      trend: "stable",
      icon: Target,
    },
    {
      title: "Progress Tahunan",
      value: "92%",
      change: "+8% dari target",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Periode Aktif",
      value: "2024",
      change: "11 bulan data",
      trend: "stable",
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Visualization */}
      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Trend Bulanan</TabsTrigger>
          <TabsTrigger value="radar">Radar Klaster</TabsTrigger>
          <TabsTrigger value="indicators">Detail Indikator</TabsTrigger>
          <TabsTrigger value="table">Tabel Ringkasan</TabsTrigger>
        </TabsList>

        {/* Monthly Trend Chart */}
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Trend Nilai Bulanan per Klaster</CardTitle>
              <CardDescription>Perkembangan skor penilaian setiap klaster sepanjang tahun 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="klaster1" stroke="#8884d8" name="Klaster 1 - UKM" strokeWidth={2} />
                  <Line type="monotone" dataKey="klaster2" stroke="#82ca9d" name="Klaster 2 - UKP" strokeWidth={2} />
                  <Line type="monotone" dataKey="klaster3" stroke="#ffc658" name="Klaster 3 - UKK" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="klaster4"
                    stroke="#ff7300"
                    name="Klaster 4 - Manajemen"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="klaster5" stroke="#8dd1e1" name="Klaster 5 - Mutu" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Radar Chart */}
        <TabsContent value="radar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil Kinerja Klaster</CardTitle>
                <CardDescription>Visualisasi radar menunjukkan kekuatan dan area pengembangan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="cluster" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Skor"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analisis Kinerja</CardTitle>
                <CardDescription>Interpretasi hasil penilaian per klaster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {radarData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Klaster {item.cluster}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.value >= 90
                          ? "Sangat Baik"
                          : item.value >= 80
                            ? "Baik"
                            : item.value >= 70
                              ? "Cukup"
                              : "Perlu Perbaikan"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{item.value}</div>
                      <Badge variant={item.value >= 90 ? "default" : item.value >= 80 ? "secondary" : "destructive"}>
                        {item.value >= 90 ? "Excellent" : item.value >= 80 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Indicators Detail */}
        <TabsContent value="indicators">
          <Card>
            <CardHeader>
              <CardTitle>Detail Indikator Klaster 1 - UKM</CardTitle>
              <CardDescription>Perbandingan target vs capaian untuk indikator utama</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={indicatorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="target" fill="#e2e8f0" name="Target" />
                  <Bar dataKey="actual" fill="#3b82f6" name="Capaian" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Summary Table */}
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Tabel Ringkasan Nilai Bulanan</CardTitle>
              <CardDescription>Data lengkap skor penilaian per bulan dan klaster</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 p-2 text-left">Bulan</th>
                      <th className="border border-gray-200 p-2 text-center">UKM</th>
                      <th className="border border-gray-200 p-2 text-center">UKP</th>
                      <th className="border border-gray-200 p-2 text-center">UKK</th>
                      <th className="border border-gray-200 p-2 text-center">Manajemen</th>
                      <th className="border border-gray-200 p-2 text-center">Mutu</th>
                      <th className="border border-gray-200 p-2 text-center">Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((row, index) => {
                      const average = (
                        (row.klaster1 + row.klaster2 + row.klaster3 + row.klaster4 + row.klaster5) /
                        5
                      ).toFixed(1)
                      return (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 p-2 font-medium">{row.month}</td>
                          <td className="border border-gray-200 p-2 text-center">{row.klaster1}</td>
                          <td className="border border-gray-200 p-2 text-center">{row.klaster2}</td>
                          <td className="border border-gray-200 p-2 text-center">{row.klaster3}</td>
                          <td className="border border-gray-200 p-2 text-center">{row.klaster4}</td>
                          <td className="border border-gray-200 p-2 text-center">{row.klaster5}</td>
                          <td className="border border-gray-200 p-2 text-center font-bold">{average}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
