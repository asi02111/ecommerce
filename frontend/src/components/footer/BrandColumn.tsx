import { Box, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { socialLinks } from '../../data/footerLinks'

const BrandColumn = () => {
  const theme = useTheme()

  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: 22, color: '#fff', mb: 1.5 }}>
        Shop<span style={{ color: theme.palette.primary.light }}>BD</span>
      </Typography>

      <Typography sx={{ fontSize: 13, color: 'grey.400', lineHeight: 1.7, mb: 2.5 }}>
        Bangladesh's most trusted online marketplace. Shop from thousands of products with guaranteed quality.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        {socialLinks.map((s) => (
          <IconButton
            key={s.label}
            component="a"
            href={s.href}
            aria-label={s.label}
            sx={{
              width: 36, height: 36, borderRadius: 2, bgcolor: 'grey.800', color: '#fff', fontSize: 14,
              '&:hover': { bgcolor: theme.palette.primary.main },
            }}
          >
            {s.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}

export default BrandColumn
