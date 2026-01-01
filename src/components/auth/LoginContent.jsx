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
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'

export default function LoginContent() {
    const router = useRouter()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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
        <div className="min-h-screen flex bg-white w-full">
            <div className="hidden lg:flex lg:w-1/2 bg-neutral-100 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 transform -rotate-45 origin-center scale-[1.5]">
                        <div className="w-full h-full flex flex-col justify-center gap-3">
                            {[0, 1, 2, 3, 4].map((stripIndex) => (
                                <div key={stripIndex} className="w-full overflow-hidden">
                                    <LogoLoop
                                        logos={industryCards}
                                        speed={20 + (stripIndex * 3)}
                                        direction={stripIndex % 2 === 0 ? 'left' : 'right'}
                                        gap={8}
                                        showCard={false}
                                        logoHeight={48}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-12 relative z-10 bg-white">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/assets/CC MATTING_New_2_Horizontal version_page-0001.jpg"
                            alt="CC Matting"
                            width={200}
                            height={52}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 text-center mb-8">
                        Welcome back
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Enter email address or username"
                                required
                                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>
                        {error && (
                            <div className="text-red-400 text-sm text-center">{error}</div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Continue'}
                        </button>
                    </form>

                    <p className="text-xs text-neutral-600 text-center mt-8">
                        By continuing, you agree to CC Matting's{' '}
                        <a href="/terms-and-conditions" className="underline hover:text-primary transition-colors">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy-policy" className="underline hover:text-primary transition-colors">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            <div className="lg:hidden absolute bottom-0 left-0 right-0 h-64 bg-neutral-100/80 backdrop-blur-sm border-t border-neutral-300 overflow-hidden">
                <div className="absolute inset-0 transform -rotate-45 origin-center scale-[1.2]">
                    <div className="w-full h-full flex flex-col justify-center gap-2">
                        {[0, 1, 2, 3].map((stripIndex) => (
                            <div key={stripIndex} className="w-full overflow-hidden">
                                <LogoLoop
                                    logos={industryCards}
                                    speed={15 + (stripIndex * 2)}
                                    direction={stripIndex % 2 === 0 ? 'left' : 'right'}
                                    gap={8}
                                    showCard={false}
                                    logoHeight={40}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
