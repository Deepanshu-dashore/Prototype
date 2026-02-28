'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import UnifiedLogin from './UnifiedLogin'

export default function LoginContent() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Clear all cookies on same site
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict";
        }
    }, [])

    const handleSubmit = async (formData) => {
        setError('')
        setLoading(true)

        try {
            const { email: identifier, password } = formData
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

            router.push('/admin')
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
        <UnifiedLogin
            title="Admin Login"
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            fields={[
                { name: "email", type: "text", placeholder: "someone@example.com", label: "Email" },
                { name: "password", type: "password", placeholder: "********", label: "Password" },
            ]}
        />
    )
}
