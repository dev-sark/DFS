"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { doctorApi } from "@/lib/api"

export default function ConsultationPage() {
    const [queue, setQueue] = React.useState<any[]>([])
    const [activeVisit, setActiveVisit] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [diagnosis, setDiagnosis] = React.useState("")
    const [findings, setFindings] = React.useState("")

    const fetchQueue = async () => {
        setIsLoading(true)
        try {
            const data = await doctorApi.getQueue()
            setQueue(data)
            if (data.length > 0 && !activeVisit) {
                setActiveVisit(data[0])
            }
        } catch (err) {
            console.error("Failed to fetch queue", err)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchQueue()
    }, [])

    const handleSubmit = async () => {
        if (!activeVisit || !diagnosis) return
        setIsSubmitting(true)
        try {
            await doctorApi.submitConsultation({
                visitId: activeVisit.id,
                primaryDiagnosis: diagnosis,
                labRequests: [], // For simplicity in this demo connect
                prescriptions: []
            })
            setDiagnosis("")
            setFindings("")
            setActiveVisit(null)
            fetchQueue()
        } catch (err) {
            console.error("Submission failed", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Patient Selection & Queue */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Waitlist</CardTitle>
                            <CardDescription>Patients ready for consultation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {isLoading ? (
                                    <p className="text-center text-slate-400 text-sm py-4">Loading waitlist...</p>
                                ) : queue.length === 0 ? (
                                    <p className="text-center text-slate-400 text-sm py-4 italic">No patients waiting.</p>
                                ) : (
                                    queue.map((visit) => (
                                        <div key={visit.id} onClick={() => setActiveVisit(visit)}>
                                            <PatientItem
                                                name={visit.patient?.fullName}
                                                priority={visit.urgent ? "Urgent" : "Normal"}
                                                status={visit.status.replace(/_/g, ' ')}
                                                time={new Date(visit.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                active={activeVisit?.id === visit.id}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Case Work (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    {activeVisit ? (
                        <Card className="border-primary/20 shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-6">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl">Consultation: {activeVisit.patient?.fullName}</CardTitle>
                                    <CardDescription>
                                        Folder: {activeVisit.patient?.folderNumber} | {activeVisit.patient?.gender} | {activeVisit.patient?.telephone}
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">History</Button>
                                    <Button size="sm">Vitals</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {/* Vitals Summary Banner */}
                                <div className="flex gap-4 p-4 rounded-xl bg-teal-50 border border-teal-100 overflow-x-auto">
                                    <VitalStat label="Temp" value={`${activeVisit.temperature || '--'}°C`} />
                                    <div className="w-[1px] bg-teal-200 self-stretch" />
                                    <VitalStat label="BP" value={`${activeVisit.bloodPressure || '--/--'}`} />
                                    <div className="w-[1px] bg-teal-200 self-stretch" />
                                    <VitalStat label="Pulse" value={`${activeVisit.pulse || '--'} bpm`} />
                                    <div className="w-[1px] bg-teal-200 self-stretch" />
                                    <VitalStat label="Weight" value={`${activeVisit.weight || '--'} kg`} />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Symptoms & Assessment</label>
                                        <textarea
                                            value={findings}
                                            onChange={(e) => setFindings(e.target.value)}
                                            className="flex min-h-[100px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                                            placeholder="Enter findings..."
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Primary Diagnosis</label>
                                        <Input
                                            value={diagnosis}
                                            onChange={(e) => setDiagnosis(e.target.value)}
                                            placeholder="Enter diagnosis (e.g. Malaria symptoms)"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        <Card className="bg-slate-50 border-dashed border-2">
                                            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lab/Imaging</span>
                                                <Button variant="outline" size="sm" className="w-full">Request Tests</Button>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-slate-50 border-dashed border-2">
                                            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prescription</span>
                                                <Button variant="outline" size="sm" className="w-full">Add Medications</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-slate-100 pt-6">
                                <Button className="w-full h-12" onClick={handleSubmit} disabled={isSubmitting || !diagnosis}>
                                    {isSubmitting ? "Submitting..." : "Submit & Finish Consultation"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">📋</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No Patient Selected</h3>
                            <p className="text-sm text-slate-500 max-w-xs mt-1">Select a patient from the waitlist to begin the consultation process.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

function PatientItem({ name, priority, status, time, active = false }: any) {
    return (
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${active ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-slate-50"
            }`}>
            <div>
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{name}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{status} • {time}</p>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                }`}>
                {priority}
            </div>
        </div>
    )
}

function VitalStat({ label, value }: any) {
    return (
        <div className="min-w-[80px]">
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest leading-none">{label}</p>
            <p className="text-sm font-bold text-slate-900 mt-1">{value}</p>
        </div>
    )
}
