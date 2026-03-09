"use client"

import * as React from "react"
import { Logo } from "@/components/ui/Logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/providers/AuthContext"
import { Button } from "./ui/Button"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, logout, isLoading } = useAuth()
    const pathname = usePathname()

    if (isLoading) return null
    if (!user) return null

    const role = user.role
    const userName = user.name

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white shadow-sm transition-transform lg:translate-x-0">
                <div className="h-full flex flex-col px-4 py-8">
                    <Logo className="px-2 mb-10" />

                    <nav className="flex-1 space-y-2">
                        {/* Common Items */}
                        <NavItem href="/dashboard" label="Home" active={pathname === '/dashboard'} />

                        {/* Role Specific Items */}
                        {role === 'RECEPTIONIST' && (
                            <>
                                <NavItem href="/dashboard/registration" label="Registration" active={pathname === '/dashboard/registration'} />
                                <NavItem href="/dashboard/queue" label="Patient Queue" active={pathname === '/dashboard/queue'} />
                            </>
                        )}

                        {role === 'NURSE' && (
                            <NavItem href="/dashboard/queue" label="Triage Queue" active={pathname === '/dashboard/queue'} />
                        )}

                        {role === 'DOCTOR' && (
                            <>
                                <NavItem href="/dashboard/consultation" label="Consultation" active={pathname === '/dashboard/consultation'} />
                                <NavItem href="/dashboard/history" label="Medical Records" active={pathname === '/dashboard/history'} />
                                <NavItem href="/dashboard/analytics" label="Analytics & Audits" active={pathname === '/dashboard/analytics'} />
                            </>
                        )}

                        {role === 'LAB_TECH' && (
                            <NavItem href="/dashboard/lab" label="Lab Requests" active={pathname === '/dashboard/lab'} />
                        )}

                        {role === 'PHARMACIST' && (
                            <NavItem href="/dashboard/pharmacy" label="Patient Prescriptions" active={pathname === '/dashboard/pharmacy'} />
                        )}

                        {role === 'CASHIER' && (
                            <NavItem href="/dashboard/billing" label="Invoices" active={pathname === '/dashboard/billing'} />
                        )}

                        {role === 'ADMIN' && (
                            <>
                                <NavItem href="/dashboard/analytics" label="Analytics & Audits" active={pathname === '/dashboard/analytics'} />
                                <NavItem href="/dashboard/history" label="Medical Records" active={pathname === '/dashboard/history'} />
                            </>
                        )}
                    </nav>

                    <div className="mt-auto space-y-4">
                        <div className="pt-6 border-t border-slate-100 flex items-center gap-3 px-2">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{role}</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 font-bold justify-start"
                            onClick={logout}
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 min-h-screen transition-all duration-300">
                <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
                    <h1 className="text-lg font-semibold text-slate-800 uppercase tracking-tight">Divine Favor Hospital Management</h1>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

function NavItem({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100"
                }`}
        >
            <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
        </Link>
    )
}
