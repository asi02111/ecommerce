import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface Props {
  icon?:        string
  title:        string
  description?: string
  action?:      ReactNode
}

const EmptyState = ({ icon = '📭', title, description, action }: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, px: 2, textAlign: 'center' }}>
    <Typography sx={{ fontSize: 56, mb: 2 }}>{icon}</Typography>
    <Typography sx={{ fontWeight: 700, fontSize: 18, color: 'text.primary', mb: 1 }}>{title}</Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 320 }}>
        {description}
      </Typography>
    )}
    {action}
  </Box>
)

export default EmptyState
