import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import type { HeroSlide } from '../../data/heroSlides'

interface Props {
  slide: HeroSlide
  animating: boolean
}

const SlideContent = ({ slide, animating }: Props) => (
  <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', p: { xs: 3, md: 5 }, maxWidth: 480 }}>

    <Typography sx={{ fontSize: 13, fontWeight: 700, color: slide.accent, mb: 1.5 }}>
      {slide.badge}
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: 26, md: 34 },
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1.2,
        mb: 1.5,
        transition: 'opacity .5s, transform .5s',
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(10px)' : 'translateY(0)',
      }}
    >
      {slide.title}
    </Typography>

    <Typography
      sx={{
        fontSize: 16,
        color: 'rgba(255,255,255,.85)',
        mb: 3,
        transition: 'opacity .5s .05s, transform .5s .05s',
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(10px)' : 'translateY(0)',
      }}
    >
      {slide.subtitle}
    </Typography>

    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
      <Button
        component={Link}
        to={slide.buttonLink}
        variant="contained"
        sx={{ bgcolor: '#fff', color: 'primary.dark', fontWeight: 700, px: 3, py: 1.2, '&:hover': { bgcolor: 'grey.100' } }}
      >
        {slide.buttonText} →
      </Button>
      <Button
        component={Link}
        to="/deals"
        variant="outlined"
        sx={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff', px: 3, '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.1)' } }}
      >
        View All Deals
      </Button>
    </Box>
  </Box>
)

export default SlideContent
