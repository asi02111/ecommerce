import { Link } from 'react-router-dom'
import { Box, Container, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { navbarCategories } from '../../data/navbarCategories'
import { extraLinks } from '../../data/navbarLinks'
import MegaMenu from './MegaMenu'

interface Props {
  activeCategory: string | null
  onEnter: (label: string) => void
  onLeave: () => void
}

const CategoryBar = ({ activeCategory, onEnter, onLeave }: Props) => (
  <Box sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }} onMouseLeave={onLeave}>
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button
          startIcon={<MenuIcon fontSize="small" />}
          variant="contained"
          sx={{ borderRadius: 0, textTransform: 'none', fontWeight: 600, fontSize: 13.5, py: 1.5, px: 2.5 }}
        >
          All Categories
        </Button>

        {navbarCategories.map((cat) => (
          <Box key={cat.label} sx={{ position: 'relative' }} onMouseEnter={() => onEnter(cat.label)}>
            <Typography
              component={Link}
              to={cat.href}
              sx={{
                fontSize: 13.5,
                fontWeight: 500,
                px: 2,
                py: 1.7,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                color: activeCategory === cat.label ? 'primary.main' : 'text.secondary',
                borderBottom: '2px solid',
                borderColor: activeCategory === cat.label ? 'primary.main' : 'transparent',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {cat.label} <Box component="span" sx={{ fontSize: 10, opacity: 0.7 }}>▾</Box>
            </Typography>

            {activeCategory === cat.label && (
              <MegaMenu category={cat} onMouseEnter={() => onEnter(cat.label)} />
            )}
          </Box>
        ))}

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          {extraLinks.map((link) => (
            <Typography
              key={link.href}
              component={Link}
              to={link.href}
              sx={{
                fontSize: 13.5,
                fontWeight: 600,
                color: link.label.includes('Deals') ? 'error.main' : 'text.secondary',
                textDecoration: 'none',
                '&:hover': { opacity: 0.8 },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  </Box >
)

export default CategoryBar
