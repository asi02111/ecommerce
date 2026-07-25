import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Logo = () => {
  const theme = useTheme()

  return (
    <Typography
      component={Link}
      to="/"
      sx={{
        fontWeight: 800,
        fontSize: 24,
        letterSpacing: -0.5,
        color: theme.palette.primary.main,
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      Shop<span style={{ color: theme.palette.text.primary }}>BD</span>
    </Typography>
  )
}

export default Logo
