"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { analyticsApi } from "@/lib/api"

export default function AnalyticsPage() {
    const [visitVolume, setVisitVolume] = React.useState<any>({})
    const [diseaseStats, setDiseaseStats] = React.useState<any>({})
    const [frequentVisitors, setFrequentVisitors] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const [volume, diseases, visitors] = await Promise.all([
                analyticsApi.getVisitVolume(),
                analyticsApi.getDiseaseStats(),
                analyticsApi.getFrequentVisitors(3) // Threshold 3
            ])

            // Transform [{date: "x", count: y}] -> { "x": y }
            const volumeMap: any = {}
            if (Array.isArray(volume)) {
                volume.forEach((item: any) => { volumeMap[String(item.date).split('T')[0]] = item.count })
            }

            // Transform [{diagnosis: "x", count: y}] -> { "x": y }
            const diseaseMap: any = {}
            if (Array.isArray(diseases)) {
                diseases.filter((d: any) => d.diagnosis !== null).forEach((item: any) => { diseaseMap[item.diagnosis] = item.count })
            }

            setVisitVolume(volumeMap)
            setDiseaseStats(diseaseMap)
            setFrequentVisitors(Array.isArray(visitors) ? visitors : [])
        } catch (err) {
            console.error("Failed to fetch analytics", err)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hospital Analytics & Oversight</h2>
                        <p className="text-sm text-slate-500">Monitor financial performance, disease trends, and patient frequency.</p>
                    </div>
                    <Button size="sm" onClick={fetchData} disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Analytics"}
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Patients Recorded"
                        value={Object.values(visitVolume).reduce((a: any, b: any) => a + b, 0)}
                        sub="Cumulative Visits"
                        trending="+100%"
                    />
                    <StatCard
                        title="Top Diagnosis"
                        value={Object.keys(diseaseStats).length > 0 ? Object.entries(diseaseStats).sort((a: any, b: any) => b[1] - a[1])[0][0] : "None"}
                        sub="Most common case"
                        trending="High"
                    />
                    <StatCard
                        title="Frequent Visitors"
                        value={frequentVisitors.length}
                        sub="High-frequency patients"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Patient Volume Chart Placeholder */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Visit Volume</CardTitle>
                            <CardDescription>Visits recorded in the system by date.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 flex items-end gap-2 px-6">
                            {Object.entries(visitVolume).length === 0 ? (
                                <p className="w-full text-center text-slate-400 italic">No volume data yet.</p>
                            ) : (
                                Object.entries(visitVolume).map(([date, count]: any, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm group relative" style={{ height: `${Math.min((count as number) * 20, 100)}%` }}>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-1 bg-slate-900 text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {date}: {count}
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Diseases */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Disease Prevalence</CardTitle>
                            <CardDescription>Analysis of diagnosed conditions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(diseaseStats).length === 0 ? (
                                <p className="text-center text-slate-400 italic py-8">No diagnosis data yet.</p>
                            ) : (
                                Object.entries(diseaseStats).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([label, count]: any, i) => (
                                    <DiseaseBar key={i} label={label} count={count} percent={Math.min(count * 10, 100)} />
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Frequent Visitors List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                            Frequent Visitor Detection
                        </CardTitle>
                        <CardDescription>Patients with unusually high visit counts. Verified backend data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Patient Name</th>
                                        <th className="pb-3">Folder No.</th>
                                        <th className="pb-3">Total Visits</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {frequentVisitors.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-slate-400 italic">No frequent visitors detected yet.</td>
                                        </tr>
                                    ) : (
                                        frequentVisitors.map((p, i) => (
                                            <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                                                <td className="py-4 pl-2 font-bold text-slate-900 group-hover:text-primary">{p.fullName}</td>
                                                <td className="py-4 text-slate-500 font-mono text-xs">{p.folderNumber}</td>
                                                <td className="py-4 font-bold">{p.visitCount}</td>
                                                <td className="py-4 text-right pr-2">
                                                    <Button variant="outline" size="sm" className="font-bold border-red-200 text-red-500 hover:bg-red-50">Flag Record</Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

function StatCard({ title, value, sub, trending }: any) {
    return (
        <Card className="bg-white border-none shadow-md">
            <CardContent className="p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">{title}</p>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{value}</span>
                    {trending && <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{trending}</span>}
                </div>
                <p className="mt-1 text-xs text-slate-400 font-medium">{sub}</p>
            </CardContent>
        </Card>
    )
}

function DiseaseBar({ label, count, percent }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">{label}</span>
                <span className="text-slate-400">{count} cases</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${percent}%` }} />
            </div>
        </div>
    )
}
