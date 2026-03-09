"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { triageApi } from "@/lib/api"

export default function QueuePage() {
    const [queue, setQueue] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchQueue = async () => {
        setIsLoading(true)
        try {
            const data = await triageApi.getWaitingPatients()
            setQueue(data)
        } catch (err) {
            console.error("Failed to fetch queue", err)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchQueue()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Real-time Patient Queue</h2>
                        <p className="text-sm text-slate-500">Monitor patients waiting for vitals and consultation.</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={fetchQueue} disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Queue"}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Waiting for Vitals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Patient Name</th>
                                        <th className="pb-3">Folder #</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Arrival</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {queue.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-slate-400 italic">No patients currently waiting.</td>
                                        </tr>
                                    ) : (
                                        queue.map((visit) => (
                                            <tr key={visit.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 pl-2 font-medium text-slate-900">{visit.patient?.fullName}</td>
                                                <td className="py-4 text-slate-500 font-mono text-xs">{visit.patient?.folderNumber}</td>
                                                <td className="py-4">
                                                    <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600">
                                                        {visit.status.replace(/_/g, ' ')}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-slate-500">{new Date(visit.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                <td className="py-4 text-right pr-2">
                                                    <Button variant="ghost" size="sm" className="text-primary hover:text-accent font-bold">Capture Vitals</Button>
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
