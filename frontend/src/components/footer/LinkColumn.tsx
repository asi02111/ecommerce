import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import type { NavLink } from '../../types/navbar'

interface Props {
  title: string
  links: NavLink[]
}

// একই component দিয়ে "Quick Links" আর "Customer Service" দুটো column বানানো হয়
const LinkColumn = ({ title, links }: Props) => (
  <Box>
    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14, mb: 2 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
      {links.map((link) => (
        <Typography
          key={link.href}
          component={Link}
          to={link.href}
          sx={{
            fontSize: 13,
            color: 'grey.400',
            textDecoration: 'none',
            width: 'fit-content',
            transition: '.15s',
            '&:hover': { color: '#fff' },
          }}
        >
          {link.label}
        </Typography>
      ))}
    </Box>
  </Box>
)

export default LinkColumn
