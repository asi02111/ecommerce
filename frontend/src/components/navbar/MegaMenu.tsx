import { Link } from 'react-router-dom'
import { Paper, Typography, Box, Stack } from '@mui/material'
import type { Category } from '../../types/navbar'

interface Props {
  category: Category
  onMouseEnter: () => void
}

const MegaMenu = ({ category, onMouseEnter }: Props) => (
  <Paper
    onMouseEnter={onMouseEnter}
    elevation={6}
    sx={{
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 240,
      borderRadius: '0 0 12px 12px',
      p: 2.5,
      zIndex: 50,
    }}
  >
    <Typography
      variant="overline"
      sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1, display: 'block', mb: 1.5 }}
    >
      {category.label}
    </Typography>

    <Stack spacing={1}>
      {category.subcategories.map((sub) => (
        <Typography
          key={sub.href}
          component={Link}
          to={sub.href}
          sx={{
            fontSize: 13.5,
            color: 'text.secondary',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            transition: '.15s',
            '&:hover': { color: 'primary.main', pl: 0.5 },
          }}
        >
          <Box component="span" sx={{ color: 'primary.light' }}>›</Box>
          {sub.label}
        </Typography>
      ))}
    </Stack>

    <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography
        component={Link}
        to={category.href}
        sx={{ fontSize: 12, fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}
      >
        View all {category.label} →
      </Typography>
    </Box>
  </Paper>
)

export default MegaMenu
