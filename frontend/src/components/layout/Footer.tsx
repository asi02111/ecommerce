import { Box, Container, Grid } from '@mui/material'
import Newsletter    from '../footer/Newsletter'
import BrandColumn   from '../footer/BrandColumn'
import LinkColumn    from '../footer/LinkColumn'
import ContactColumn from '../footer/ContactColumn'
import BottomBar     from '../footer/BottomBar'
import { quickLinks, customerServiceLinks } from '../../data/footerLinks'

// Footer ও Navbar এর মতোই orchestrator pattern — নিজে কোনো detail রাখে না,
// শুধু ছোট ছোট component সাজায়।
const Footer = () => (
  <Box component="footer" sx={{ bgcolor: '#111827', mt: 8 }}>
    <Newsletter />

    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <BrandColumn />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <LinkColumn title="Quick Links" links={quickLinks} />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <LinkColumn title="Customer Service" links={customerServiceLinks} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ContactColumn />
        </Grid>
      </Grid>
    </Container>

    <BottomBar />
  </Box>
)

export default Footer
