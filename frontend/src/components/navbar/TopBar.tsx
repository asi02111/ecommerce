import { Box, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { topLinks } from '../../data/navbarLinks'

const TopBar = () => {
  const theme = useTheme()

  return (
    <Box sx={{ bgcolor: theme.palette.primary.dark, color: '#fff', py: 0.6 }}>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 12 }}>
          🚚 Free delivery on orders over ৳999
        </Typography>
        <Stack direction="row" spacing={2.5}>
          {topLinks.map((link) => (
            <Typography
              key={link.href}
              component={Link}
              to={link.href}
              sx={{
                fontSize: 12,
                color: 'rgba(255,255,255,.85)',
                textDecoration: 'none',
                '&:hover': { color: '#fff' },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default TopBar
