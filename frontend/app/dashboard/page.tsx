"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/AuthContext"

export default function DashboardRedirector() {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (isLoading) return

        if (!user) {
            router.push('/login')
            return
        }

        // Dynamic Redirection based on Role
        switch (user.role) {
            case 'ADMIN':
                router.push('/dashboard/analytics')
                break
            case 'DOCTOR':
                router.push('/dashboard/consultation')
                break
            case 'NURSE':
                router.push('/dashboard/queue') // Nurses handle vitals/queue
                break
            case 'RECEPTIONIST':
                router.push('/dashboard/registration')
                break
            case 'CASHIER':
                router.push('/dashboard/billing')
                break
            case 'LAB_TECH':
                router.push('/dashboard/lab')
                break
            case 'PHARMACIST':
                router.push('/dashboard/pharmacy')
                break
            default:
                router.push('/login')
        }
    }, [user, isLoading, router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Entering Digital Portal...</p>
            </div>
        </div>
    )
}
