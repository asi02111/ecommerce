import { Box, Typography, Grid } from '@mui/material'
import { featureBadges } from '../../data/heroSlides'

const FeatureBadges = () => (
  <Grid container spacing={1.5} sx={{ mt: 2 }}>
    {featureBadges.map((item) => (
      <Grid size={{ xs: 6, md: 3 }} key={item.title}>
        <Box
          sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5,
            bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
            borderRadius: 3, px: 2, py: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 24 }}>{item.icon}</Typography>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.primary' }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              {item.desc}
            </Typography>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
)

export default FeatureBadges
