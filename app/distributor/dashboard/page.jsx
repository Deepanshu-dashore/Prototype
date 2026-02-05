export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">
                    This is your distributor dashboard. Use the sidebar to navigate to your profile and manage your account.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">Active</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-medium text-gray-500">Registered On</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                        {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
