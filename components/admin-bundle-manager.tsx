"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Copy, Settings, Package, Calendar, Target, FileText } from "lucide-react"
import Car from "@/components/ui/car" // Declare the Car variable

export default function AdminBundleManager() {
  const [selectedBundle, setSelectedBundle] = useState("2024")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const bundles = [
    {
      id: "2024",
      name: "Bundle PKP 2024",
      year: 2024,
      status: "active",
      indicators: 156,
      clusters: 5,
      created: "2024-01-15",
      lastModified: "2024-03-20",
    },
    {
      id: "2023",
      name: "Bundle PKP 2023",
      year: 2023,
      status: "archived",
      indicators: 142,
      clusters: 5,
      created: "2023-01-10",
      lastModified: "2023-12-30",
    },
    {
      id: "2025",
      name: "Bundle PKP 2025 (Draft)",
      year: 2025,
      status: "draft",
      indicators: 168,
      clusters: 5,
      created: "2024-10-01",
      lastModified: "2024-12-15",
    },
  ]

  const sampleIndicators = [
    {
      id: "ukm_001",
      cluster: "Klaster 1 - UKM",
      title: "Cakupan Kunjungan Ibu Hamil K4",
      definition: "Persentase ibu hamil yang mendapat pelayanan antenatal sesuai standar paling sedikit empat kali",
      type: "achievement",
      target: 95,
      unit: "%",
      calculation: "monthly_cumulative",
    },
    {
      id: "ukm_002",
      cluster: "Klaster 1 - UKM",
      title: "Ketersediaan Tenaga Kesehatan",
      definition: "Penilaian ketersediaan dan kompetensi tenaga kesehatan di Puskesmas",
      type: "scale",
      scaleOptions: [
        { value: 0, label: "Tidak ada tenaga kesehatan sesuai standar" },
        { value: 4, label: "Kurang dari 50% tenaga kesehatan sesuai standar" },
        { value: 7, label: "50-80% tenaga kesehatan sesuai standar" },
        { value: 10, label: "Lebih dari 80% tenaga kesehatan sesuai standar" },
      ],
    },
  ]

  const clusters = [
    { id: "klaster1", name: "Klaster 1 - UKM", indicators: 45 },
    { id: "klaster2", name: "Klaster 2 - UKP", indicators: 38 },
    { id: "klaster3", name: "Klaster 3 - UKK", indicators: 25 },
    { id: "klaster4", name: "Klaster 4 - Manajemen", indicators: 28 },
    { id: "klaster5", name: "Klaster 5 - Mutu", indicators: 20 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Bundle Manager PKP
          </CardTitle>
          <CardDescription>Kelola bundle indikator penilaian PKP untuk setiap tahun periode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedBundle} onValueChange={setSelectedBundle}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Pilih Bundle" />
                </SelectTrigger>
                <SelectContent>
                  {bundles.map((bundle) => (
                    <SelectItem key={bundle.id} value={bundle.id}>
                      {bundle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge
                variant={
                  bundles.find((b) => b.id === selectedBundle)?.status === "active"
                    ? "default"
                    : bundles.find((b) => b.id === selectedBundle)?.status === "draft"
                      ? "secondary"
                      : "outline"
                }
              >
                {bundles.find((b) => b.id === selectedBundle)?.status === "active"
                  ? "Aktif"
                  : bundles.find((b) => b.id === selectedBundle)?.status === "draft"
                    ? "Draft"
                    : "Arsip"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Bundle Baru
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Buat Bundle Baru</DialogTitle>
                    <DialogDescription>Buat bundle indikator PKP untuk tahun baru</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bundle-name">Nama Bundle</Label>
                      <Input id="bundle-name" placeholder="Bundle PKP 2025" />
                    </div>
                    <div>
                      <Label htmlFor="bundle-year">Tahun</Label>
                      <Input id="bundle-year" type="number" placeholder="2025" />
                    </div>
                    <div>
                      <Label htmlFor="copy-from">Salin dari Bundle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih bundle untuk disalin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">Bundle PKP 2024</SelectItem>
                          <SelectItem value="2023">Bundle PKP 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button onClick={() => setIsCreateDialogOpen(false)}>Buat Bundle</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bundle Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Indikator</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bundles.find((b) => b.id === selectedBundle)?.indicators}</div>
            <p className="text-xs text-muted-foreground">Tersebar di 5 klaster</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tahun Periode</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bundles.find((b) => b.id === selectedBundle)?.year}</div>
            <p className="text-xs text-muted-foreground">Periode penilaian</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bundles.find((b) => b.id === selectedBundle)?.status === "active"
                ? "Aktif"
                : bundles.find((b) => b.id === selectedBundle)?.status === "draft"
                  ? "Draft"
                  : "Arsip"}
            </div>
            <p className="text-xs text-muted-foreground">Status bundle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terakhir Diubah</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {new Date(bundles.find((b) => b.id === selectedBundle)?.lastModified || "").toLocaleDateString("id-ID")}
            </div>
            <p className="text-xs text-muted-foreground">Tanggal modifikasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="indicators" className="space-y-4">
        <TabsList>
          <TabsTrigger value="indicators">Kelola Indikator</TabsTrigger>
          <TabsTrigger value="clusters">Konfigurasi Klaster</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan Bundle</TabsTrigger>
        </TabsList>

        {/* Indicators Management */}
        <TabsContent value="indicators" className="space-y-4">
          <Card>
            <Car.Header>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daftar Indikator</CardTitle>
                  <CardDescription>
                    Kelola indikator penilaian untuk bundle {bundles.find((b) => b.id === selectedBundle)?.name}
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Indikator
                </Button>
              </div>
            </Car.Header>
            <CardContent>
              <div className="space-y-4">
                {sampleIndicators.map((indicator, index) => (
                  <div key={indicator.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{indicator.cluster}</Badge>
                          <Badge variant={indicator.type === "achievement" ? "default" : "secondary"}>
                            {indicator.type === "achievement" ? "Capaian" : "Skala"}
                          </Badge>
                        </div>
                        <h3 className="font-semibold">{indicator.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{indicator.definition}</p>
                        {indicator.type === "achievement" && (
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span>
                              Target: {indicator.target}
                              {indicator.unit}
                            </span>
                            <span>
                              Perhitungan:{" "}
                              {indicator.calculation === "monthly_cumulative" ? "Kumulatif Bulanan" : "Per Bulan"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {indicator.type === "scale" && indicator.scaleOptions && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Opsi Penilaian:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {indicator.scaleOptions.map((option, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs p-2 bg-white rounded border"
                            >
                              <span>{option.label}</span>
                              <Badge variant="secondary">{option.value}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clusters Configuration */}
        <TabsContent value="clusters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Konfigurasi Klaster</CardTitle>
              <CardDescription>Atur pembagian klaster dan jumlah indikator per klaster</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clusters.map((cluster) => (
                  <Card key={cluster.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{cluster.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Jumlah Indikator</span>
                        <span className="font-medium">{cluster.indicators}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Bobot Klaster</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Klaster
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bundle Settings */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
                <CardDescription>Konfigurasi dasar bundle indikator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bundle-name-edit">Nama Bundle</Label>
                  <Input id="bundle-name-edit" value={bundles.find((b) => b.id === selectedBundle)?.name || ""} />
                </div>
                <div>
                  <Label htmlFor="bundle-year-edit">Tahun Periode</Label>
                  <Input
                    id="bundle-year-edit"
                    type="number"
                    value={bundles.find((b) => b.id === selectedBundle)?.year || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="bundle-status">Status Bundle</Label>
                  <Select value={bundles.find((b) => b.id === selectedBundle)?.status || ""}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="archived">Arsip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bundle-description">Deskripsi</Label>
                  <Textarea
                    id="bundle-description"
                    placeholder="Deskripsi bundle indikator..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aksi Bundle</CardTitle>
                <CardDescription>Operasi yang dapat dilakukan pada bundle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplikasi Bundle
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Bundle
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Package className="w-4 h-4 mr-2" />
                    Import Indikator
                  </Button>
                  <Button className="w-full" variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus Bundle
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm mb-3">Riwayat Perubahan</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Dibuat</span>
                      <span>
                        {new Date(bundles.find((b) => b.id === selectedBundle)?.created || "").toLocaleDateString(
                          "id-ID",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Terakhir diubah</span>
                      <span>
                        {new Date(bundles.find((b) => b.id === selectedBundle)?.lastModified || "").toLocaleDateString(
                          "id-ID",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
