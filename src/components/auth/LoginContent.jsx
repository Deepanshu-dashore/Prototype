'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import LogoLoop from '@/src/components/home/LogoLoop'
import {
    HeartIcon,
    CpuChipIcon,
    BuildingOffice2Icon,
    BeakerIcon,
    GlobeAmericasIcon,
    AcademicCapIcon,
    ServerIcon,
    WrenchScrewdriverIcon,
    EyeIcon,
    EyeSlashIcon,
    EnvelopeIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline'

export default function LoginContent() {
    const router = useRouter()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const industries = [
        { name: 'NURSING HOMES', icon: HeartIcon, iconBg: 'bg-pink-400', iconColor: 'text-pink-700' },
        { name: 'SEMI CONDUCTOR', icon: CpuChipIcon, iconBg: 'bg-blue-400', iconColor: 'text-blue-700' },
        { name: 'HOSPITALS', icon: BuildingOffice2Icon, iconBg: 'bg-teal-400', iconColor: 'text-teal-700' },
        { name: 'PHARMACEUTICAL', icon: BeakerIcon, iconBg: 'bg-purple-400', iconColor: 'text-purple-700' },
        { name: 'LIFE SCIENCE', icon: GlobeAmericasIcon, iconBg: 'bg-green-400', iconColor: 'text-green-700' },
        { name: 'SCHOOLS/PUBLIC ENTRANCES', icon: AcademicCapIcon, iconBg: 'bg-yellow-400', iconColor: 'text-yellow-700' },
        { name: 'DATA CENTRES', icon: ServerIcon, iconBg: 'bg-indigo-400', iconColor: 'text-indigo-700' },
        { name: 'MEDICAL DEVICES', icon: WrenchScrewdriverIcon, iconBg: 'bg-cyan-400', iconColor: 'text-cyan-700' },
    ]

    const industryCards = industries.map((industry) => ({
        node: (
            <div className="flex items-center gap-2.5 px-4 py-2.5 my-2 bg-white backdrop-blur-sm rounded-lg border-2 border-neutral-200 box-border">
                <div className={`flex items-center justify-center w-8 h-8 rounded-md ${industry.iconBg}`}>
                    <industry.icon className={`w-4 h-4 ${industry.iconColor} `} />
                </div>
                <span className="text-neutral-700 text-sm font-medium whitespace-nowrap">{industry.name}</span>
            </div>
        ),
        alt: industry.name
    }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const isEmail = identifier.includes('@')
            const requestBody = isEmail
                ? { email: identifier, password }
                : { name: identifier, password }

            const response = await axios.post('/api/auth/login', requestBody)

            if (response.data?.data) {
                const userData = JSON.stringify(response.data.data)
                const maxAge = 60 * 60 * 24 * 7 // 7 days
                document.cookie = `user=${encodeURIComponent(userData)}; max-age=${maxAge}; path=/; SameSite=Strict`
            }

            router.push('/admin/blogboard')
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else if (err.message) {
                setError(err.message)
            } else {
                setError('An error occurred. Please try again.')
            }
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/AdminBg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Login Form Card */}
            <div className="relative z-10 w-full max-w-[460px] px-6">
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-white/20">
                    <div className="flex items-center gap-2 mb-6">
                        <Image src="/CCMate-Logo.jpg" alt="Logo" width={100} height={200} className='object-contain h-13 w-auto' />
                        <h1 className="text-lg leading-5 text-nowrap font-extrabold text-primary/50 border-l-3 bg-linear-to-r from-primary/10 to-transparent border-primary/30 p-2 py-2.5 tracking-tight uppercase">Admin Login</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700 ml-1">
                                Email
                            </label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="someone@example.com"
                                required
                                className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="************"
                                    required
                                    className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1 mt-10">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-neutral-300 bg-white transition-all checked:bg-primary checked:border-primary"
                                    />
                                    <svg
                                        className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember Me</span>
                            </label>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center px-2 py-1 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-[#160258]  text-white font-bold rounded-xl hover:bg-[#1a006d] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Logging In...</span>
                                </div>
                            ) : 'Login'}
                        </button>
                    </form>

                    <div className="mt-5 pt-5 border-t border-neutral-100">
                        <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                            By continuing, you agree to CC Matting's{' '}
                            <a href="/terms-and-conditions" className="text-neutral-500 hover:text-primary transition-colors underline underline-offset-2 decoration-neutral-200">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy-policy" className="text-neutral-500 hover:text-primary transition-colors underline underline-offset-2 decoration-neutral-200">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Right Branding */}
            <div className="absolute bottom-6 right-8 z-20 pointer-events-none">
                <Image
                    src="/CCMate-Logo.jpg"
                    alt="CC Matting"
                    width={140}
                    height={36}
                    className="h-10 w-auto object-contain opacity-40 p-1.5 bg-white rounded shadow-sm"
                />
            </div>
        </div>
    )
}

