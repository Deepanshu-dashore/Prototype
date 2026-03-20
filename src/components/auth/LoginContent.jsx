'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApiClient } from '@/src/config/axios'
import UnifiedLogin from './UnifiedLogin'

export default function LoginContent() {
    const api = useApiClient()
    const router = useRouter()
    const [error, setError] = useState('')
    const [role, setRole] = useState('admin')

    const loginMutation = api.usePost(null, "/auth/login", {
        onSuccess: (response) => {
            if (response.data) {
                const userData = JSON.stringify(response.data)
                const maxAge = 60 * 60 * 24 * 7 // 7 days
                document.cookie = `user=${encodeURIComponent(userData)}; max-age=${maxAge}; path=/; SameSite=Strict`
            }
            router.push('/admin/')
        },
        onError: (err) => {
            setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.')
        }
    })

    const warehouseLoginMutation = api.usePost(null, "/warehouse/login", {
        onSuccess: (response) => {
            if (response.data) {
                const { warehouse } = response.data
                const maxAge = 60 * 60 * 24 * 7 // 7 days
                document.cookie = `warehouse_user=${encodeURIComponent(
                    JSON.stringify(warehouse)
                )}; max-age=${maxAge}; path=/; SameSite=Strict`
            }
            router.push("/warehouse/orders")
        },
        onError: (err) => {
            setError(err.response?.data?.message || err.message || "An error occurred. Please try again.")
        }
    })

    const loading = loginMutation.isPending || warehouseLoginMutation.isPending

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
        const { email: identifier, password } = formData
        const isEmail = identifier.includes('@')
        const requestBody = isEmail
            ? { email: identifier, password }
            : { name: identifier, password }

        loginMutation.mutate(requestBody)
    }

    const handleWarehouseSubmit = async (formData) => {
        setError("")
        const { name, password } = formData
        warehouseLoginMutation.mutate({ name, password })
    }

    return (
        <UnifiedLogin
            title="Admin Login"
            onSubmit={role === "admin" ? handleSubmit : handleWarehouseSubmit}
            loading={loading}
            error={error}
            links={{ forgotPassword: false, register: false }}
            fields={[
                { name: "role", state: role, onChange: (e) => setRole(e.target.value), type: "select", placeholder: "Select Role", label: "Role", options: [{ value: "admin", label: "Admin" }, { value: "warehouse", label: "Warehouse" }] },
                ...(role === "admin" ? [{ name: "email", type: "text", placeholder: "someone@example.com", label: "Email" }] : [{ name: "name", type: "text", placeholder: "Warehouse Name", label: "Warehouse Name" }]),
                { name: "password", type: "password", placeholder: "********", label: "Password" },
            ]}
        />
    )
}
