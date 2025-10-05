import { 
  FileText, 
  FolderOpen, 
  Tag, 
  TrendingUp 
} from 'lucide-react'

const stats = [
  {
    id: 1,
    name: 'Total Posts',
    value: '24',
    icon: FileText,
    color: 'bg-blue-500',
    change: '+12%',
    changeType: 'positive'
  },
  {
    id: 2,
    name: 'Categories',
    value: '8',
    icon: FolderOpen,
    color: 'bg-green-500',
    change: '+3%',
    changeType: 'positive'
  },
  {
    id: 3,
    name: 'Tags',
    value: '32',
    icon: Tag,
    color: 'bg-purple-500',
    change: '+8%',
    changeType: 'positive'
  },
  {
    id: 4,
    name: 'Engagement',
    value: '86%',
    icon: TrendingUp,
    color: 'bg-orange-500',
    change: '+5%',
    changeType: 'positive'
  }
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
                {stat.name}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
              <p className={`text-sm mt-1 ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}