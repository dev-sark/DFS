"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { pharmacyApi } from "@/lib/api"

export default function PharmacyPage() {
    const [prescriptions, setPrescriptions] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchPrescriptions = async () => {
        setIsLoading(true)
        try {
            const data = await pharmacyApi.getPendingPrescriptions()
            setPrescriptions(data)
        } catch (error) {
            console.error("Failed to fetch prescriptions", error)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPrescriptions()
    }, [])

    const handleDispense = async (id: number) => {
        try {
            await pharmacyApi.dispenseMedication(id)
            fetchPrescriptions()
        } catch (error) {
            console.error("Failed to dispense", error)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pharmacy Dispensing</h2>
                        <p className="text-sm text-slate-500">Dispense medications based on digital prescriptions.</p>
                    </div>
                    <Button size="sm" onClick={fetchPrescriptions} disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Inventory Check"}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Digital Prescriptions</CardTitle>
                        <CardDescription>Verify payment before dispensing medications.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Patient</th>
                                        <th className="pb-3 text-center">Medication</th>
                                        <th className="pb-3 text-center">Dosage</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {prescriptions.length === 0 && !isLoading ? (
                                        <tr><td colSpan={4} className="py-8 text-center text-slate-400 italic">No pending prescriptions.</td></tr>
                                    ) : (
                                        prescriptions.map((p) => (
                                            <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 pl-2">
                                                    <p className="font-bold text-slate-900">{p.visit?.patient?.fullName || 'Unknown'}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium uppercase truncate w-32">{p.notes || 'No notes'}</p>
                                                </td>
                                                <td className="py-4 text-center text-slate-600 font-bold">{p.medicationName}</td>
                                                <td className="py-4 text-center">
                                                    <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                                                        {p.dosage} - {p.frequency}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    <Button variant="primary" size="sm" onClick={() => handleDispense(p.id)}>
                                                        Dispense Now
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
