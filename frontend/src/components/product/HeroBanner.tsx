import { Box, Container } from '@mui/material'
import MainSlide     from '../hero/MainSlide'
import SideBanners   from '../hero/SideBanners'
import FeatureBadges from '../hero/FeatureBadges'

// HeroBanner এখন শুধু layout — carousel logic MainSlide এর ভেতরে useHeroSlider hook এ,
// side banner আর feature badges আলাদা component।
const HeroBanner = () => (
  <Box component="section" sx={{ py: 2.5 }}>
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <MainSlide />
        <SideBanners />
      </Box>
      <FeatureBadges />
    </Container>
  </Box>
)

export default HeroBanner
