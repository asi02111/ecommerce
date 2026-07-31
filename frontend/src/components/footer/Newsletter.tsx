import { Box, Container, Typography, TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

const Newsletter = () => {
  const theme = useTheme()
  const [email, setEmail] = useState('')

  return (
    <Box sx={{ bgcolor: theme.palette.primary.main }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            py: 3.5,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 19 }}>
              Get exclusive deals in your inbox
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,.8)', fontSize: 13, mt: 0.3 }}>
              Subscribe and save up to 20% on your first order
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: { xs: '100%', md: 'auto' } }}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              size="small"
              sx={{
                bgcolor: '#fff',
                borderRadius: 2.5,
                minWidth: { md: 280 },
                '& .MuiOutlinedInput-root': { borderRadius: 2.5 },
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon sx={{ fontSize: 16 }} />}
              sx={{
                bgcolor: '#fff',
                color: theme.palette.primary.main,
                fontWeight: 700,
                px: 3,
                borderRadius: 2.5,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Newsletter
