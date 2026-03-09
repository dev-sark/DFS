"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { historyApi } from "@/lib/api"
import { Search } from "lucide-react"

export default function HistoryPage() {
    const [records, setRecords] = React.useState<any[]>([])
    const [searchTerm, setSearchTerm] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchRecords = async () => {
        setIsLoading(true)
        try {
            const data = await historyApi.getRecords()
            setRecords(data)
        } catch (error) {
            console.error("Failed to fetch records", error)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchRecords()
    }, [])

    const filteredRecords = records.filter(r =>
        r.patient?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.patient?.folderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.primaryDiagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Medical History</h2>
                        <p className="text-sm text-slate-500">Search and review past patient visits, diagnoses, and treatments.</p>
                    </div>
                    <Button size="sm" onClick={fetchRecords} disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Records"}
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-lg">Completed Visits Archive</CardTitle>
                            <CardDescription>All historical encounters recorded in the system.</CardDescription>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search Name, Folder, or Diagnosis..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Patient</th>
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Diagnosis</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredRecords.length === 0 && !isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-slate-400 italic">No historical records found for "{searchTerm}".</td>
                                        </tr>
                                    ) : (
                                        filteredRecords.map((record) => (
                                            <tr key={record.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 pl-2">
                                                    <p className="font-bold text-slate-900">{record.patient?.fullName || 'Unknown'}</p>
                                                    <p className="font-mono text-[10px] text-slate-400 uppercase">{record.patient?.folderNumber}</p>
                                                </td>
                                                <td className="py-4 text-slate-500 font-medium">
                                                    {new Date(record.visitDate).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 font-bold text-slate-700">
                                                    {record.primaryDiagnosis || <span className="text-slate-300 font-normal italic">None Recorded</span>}
                                                </td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${record.status.includes('COMPLETED') ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-600'
                                                        }`}>
                                                        {record.status.replace(/_/g, ' ')}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
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
