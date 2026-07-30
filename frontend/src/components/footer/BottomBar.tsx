import { Link } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import { legalLinks, paymentMethods } from '../../data/footerLinks'

const BottomBar = () => (
  <Box sx={{ borderTop: '1px solid', borderColor: 'grey.800' }}>
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          py: 2,
        }}
      >
        <Typography sx={{ fontSize: 11.5, color: 'grey.500' }}>
          © {new Date().getFullYear()} ShopBD. All rights reserved.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2.5 }}>
          {legalLinks.map((item) => (
            <Typography
              key={item.href}
              component={Link}
              to={item.href}
              sx={{ fontSize: 11.5, color: 'grey.500', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          {paymentMethods.map((p) => (
            <Box key={p} sx={{ bgcolor: 'grey.800', color: 'grey.400', fontSize: 11, px: 1, py: 0.4, borderRadius: 1 }}>
              {p}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
)

export default BottomBar
