"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Save, Send, FileText, Calculator } from "lucide-react"

interface AssessmentFormProps {
  userRole: "admin" | "puskesmas" | "dinkes"
}

export default function AssessmentForm({ userRole }: AssessmentFormProps) {
  const [selectedCluster, setSelectedCluster] = useState("klaster1")
  const [assessmentData, setAssessmentData] = useState<Record<string, any>>({})
  const [currentIndicator, setCurrentIndicator] = useState(0)

  const clusters = [
    { id: "klaster1", name: "Klaster 1 - UKM", indicators: 45 },
    { id: "klaster2", name: "Klaster 2 - UKP", indicators: 38 },
    { id: "klaster3", name: "Klaster 3 - UKK", indicators: 25 },
    { id: "klaster4", name: "Klaster 4 - Manajemen", indicators: 28 },
    { id: "klaster5", name: "Klaster 5 - Mutu", indicators: 20 },
  ]

  const sampleIndicators = [
    {
      id: "ukm_001",
      title: "Cakupan Kunjungan Ibu Hamil K4",
      description: "Persentase ibu hamil yang mendapat pelayanan antenatal sesuai standar paling sedikit empat kali",
      type: "achievement", // or "scale"
      target: 95,
      unit: "%",
      definition:
        "Ibu hamil yang mendapat pelayanan antenatal sesuai standar paling sedikit empat kali dengan distribusi pemberian pelayanan yang dianjurkan adalah minimal satu kali pada triwulan pertama, satu kali pada triwulan kedua dan dua kali pada triwulan ketiga umur kehamilan.",
    },
    {
      id: "ukm_002",
      title: "Ketersediaan Tenaga Kesehatan",
      description: "Penilaian ketersediaan dan kompetensi tenaga kesehatan di Puskesmas",
      type: "scale",
      scaleOptions: [
        { value: 0, label: "Tidak ada tenaga kesehatan sesuai standar" },
        { value: 4, label: "Kurang dari 50% tenaga kesehatan sesuai standar" },
        { value: 7, label: "50-80% tenaga kesehatan sesuai standar" },
        { value: 10, label: "Lebih dari 80% tenaga kesehatan sesuai standar" },
      ],
    },
  ]

  const handleScoreChange = (indicatorId: string, value: any) => {
    setAssessmentData((prev) => ({
      ...prev,
      [indicatorId]: value,
    }))
  }

  const calculateScore = (indicator: any, value: number) => {
    if (indicator.type === "achievement") {
      const achievement = (value / indicator.target) * 100
      if (achievement >= 100) return 10
      if (achievement >= 80) return 7
      if (achievement >= 60) return 4
      return 0
    }
    return value
  }

  const getTotalScore = () => {
    return Object.values(assessmentData).reduce((sum: number, score: any) => {
      return sum + (typeof score === "number" ? score : 0)
    }, 0)
  }

  const getProgress = () => {
    const totalIndicators = sampleIndicators.length
    const filledIndicators = Object.keys(assessmentData).length
    return (filledIndicators / totalIndicators) * 100
  }

  return (
    <div className="space-y-6">
      {/* Cluster Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Pilih Klaster Penilaian</CardTitle>
          <CardDescription>Pilih klaster yang akan dinilai untuk periode aktif</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCluster} onValueChange={setSelectedCluster}>
            <TabsList className="grid w-full grid-cols-5">
              {clusters.map((cluster) => (
                <TabsTrigger key={cluster.id} value={cluster.id} className="text-xs">
                  {cluster.name.split(" - ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Assessment Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Form Penilaian Indikator
                  </CardTitle>
                  <CardDescription>{clusters.find((c) => c.id === selectedCluster)?.name}</CardDescription>
                </div>
                <Badge variant="outline">
                  {currentIndicator + 1} / {sampleIndicators.length}
                </Badge>
              </div>
              <Progress value={getProgress()} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              {sampleIndicators.map((indicator, index) => (
                <div key={indicator.id} className="space-y-4 p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">{indicator.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{indicator.description}</p>
                    {indicator.definition && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-md">
                        <p className="text-xs text-blue-800">
                          <strong>Definisi:</strong> {indicator.definition}
                        </p>
                      </div>
                    )}
                  </div>

                  {indicator.type === "scale" ? (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Pilih Nilai:</Label>
                      <RadioGroup
                        value={assessmentData[indicator.id]?.toString() || ""}
                        onValueChange={(value) => handleScoreChange(indicator.id, Number.parseInt(value))}
                      >
                        {indicator.scaleOptions?.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-start space-x-2 p-3 border rounded-md hover:bg-gray-50"
                          >
                            <RadioGroupItem value={option.value.toString()} id={`${indicator.id}_${option.value}`} />
                            <Label htmlFor={`${indicator.id}_${option.value}`} className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{option.label}</span>
                                <Badge variant="secondary">{option.value}</Badge>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Capaian Aktual {indicator.unit && `(${indicator.unit})`}
                          </Label>
                          <Input
                            type="number"
                            placeholder="Masukkan nilai capaian"
                            value={assessmentData[indicator.id] || ""}
                            onChange={(e) => handleScoreChange(indicator.id, Number.parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Target {indicator.unit && `(${indicator.unit})`}
                          </Label>
                          <Input type="number" value={indicator.target} disabled className="bg-gray-50" />
                        </div>
                      </div>
                      {assessmentData[indicator.id] && (
                        <div className="p-3 bg-green-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              Skor Otomatis: {calculateScore(indicator, assessmentData[indicator.id])}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Nilai</CardTitle>
              <CardDescription>Progress dan total skor sementara</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{getTotalScore()}</div>
                <p className="text-sm text-blue-800">Total Skor Sementara</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress Pengisian</span>
                  <span>{Math.round(getProgress())}%</span>
                </div>
                <Progress value={getProgress()} />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Detail Nilai:</h4>
                {sampleIndicators.map((indicator) => (
                  <div key={indicator.id} className="flex justify-between text-xs p-2 bg-gray-50 rounded">
                    <span className="truncate flex-1 mr-2">{indicator.title}</span>
                    <span className="font-medium">
                      {assessmentData[indicator.id] !== undefined
                        ? indicator.type === "achievement"
                          ? calculateScore(indicator, assessmentData[indicator.id])
                          : assessmentData[indicator.id]
                        : "-"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full bg-transparent" variant="outline" disabled={userRole === "dinkes"}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Sementara
                </Button>
                <Button className="w-full" disabled={userRole === "dinkes" || getProgress() < 100}>
                  <Send className="w-4 h-4 mr-2" />
                  Kirim untuk Verifikasi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Catatan</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tambahkan catatan atau keterangan tambahan..."
                className="min-h-[100px]"
                disabled={userRole === "dinkes"}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
