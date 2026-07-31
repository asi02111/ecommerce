import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { sideBanners } from '../../data/heroSlides'

const SideBanners = () => (
  <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', gap: 2, width: 260 }}>
    {sideBanners.map((b) => (
      <Box
        key={b.title}
        component={Link}
        to={b.link}
        sx={{
          position: 'relative', flex: 1, borderRadius: 3, overflow: 'hidden',
          textDecoration: 'none', display: 'block', minHeight: 150,
          transition: '.2s', '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Box component="img" src={b.image} alt={b.title} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: b.overlay }} />

        <Box sx={{ position: 'relative', zIndex: 2, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Box>
            <Box sx={{ display: 'inline-block', fontSize: 10, fontWeight: 700, color: '#fff', bgcolor: 'rgba(255,255,255,.2)', px: 1, py: 0.3, borderRadius: 5 }}>
              {b.badge}
            </Box>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, mt: 1, lineHeight: 1.3 }}>
              {b.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,.85)', fontSize: 12, mt: 0.3 }}>
              {b.subtitle}
            </Typography>
          </Box>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 12, textDecoration: 'underline' }}>
            {b.linkText}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
)

export default SideBanners
