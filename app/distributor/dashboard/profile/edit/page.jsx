"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function EditProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [distributorId, setDistributorId] = useState(null);

    // Toggles for addresses
    const [sameAsRegistered, setSameAsRegistered] = useState({
        shipping: false,
        billing: false
    });

    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyNumber: "", // Editable per request
        yearOfEstablishment: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonNumber: "",
        contactPersonDesignation: "",
        registeredAddress: { city: "", state: "", country: "", pinCode: "" },
        shippingAddress: { city: "", state: "", country: "", pinCode: "" },
        billingAddress: { city: "", state: "", country: "", pinCode: "" },
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get("/api/distributor/me");
            if (res.data?.success) {
                const data = res.data.data;
                setDistributorId(data._id);

                // Check if addresses effectively match to set toggles initially (optional optimization)
                // For now default to false or check basic equality if data exists
                const isShippingSame = JSON.stringify(data.registeredAddress) === JSON.stringify(data.shippingAddress);
                const isBillingSame = JSON.stringify(data.registeredAddress) === JSON.stringify(data.billingAddress);

                setSameAsRegistered({
                    shipping: isShippingSame,
                    billing: isBillingSame
                });

                setFormData({
                    companyName: data.companyName || "",
                    companyEmail: data.companyEmail || "",
                    companyNumber: data.companyNumber || "",
                    yearOfEstablishment: data.yearOfEstablishment || "",
                    contactPersonName: data.contactPersonName || "",
                    contactPersonEmail: data.contactPersonEmail || "",
                    contactPersonNumber: data.contactPersonNumber || "",
                    contactPersonDesignation: data.contactPersonDesignation || "",
                    registeredAddress: {
                        city: data.registeredAddress?.city || "",
                        state: data.registeredAddress?.state || "",
                        country: data.registeredAddress?.country || "",
                        pinCode: data.registeredAddress?.pinCode || "",
                    },
                    shippingAddress: {
                        city: data.shippingAddress?.city || "",
                        state: data.shippingAddress?.state || "",
                        country: data.shippingAddress?.country || "",
                        pinCode: data.shippingAddress?.pinCode || "",
                    },
                    billingAddress: {
                        city: data.billingAddress?.city || "",
                        state: data.billingAddress?.state || "",
                        country: data.billingAddress?.country || "",
                        pinCode: data.billingAddress?.pinCode || "",
                    }
                });
            }
        } catch (err) {
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => {
                const newData = {
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value,
                    },
                };

                // Auto update other addresses if toggled
                if (parent === 'registeredAddress') {
                    if (sameAsRegistered.shipping) newData.shippingAddress = newData.registeredAddress;
                    if (sameAsRegistered.billing) newData.billingAddress = newData.registeredAddress;
                }
                return newData;
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddressToggle = (type) => {
        const isChecked = !sameAsRegistered[type];
        setSameAsRegistered(prev => ({ ...prev, [type]: isChecked }));

        if (isChecked) {
            setFormData(prev => ({
                ...prev,
                [`${type}Address`]: { ...prev.registeredAddress }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const payload = { ...formData };
            if (sameAsRegistered.shipping) payload.shippingAddress = payload.registeredAddress;
            if (sameAsRegistered.billing) payload.billingAddress = payload.registeredAddress;

            const res = await axios.patch(`/api/distributor/${distributorId}`, payload);
            if (res.data?.success) {
                router.push("/distributor/dashboard/profile");
                router.refresh();
            } else {
                setError(res.data?.message || "Failed to update profile");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500">Loading your profile...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/distributor/dashboard/profile"
                    className="p-2 rounded-full hover:bg-white bg-gray-100 transition-colors shadow-sm"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                    <p className="text-sm text-gray-500">Update your account information</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {error && (
                    <div className="bg-red-50 border-b border-red-100 text-red-600 px-6 py-4 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
                    {/* Company Info */}
                    <div className="p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <div className="relative">
                                    <input type="text" name="companyName" value={formData.companyName} disabled className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
                                    <LockClosedIcon className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Contact admin to change company name</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                                <div className="relative">
                                    <input type="email" name="companyEmail" value={formData.companyEmail} disabled className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
                                    <LockClosedIcon className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
                                <input type="tel" name="companyNumber" value={formData.companyNumber} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
                                <input type="number" name="yearOfEstablishment" value={formData.yearOfEstablishment} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Person */}
                    <div className="p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Primary Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                <input type="text" name="contactPersonDesignation" value={formData.contactPersonDesignation} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" name="contactPersonNumber" value={formData.contactPersonNumber} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Registered Address */}
                    <div className="p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Registered Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" name="registeredAddress.city" value={formData.registeredAddress.city} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input type="text" name="registeredAddress.state" value={formData.registeredAddress.state} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input type="text" name="registeredAddress.country" value={formData.registeredAddress.country} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Pin Code</label>
                                <input type="text" name="registeredAddress.pinCode" value={formData.registeredAddress.pinCode} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="p-8 group">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
                                <input type="checkbox" checked={sameAsRegistered.shipping} onChange={() => handleAddressToggle('shipping')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                                Same as Registered Address
                            </label>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 transition-opacity ${sameAsRegistered.shipping ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" name="shippingAddress.city" value={formData.shippingAddress.city} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input type="text" name="shippingAddress.state" value={formData.shippingAddress.state} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input type="text" name="shippingAddress.country" value={formData.shippingAddress.country} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Pin Code</label>
                                <input type="text" name="shippingAddress.pinCode" value={formData.shippingAddress.pinCode} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="p-8 border-b-0">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
                                <input type="checkbox" checked={sameAsRegistered.billing} onChange={() => handleAddressToggle('billing')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                                Same as Registered Address
                            </label>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 transition-opacity ${sameAsRegistered.billing ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" name="billingAddress.city" value={formData.billingAddress.city} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input type="text" name="billingAddress.state" value={formData.billingAddress.state} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input type="text" name="billingAddress.country" value={formData.billingAddress.country} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Pin Code</label>
                                <input type="text" name="billingAddress.pinCode" value={formData.billingAddress.pinCode} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="bg-gray-50 px-8 py-5 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Please review your changes before saving.</p>
                        <div className="flex gap-4">
                            <Link
                                href="/distributor/dashboard/profile"
                                className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 shadow-md shadow-primary/20 transition-all disabled:opacity-70"
                            >
                                {saving ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
