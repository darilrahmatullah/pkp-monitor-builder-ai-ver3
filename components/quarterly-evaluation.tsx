"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Save, Send, FileText, AlertTriangle, Target, TrendingUp } from "lucide-react"

interface QuarterlyEvaluationProps {
  userRole: "admin" | "puskesmas" | "dinkes"
}

export default function QuarterlyEvaluation({ userRole }: QuarterlyEvaluationProps) {
  const [selectedQuarter, setSelectedQuarter] = useState("tw1")
  const [evaluationData, setEvaluationData] = useState<Record<string, any>>({})

  const quarters = [
    { id: "tw1", name: "Triwulan 1", period: "Jan - Mar", status: "completed" },
    { id: "tw2", name: "Triwulan 2", period: "Apr - Jun", status: "completed" },
    { id: "tw3", name: "Triwulan 3", period: "Jul - Sep", status: "completed" },
    { id: "tw4", name: "Triwulan 4", period: "Okt - Des", status: "in-progress" },
  ]

  const evaluationSections = [
    {
      id: "analysis",
      title: "Analisis Kinerja",
      icon: TrendingUp,
      description: "Analisis pencapaian indikator dan identifikasi faktor pendukung/penghambat",
    },
    {
      id: "obstacles",
      title: "Hambatan",
      icon: AlertTriangle,
      description: "Identifikasi hambatan dan tantangan yang dihadapi dalam periode ini",
    },
    {
      id: "action_plan",
      title: "Rencana Tindak Lanjut",
      icon: Target,
      description: "Rencana perbaikan dan tindak lanjut untuk periode berikutnya",
    },
  ]

  const quarterlyPerformance = {
    tw1: { score: 87.5, trend: "up", highlights: ["Peningkatan cakupan K4", "Implementasi sistem baru"] },
    tw2: { score: 89.2, trend: "up", highlights: ["Optimalisasi SDM", "Pelatihan berkelanjutan"] },
    tw3: { score: 91.8, trend: "up", highlights: ["Inovasi pelayanan", "Kemitraan lintas sektor"] },
    tw4: { score: 85.0, trend: "stable", highlights: ["Evaluasi menyeluruh", "Persiapan tahun depan"] },
  }

  const handleEvaluationChange = (section: string, value: string) => {
    setEvaluationData((prev) => ({
      ...prev,
      [`${selectedQuarter}_${section}`]: value,
    }))
  }

  const getCompletionStatus = (quarter: string) => {
    const sections = evaluationSections.length
    const completed = evaluationSections.filter((section) => evaluationData[`${quarter}_${section.id}`]?.trim()).length
    return (completed / sections) * 100
  }

  return (
    <div className="space-y-6">
      {/* Quarter Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluasi Triwulanan PKP</CardTitle>
          <CardDescription>Pilih periode triwulan untuk melakukan evaluasi kinerja</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <TabsList className="grid w-full grid-cols-4">
              {quarters.map((quarter) => (
                <TabsTrigger key={quarter.id} value={quarter.id} className="flex flex-col gap-1">
                  <span className="font-medium">{quarter.name}</span>
                  <span className="text-xs text-muted-foreground">{quarter.period}</span>
                  <Badge variant={quarter.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {quarter.status === "completed" ? "Selesai" : "Berlangsung"}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ringkasan Kinerja {quarters.find((q) => q.id === selectedQuarter)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {quarterlyPerformance[selectedQuarter as keyof typeof quarterlyPerformance]?.score}
              </div>
              <p className="text-sm text-blue-800">Skor Rata-rata</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {quarterlyPerformance[selectedQuarter as keyof typeof quarterlyPerformance]?.trend === "up"
                  ? "↗️ Meningkat"
                  : "➡️ Stabil"}
              </div>
              <p className="text-sm text-green-800">Tren Kinerja</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Pencapaian Utama:</h4>
              <ul className="text-xs space-y-1">
                {quarterlyPerformance[selectedQuarter as keyof typeof quarterlyPerformance]?.highlights.map(
                  (highlight, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {highlight}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {evaluationSections.map((section, index) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="w-5 h-5" />
                  {index + 1}. {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`Tuliskan ${section.title.toLowerCase()} untuk periode ini...`}
                  className="min-h-[150px]"
                  value={evaluationData[`${selectedQuarter}_${section.id}`] || ""}
                  onChange={(e) => handleEvaluationChange(section.id, e.target.value)}
                  disabled={userRole === "dinkes"}
                />
                {section.id === "analysis" && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-md">
                    <p className="text-xs text-blue-800">
                      <strong>Panduan:</strong> Sertakan analisis pencapaian target, faktor pendukung, dan area yang
                      perlu diperbaiki berdasarkan data kuantitatif.
                    </p>
                  </div>
                )}
                {section.id === "obstacles" && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                    <p className="text-xs text-yellow-800">
                      <strong>Panduan:</strong> Identifikasi hambatan internal dan eksternal, serta dampaknya terhadap
                      pencapaian target indikator.
                    </p>
                  </div>
                )}
                {section.id === "action_plan" && (
                  <div className="mt-3 p-3 bg-green-50 rounded-md">
                    <p className="text-xs text-green-800">
                      <strong>Panduan:</strong> Susun rencana konkret dengan timeline, penanggung jawab, dan indikator
                      keberhasilan yang jelas.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Evaluasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Kelengkapan</span>
                  <span>{Math.round(getCompletionStatus(selectedQuarter))}%</span>
                </div>
                <Progress value={getCompletionStatus(selectedQuarter)} />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Status Bagian:</h4>
                {evaluationSections.map((section) => (
                  <div key={section.id} className="flex justify-between text-xs p-2 bg-gray-50 rounded">
                    <span>{section.title}</span>
                    <Badge
                      variant={evaluationData[`${selectedQuarter}_${section.id}`]?.trim() ? "default" : "secondary"}
                    >
                      {evaluationData[`${selectedQuarter}_${section.id}`]?.trim() ? "Selesai" : "Kosong"}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full bg-transparent" variant="outline" disabled={userRole === "dinkes"}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Draft
                </Button>
                <Button
                  className="w-full"
                  disabled={userRole === "dinkes" || getCompletionStatus(selectedQuarter) < 100}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Evaluasi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistik Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Indikator</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Indikator Tercapai</span>
                <span className="font-medium text-green-600">142</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Perlu Perbaikan</span>
                <span className="font-medium text-yellow-600">14</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tingkat Pencapaian</span>
                <span className="font-medium text-blue-600">91.0%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
