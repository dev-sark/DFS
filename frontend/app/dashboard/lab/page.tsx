"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

import { labApi } from "@/lib/api"
import { useAuth } from "@/providers/AuthContext"

export default function LabPage() {
    const [requests, setRequests] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const { user } = useAuth()

    const fetchRequests = async () => {
        setIsLoading(true)
        try {
            const data = await labApi.getPendingRequests()
            setRequests(data)
        } catch (error) {
            console.error("Failed to fetch lab reqs", error)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchRequests()
    }, [])

    const handleEnterResult = async (id: number) => {
        const results = prompt("Enter the diagnostic results for this test:")
        if (!results) return

        try {
            await labApi.submitResult(id, results, user?.name || "Tech")
            fetchRequests()
        } catch (error) {
            console.error("Failed to submit results", error)
            alert("Error submitting results.")
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Diagnostics & Lab Results</h2>
                        <p className="text-sm text-slate-500">Manage diagnostic requests and enter results for doctors.</p>
                    </div>
                    <Button size="sm" onClick={fetchRequests} disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Requests"}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Pending Lab Requests</CardTitle>
                        <CardDescription>Only invoices marked as Paid appear here automatically.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Patient</th>
                                        <th className="pb-3">Test Requested</th>
                                        <th className="pb-3 text-center">Date</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {requests.length === 0 && !isLoading ? (
                                        <tr><td colSpan={4} className="py-8 text-center text-slate-400 italic">No pending lab requests.</td></tr>
                                    ) : (
                                        requests.map((req) => (
                                            <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 pl-2">
                                                    <p className="font-medium text-slate-900">{req.visit?.patient?.fullName || 'Unknown'}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase font-mono">{req.visit?.patient?.folderNumber}</p>
                                                </td>
                                                <td className="py-4 text-slate-700 font-bold">{req.testName}</td>
                                                <td className="py-4 text-center font-mono text-[10px] text-slate-500">
                                                    {new Date(req.requestDate).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <Button variant="primary" size="sm" onClick={() => handleEnterResult(req.id)}>
                                                        Enter Results
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
