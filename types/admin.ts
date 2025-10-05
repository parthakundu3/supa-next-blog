export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

export interface UserProfile {
  id: string
  email: string
  name?: string
  avatar?: string
}

