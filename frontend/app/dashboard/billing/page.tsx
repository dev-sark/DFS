"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cashierApi } from "@/lib/api"

export default function CashierPage() {
    const [invoices, setInvoices] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchInvoices = async () => {
        setIsLoading(true)
        try {
            const data = await cashierApi.getInvoices()
            setInvoices(data)
        } catch (error) {
            console.error("Failed to fetch invoices", error)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchInvoices()
    }, [])

    const handlePayment = async (id: number) => {
        try {
            await cashierApi.payInvoice(id, "CASH")
            fetchInvoices() // Refresh the list
        } catch (error) {
            console.error("Failed to process payment", error)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Billing Terminal</h2>
                        <p className="text-sm text-slate-500">Manage patient invoices and process payments.</p>
                    </div>
                    <Button size="sm" onClick={fetchInvoices} disabled={isLoading}>
                        {isLoading ? "Refreshing..." : "Refresh Bills"}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Invoices</CardTitle>
                        <CardDescription>All system-generated fees for consultations, labs, and pharmacy.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Invoice ID</th>
                                        <th className="pb-3">Type</th>
                                        <th className="pb-3">Amount (GHS)</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {invoices.length === 0 && !isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-slate-400 italic">No invoices found.</td>
                                        </tr>
                                    ) : (
                                        invoices.map((inv) => (
                                            <tr key={inv.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 pl-2 font-mono text-slate-500">INV-{String(inv.id).padStart(4, '0')}</td>
                                                <td className="py-4 font-bold text-slate-900">{String(inv.itemType).replace(/_/g, ' ')}</td>
                                                <td className="py-4 font-bold text-green-700">₵{Number(inv.amount).toFixed(2)}</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${inv.paymentStatus === 'PAID' ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-600'
                                                        }`}>
                                                        {inv.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right pr-2">
                                                    {inv.paymentStatus === 'UNPAID' ? (
                                                        <Button variant="primary" size="sm" onClick={() => handlePayment(inv.id)}>
                                                            Process Payment
                                                        </Button>
                                                    ) : (
                                                        <Button variant="outline" size="sm" disabled>Cleared</Button>
                                                    )}
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
