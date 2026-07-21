import type { ReactNode } from 'react'

interface Props {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}

const EmptyState = ({ icon = '📭', title, description, action }: Props) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
    <p className="text-6xl mb-4">{icon}</p>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    {description && <p className="text-sm text-gray-500 mb-6 max-w-xs">{description}</p>}
    {action && <div>{action}</div>}
  </div>
)

export default EmptyState
