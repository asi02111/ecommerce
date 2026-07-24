import { createTheme, type Theme } from '@mui/material/styles'
import { palettes, type ThemeId } from './palette'

// একটা palette কে পুরো MUI Theme এ convert করে —
// component defaults (radius, shadow, textTransform) সব একবারই এখানে সেট করা,
// তাই প্রতিটা component আলাদা করে style লিখতে হয় না।
export const buildMuiTheme = (id: ThemeId): Theme => {
  const p = palettes[id]

  return createTheme({
    palette: {
      mode: 'light',
      primary:   { main: p.primary.main,   light: p.primary.light,   dark: p.primary.dark   },
      secondary: { main: p.secondary.main, light: p.secondary.light, dark: p.secondary.dark },
      background:{ default: p.background.default, paper: p.background.paper },
      text:      { primary: p.text.primary, secondary: p.text.secondary },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 14 },
        },
      },
    },
  })
}

// প্রতিটা theme একবারই বানিয়ে cache করে রাখা — বারবার createTheme() কল করা এড়াতে
const themeCache = {} as Record<ThemeId, Theme>
export const getMuiTheme = (id: ThemeId): Theme => {
  if (!themeCache[id]) themeCache[id] = buildMuiTheme(id)
  return themeCache[id]
}
