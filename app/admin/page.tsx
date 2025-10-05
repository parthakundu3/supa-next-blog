import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/components/AdminLayout'
import DashboardStats from '@/components/DashboardStats'
import { 
  FileText, 
  FolderOpen, 
  Tag, 
  TrendingUp, 
  Calendar,
  Users 
} from 'lucide-react'


export default function AdminDashboard() {
  const recentActivities = [
    { id: 1, action: 'Published new blog', time: '2 hours ago', type: 'publish' },
    { id: 2, action: 'Updated category', time: '5 hours ago', type: 'update' },
    { id: 3, action: 'Created new tag', time: '1 day ago', type: 'create' },
    { id: 4, action: 'User comment received', time: '2 days ago', type: 'comment' },
  ]

  return (
    <ProtectedRoute>
      <AdminLayout>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-gray-600">
            Here is what is happening with your blog today.
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <TrendingUp className="text-gray-400 w-5 h-5" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'publish' ? 'bg-green-500' :
                    activity.type === 'update' ? 'bg-blue-500' :
                    activity.type === 'create' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              <Calendar className="text-gray-400 w-5 h-5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 group">
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-blue-900">New Post</p>
              </button>
              
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200 group">
                <FolderOpen className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-green-900">Add Category</p>
              </button>
              
              <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200 group">
                <Tag className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium text-purple-900">Manage Tags</p>
              </button>
              
              <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-200 group">
                <Users className="w-6 h-6 text-orange-600 mb-2" />
                <p className="text-sm font-medium text-orange-900">Analytics</p>
              </button>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Chart visualization will appear here</p>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}