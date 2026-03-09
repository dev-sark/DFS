"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

const mockInvoices = [
    { id: 101, patient: "John Doe", items: "Malaria Test, Lab Fee", amount: 70.00, status: "UNPAID" },
    { id: 102, patient: "John Doe", items: "Paracetamol, Amoxicillin", amount: 45.00, status: "UNPAID" },
    { id: 103, patient: "Emmanuel Mensah", items: "Consultation Fee", amount: 30.00, status: "PAID" },
]

export default function CashierPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Payments</h2>
                        <p className="text-sm text-slate-500">Collect payments for services and mark invoices as paid.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today's Total</p>
                        <p className="text-xl font-bold text-primary">GH₵ 1,240.00</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Outstanding Invoices</CardTitle>
                        <CardDescription>Verify payments before patients proceed to Lab or Pharmacy.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                                        <th className="pb-3 pl-2">Patient</th>
                                        <th className="pb-3">Details</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3 text-right pr-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {mockInvoices.map((inv) => (
                                        <tr key={inv.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 pl-2 font-bold text-slate-900">{inv.patient}</td>
                                            <td className="py-4 text-slate-600 truncate max-w-[200px]">{inv.items}</td>
                                            <td className="py-4 font-bold text-slate-900">GH₵ {inv.amount.toFixed(2)}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${inv.status === 'PAID' ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right pr-2">
                                                {inv.status === 'UNPAID' ? (
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="sm" variant="outline" className="border-teal-600 text-teal-600">MoMo</Button>
                                                        <Button size="sm">Cash</Button>
                                                    </div>
                                                ) : (
                                                    <Button variant="ghost" size="sm" className="text-slate-400 pointer-events-none">Receipt Issued</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
