// import {
//   Dialog, DialogTitle, DialogContent, IconButton,
//   Box, Typography, Grid, Paper,
// } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close'
// import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// import { paletteList, type ThemeId } from '../../theme/palette'
// import { useAppTheme } from '../../hooks/useStore'

// interface Props {
//   open:    boolean
//   onClose: () => void
// }

// const ThemeSwitcherDialog = ({ open, onClose }: Props) => {
//   const { themeId, setTheme } = useAppTheme()

//   const handlePick = (id: ThemeId) => {
//     setTheme(id)
//     onClose()
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       slotProps={{ paper: { sx: { borderRadius: 4 } } }}
//     >
//       <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Box>
//           <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Choose your theme</Typography>
//           <Typography variant="caption" color="text.secondary">
//             Pick a look for your store — changes apply instantly
//           </Typography>
//         </Box>
//         <IconButton onClick={onClose} size="small">
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent>
//         <Grid container spacing={2}>
//           {paletteList.map((p) => {
//             const isActive = p.id === themeId
//             return (
//               <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
//                 <Paper
//                   onClick={() => handlePick(p.id)}
//                   elevation={0}
//                   sx={{
//                     border: '2px solid',
//                     borderColor: isActive ? p.primary.main : 'divider',
//                     borderRadius: 3,
//                     p: 2,
//                     cursor: 'pointer',
//                     position: 'relative',
//                     transition: '.2s',
//                     '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 28px rgba(0,0,0,.1)' },
//                   }}
//                 >
//                   {isActive && (
//                     <CheckCircleIcon
//                       sx={{ position: 'absolute', top: 10, right: 10, color: p.primary.main, fontSize: 22 }}
//                     />
//                   )}

//                   {/* Header */}
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <Typography sx={{ fontSize: 20 }}>{p.emoji}</Typography>
//                     <Box>
//                       <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{p.name}</Typography>
//                       <Typography variant="caption" color="text.secondary">{p.tagline}</Typography>
//                     </Box>
//                   </Box>

//                   {/* Mini preview strip */}
//                   <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
//                     <Box sx={{ height: 34, background: p.gradient, display: 'flex', alignItems: 'center', px: 1.5 }}>
//                       <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>
//                         Shop<span style={{ color: p.secondary.light }}>BD</span>
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', gap: 0.5, p: 1, bgcolor: p.background.default }}>
//                       {[p.primary.main, p.primary.light, p.secondary.main, p.secondary.light].map((c, i) => (
//                         <Box key={i} sx={{ width: 20, height: 20, borderRadius: 1, bgcolor: c }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </Paper>
//               </Grid>
//             )
//           })}
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default ThemeSwitcherDialog


import {
  Dialog, DialogTitle, DialogContent, IconButton,
  Box, Typography, Grid, Paper, Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'
import { paletteList, type ThemeId, type ThemePalette } from '../../theme/palette'
import { useAppTheme } from '../../hooks/useStore'

interface Props {
  open:    boolean
  onClose: () => void
}

// একটা theme এর জন্য mini ecommerce page preview — navbar + hero + 3 product card
const ThemePreviewCard = ({
  palette, index, isActive, onPick,
}: {
  palette: ThemePalette
  index: number
  isActive: boolean
  onPick: (id: ThemeId) => void
}) => {
  const demoProducts = [
    { badge: 'Sale', name: 'Classic Sneaker', price: '৳2,450' },
    { badge: 'New',  name: 'Urban Backpack',  price: '৳1,950' },
    { badge: 'Hot',  name: 'Smart Watch',     price: '৳4,250' },
  ]
  const badgeColor: Record<string, string> = { Sale: '#EF4444', New: palette.primary.main, Hot: '#F97316' }

  return (
    <Paper
      elevation={0}
      sx={{
        border: '2px solid',
        borderColor: isActive ? palette.primary.main : 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '.2s',
        bgcolor: '#0f1117',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(0,0,0,.18)' },
      }}
      onClick={() => onPick(palette.id)}
    >
      {/* Header — number, name, tagline badge */}
      <Box sx={{ p: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>
            {String(index + 1).padStart(2, '0')}. {palette.name}
          </Typography>
          <Typography sx={{ fontSize: 22 }}>{palette.emoji}</Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-block', mt: 0.75, px: 1, py: 0.3, borderRadius: 1.5,
            bgcolor: palette.primary.main, color: '#fff', fontSize: 10, fontWeight: 700,
          }}
        >
          {palette.tagline}
        </Box>

        {/* Swatch strip */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.6, mt: 1.25 }}>
          {palette.swatches.map((c, i) => (
            <Box key={i} sx={{ width: 26, height: 26, borderRadius: 1, bgcolor: c, border: '1px solid rgba(255,255,255,.1)' }} />
          ))}
        </Box>
      </Box>

      {/* Mini page preview */}
      <Box sx={{ bgcolor: palette.background.paper, mx: 1.5, mb: 1.5, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>

        {/* Mini navbar */}
        <Box
          sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            px: 1.5, py: 1, bgcolor: palette.background.paper, borderBottom: '1px solid',
            borderColor: 'rgba(0,0,0,.06)',
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: 11, color: palette.primary.main }}>
            Shop<span style={{ color: palette.text.primary }}>BD</span>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <SearchIcon sx={{ fontSize: 12, color: palette.text.secondary }} />
            <PersonOutlineIcon sx={{ fontSize: 12, color: palette.text.secondary }} />
            <Box sx={{ position: 'relative' }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 12, color: palette.text.secondary }} />
              <Box sx={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', bgcolor: palette.primary.main, fontSize: 6, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Mini hero */}
        <Box sx={{ px: 1.5, py: 1.5, bgcolor: palette.background.default }}>
          <Typography sx={{ fontSize: 8, fontWeight: 700, color: palette.primary.main, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            New Arrivals
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: palette.text.primary, mt: 0.3, lineHeight: 1.2 }}>
            Summer Collection
          </Typography>
          <Typography sx={{ fontSize: 9, color: palette.text.secondary, mt: 0.4, mb: 1 }}>
            Discover the latest trends
          </Typography>
          <Box
            sx={{
              display: 'inline-block', bgcolor: palette.primary.main, color: '#fff',
              fontSize: 9, fontWeight: 700, px: 1.2, py: 0.5, borderRadius: 1,
            }}
          >
            Shop Now →
          </Box>
        </Box>

        {/* Mini product cards */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.8, p: 1.2, bgcolor: palette.background.paper }}>
          {demoProducts.map((p) => (
            <Box key={p.name} sx={{ flex: 1, bgcolor: palette.background.default, borderRadius: 1.5, p: 0.8, border: '1px solid rgba(0,0,0,.05)' }}>
              <Box
                sx={{
                  fontSize: 7, fontWeight: 700, color: '#fff', bgcolor: badgeColor[p.badge],
                  display: 'inline-block', px: 0.6, borderRadius: 0.5, mb: 0.5,
                }}
              >
                {p.badge}
              </Box>
              <Box sx={{ height: 24, borderRadius: 1, bgcolor: palette.secondary.main, opacity: 0.35, mb: 0.5 }} />
              <Typography sx={{ fontSize: 7.5, fontWeight: 600, color: palette.text.primary, lineHeight: 1.2 }} noWrap>
                {p.name}
              </Typography>
              <Typography sx={{ fontSize: 8, fontWeight: 800, color: palette.primary.main, mt: 0.2 }}>
                {p.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Use theme button */}
      <Button
        fullWidth
        onClick={() => onPick(palette.id)}
        sx={{
          borderRadius: 0, py: 1.1, fontSize: 12.5, fontWeight: 700,
          textTransform: 'none', color: '#fff', bgcolor: palette.primary.main,
          '&:hover': { bgcolor: palette.primary.dark },
        }}
      >
        {isActive ? '✓ Currently Active' : `Use ${palette.name} Theme`}
      </Button>
    </Paper>
  )
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
      maxWidth="lg"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 4, bgcolor: '#0a0c12' } } }}
    >
      <DialogTitle sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 19, color: '#fff' }}>
            Ecommerce Theme Collection ✨
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.5)' }}>
            Beautiful color palettes with live UI previews
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#fff' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: '#0a0c12' }}>
        <Grid container spacing={2}>
          {paletteList.map((p, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <ThemePreviewCard
                palette={p}
                index={i}
                isActive={p.id === themeId}
                onPick={handlePick}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ThemeSwitcherDialog