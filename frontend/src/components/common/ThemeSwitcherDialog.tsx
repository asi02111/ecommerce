import {
  Dialog, DialogTitle, DialogContent, IconButton,
  Box, Typography, Grid, Paper,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { paletteList, type ThemeId } from '../../theme/palette'
import { useAppTheme } from '../../hooks/useStore'

interface Props {
  open:    boolean
  onClose: () => void
}

const ThemeSwitcherDialog = ({ open, onClose }: Props) => {
  const { themeId, setTheme } = useAppTheme()

  const handlePick = (id: ThemeId) => {
    setTheme(id)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 4 } } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Choose your theme</Typography>
          <Typography variant="caption" color="text.secondary">
            Pick a look for your store — changes apply instantly
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {paletteList.map((p) => {
            const isActive = p.id === themeId
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
                <Paper
                  onClick={() => handlePick(p.id)}
                  elevation={0}
                  sx={{
                    border: '2px solid',
                    borderColor: isActive ? p.primary.main : 'divider',
                    borderRadius: 3,
                    p: 2,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: '.2s',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 28px rgba(0,0,0,.1)' },
                  }}
                >
                  {isActive && (
                    <CheckCircleIcon
                      sx={{ position: 'absolute', top: 10, right: 10, color: p.primary.main, fontSize: 22 }}
                    />
                  )}

                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography sx={{ fontSize: 20 }}>{p.emoji}</Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{p.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{p.tagline}</Typography>
                    </Box>
                  </Box>

                  {/* Mini preview strip */}
                  <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ height: 34, background: p.gradient, display: 'flex', alignItems: 'center', px: 1.5 }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>
                        Shop<span style={{ color: p.secondary.light }}>BD</span>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, p: 1, bgcolor: p.background.default }}>
                      {[p.primary.main, p.primary.light, p.secondary.main, p.secondary.light].map((c, i) => (
                        <Box key={i} sx={{ width: 20, height: 20, borderRadius: 1, bgcolor: c }} />
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ThemeSwitcherDialog
