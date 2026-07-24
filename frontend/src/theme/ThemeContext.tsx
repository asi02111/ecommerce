import { createContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { getMuiTheme } from '../theme/muiThemes'
import { palettes, type ThemeId, type ThemePalette } from '../theme/palette'

const STORAGE_KEY = 'shopbd-theme'

interface AppThemeContextType {
  themeId:  ThemeId
  palette:  ThemePalette
  setTheme: (id: ThemeId) => void
}

export const AppThemeContext = createContext<AppThemeContextType | null>(null)

const getInitialTheme = (): ThemeId => {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null
  return saved && palettes[saved] ? saved : 'arcticBlue'
}

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeId, setThemeId] = useState<ThemeId>(getInitialTheme)

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }, [])

  // theme বদলালে তবেই নতুন MUI theme বানাও — প্রতি render এ না
  const muiTheme = useMemo(() => getMuiTheme(themeId), [themeId])

  return (
    <AppThemeContext.Provider value={{ themeId, palette: palettes[themeId], setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppThemeContext.Provider>
  )
}
