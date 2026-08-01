import { Link } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Button } from '../components/common'
import { useTheme } from '@mui/material/styles'

const NotFoundPage = () => {
  const theme = useTheme()

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', bgcolor: 'grey.50' }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>

          {/* Big 404 with theme color */}
          <Typography
            sx={{
              fontSize: { xs: 90, md: 130 },
              fontWeight: 800,
              lineHeight: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>

          <Typography sx={{ fontSize: 24, mb: 1 }}>🛍️💨</Typography>

          <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 1 }}>
            Oops! Page not found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 380, mx: 'auto' }}>
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to shopping.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button startIcon={<HomeOutlinedIcon />}>Back to Home</Button>
            </Link>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <Button variant="outline" startIcon={<SearchOutlinedIcon />}>Browse Products</Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default NotFoundPage
