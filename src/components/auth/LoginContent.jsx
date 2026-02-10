'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import UnifiedLogin from './UnifiedLogin'

export default function LoginContent() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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
