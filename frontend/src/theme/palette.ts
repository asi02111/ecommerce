// // এই ফাইলে ৬টা theme এর সব color রাখা হয়েছে।
// // নতুন theme যোগ করতে চাইলে শুধু এখানে একটা entry বাড়ালেই হবে —
// // বাকি সব জায়গায় automatic reflect হবে।

// export type ThemeId =
//   | 'arcticBlue'
//   | 'emeraldMint'
//   | 'obsidianBlack'
//   | 'coralNavy'
//   | 'royalPurple'
//   | 'coffeeCream'

// export interface ThemePalette {
//   id: ThemeId
//   name: string
//   tagline: string
//   emoji: string
//   primary: {
//     main:  string
//     light: string
//     dark:  string
//   }
//   secondary: {
//     main:  string
//     light: string
//     dark:  string
//   }
//   background: {
//     default: string
//     paper:   string
//   }
//   text: {
//     primary:   string
//     secondary: string
//   }
//   // Navbar/hero এর মতো জায়গায় gradient দেখানোর জন্য
//   gradient: string
// }

// export const palettes: Record<ThemeId, ThemePalette> = {
//   arcticBlue: {
//     id: 'arcticBlue',
//     name: 'Arctic Blue',
//     tagline: 'Modern & Clean',
//     emoji: '❄️',
//     primary:   { main: '#0D47A1', light: '#1976D2', dark: '#082F63' },
//     secondary: { main: '#42A5F5', light: '#90CAF9', dark: '#1E88E5' },
//     background:{ default: '#F8FAFC', paper: '#FFFFFF' },
//     text:      { primary: '#111827', secondary: '#5B6472' },
//     gradient: 'linear-gradient(135deg,#0D47A1,#1976D2)',
//   },
//   emeraldMint: {
//     id: 'emeraldMint',
//     name: 'Emerald Mint',
//     tagline: 'Fresh & Natural',
//     emoji: '🌿',
//     primary:   { main: '#15803D', light: '#22C55E', dark: '#0F5C2C' },
//     secondary: { main: '#86EFAC', light: '#BBF7D0', dark: '#4ADE80' },
//     background:{ default: '#F0FDF4', paper: '#FFFFFF' },
//     text:      { primary: '#14241C', secondary: '#57685F' },
//     gradient: 'linear-gradient(135deg,#15803D,#22C55E)',
//   },
//   obsidianBlack: {
//     id: 'obsidianBlack',
//     name: 'Obsidian Black',
//     tagline: 'Luxury & Premium',
//     emoji: '👑',
//     primary:   { main: '#0B0B0B', light: '#1A1A1A', dark: '#000000' },
//     secondary: { main: '#D4AF37', light: '#F5E6C8', dark: '#B8952E' },
//     background:{ default: '#FAFAFA', paper: '#FFFFFF' },
//     text:      { primary: '#0B0B0B', secondary: '#5C5C5C' },
//     gradient: 'linear-gradient(135deg,#0B0B0B,#2A2A2A)',
//   },
//   coralNavy: {
//     id: 'coralNavy',
//     name: 'Coral Navy',
//     tagline: 'Vibrant & Energetic',
//     emoji: '⚡',
//     primary:   { main: '#FF6B6B', light: '#FF8E8E', dark: '#E24C4C' },
//     secondary: { main: '#1E293B', light: '#334155', dark: '#0F172A' },
//     background:{ default: '#FFF7F5', paper: '#FFFFFF' },
//     text:      { primary: '#1E293B', secondary: '#64748B' },
//     gradient: 'linear-gradient(135deg,#FF6B6B,#FF8E53)',
//   },
//   royalPurple: {
//     id: 'royalPurple',
//     name: 'Royal Purple',
//     tagline: 'Tech & Futuristic',
//     emoji: '💜',
//     primary:   { main: '#4F46E5', light: '#7C3AED', dark: '#3730A3' },
//     secondary: { main: '#A78BFA', light: '#C4B5FD', dark: '#8B5CF6' },
//     background:{ default: '#F5F3FF', paper: '#FFFFFF' },
//     text:      { primary: '#1E1B4B', secondary: '#5B5474' },
//     gradient: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
//   },
//   coffeeCream: {
//     id: 'coffeeCream',
//     name: 'Coffee Cream',
//     tagline: 'Warm & Cozy',
//     emoji: '☕',
//     primary:   { main: '#6F4E37', light: '#A67C52', dark: '#4E3626' },
//     secondary: { main: '#EAD8C8', light: '#F5EBE0', dark: '#D4B896' },
//     background:{ default: '#FDFBF9', paper: '#FFFFFF' },
//     text:      { primary: '#3E2C1C', secondary: '#7A6A5C' },
//     gradient: 'linear-gradient(135deg,#6F4E37,#A67C52)',
//   },
// }

// export const paletteList = Object.values(palettes)



// এই ফাইলে ৬টা theme এর সব color রাখা হয়েছে — reference image এর exact hex code অনুযায়ী।
// নতুন theme যোগ করতে চাইলে শুধু এখানে একটা entry বাড়ালেই হবে —
// বাকি সব জায়গায় automatic reflect হবে।

export type ThemeId =
  | 'arcticBlue'
  | 'emeraldMint'
  | 'obsidianBlack'
  | 'coralNavy'
  | 'royalPurple'
  | 'coffeeCream'

export interface ThemePalette {
  id: ThemeId
  name: string
  tagline: string
  emoji: string
  primary: {
    main:  string
    light: string
    dark:  string
  }
  secondary: {
    main:  string
    light: string
    dark:  string
  }
  background: {
    default: string
    paper:   string
  }
  text: {
    primary:   string
    secondary: string
  }
  gradient: string
  // Dialog preview এ ৬টা swatch দেখানোর জন্য — image এর reference strip
  swatches: string[]
}

export const palettes: Record<ThemeId, ThemePalette> = {
  arcticBlue: {
    id: 'arcticBlue',
    name: 'Arctic Blue',
    tagline: 'Modern & Clean',
    emoji: '❄️',
    primary:   { main: '#0D47A1', light: '#1976D2', dark: '#082F63' },
    secondary: { main: '#42A5F5', light: '#90CAF9', dark: '#1E88E5' },
    background:{ default: '#F8FAFC', paper: '#FFFFFF' },
    text:      { primary: '#111827', secondary: '#5B6472' },
    gradient: 'linear-gradient(135deg,#0D47A1,#1976D2)',
    swatches: ['#0D47A1', '#1976D2', '#42A5F5', '#E3F2FD', '#F8FAFC', '#111827'],
  },
  emeraldMint: {
    id: 'emeraldMint',
    name: 'Emerald Mint',
    tagline: 'Fresh & Natural',
    emoji: '🌿',
    primary:   { main: '#15803D', light: '#22C55E', dark: '#0F5C2C' },
    secondary: { main: '#86EFAC', light: '#BBF7D0', dark: '#4ADE80' },
    background:{ default: '#F0FDF4', paper: '#F8FAF7' },
    text:      { primary: '#1F2937', secondary: '#57685F' },
    gradient: 'linear-gradient(135deg,#15803D,#22C55E)',
    swatches: ['#15803D', '#22C55E', '#86EFAC', '#F0FDF4', '#F8FAF7', '#1F2937'],
  },
  obsidianBlack: {
    id: 'obsidianBlack',
    name: 'Obsidian Black',
    tagline: 'Luxury & Premium',
    emoji: '👑',
    primary:   { main: '#0B0B0B', light: '#1A1A1A', dark: '#000000' },
    secondary: { main: '#D4AF37', light: '#F5E6C8', dark: '#B8952E' },
    background:{ default: '#FAFAFA', paper: '#FFFFFF' },
    text:      { primary: '#0B0B0B', secondary: '#9CA3AF' },
    gradient: 'linear-gradient(135deg,#0B0B0B,#1A1A1A)',
    swatches: ['#0B0B0B', '#1A1A1A', '#D4AF37', '#F5E6C8', '#FFFFFF', '#9CA3AF'],
  },
  coralNavy: {
    id: 'coralNavy',
    name: 'Coral Navy',
    tagline: 'Vibrant & Energetic',
    emoji: '⚡',
    primary:   { main: '#FF6B6B', light: '#FF8E53', dark: '#E24C4C' },
    secondary: { main: '#1E293B', light: '#334155', dark: '#0F172A' },
    background:{ default: '#F8FAFC', paper: '#F1F5F9' },
    text:      { primary: '#0F172A', secondary: '#64748B' },
    gradient: 'linear-gradient(135deg,#FF6B6B,#FF8E53)',
    swatches: ['#FF6B6B', '#FF8E53', '#1E293B', '#F8FAFC', '#F1F5F9', '#0F172A'],
  },
  royalPurple: {
    id: 'royalPurple',
    name: 'Royal Purple',
    tagline: 'Tech & Futuristic',
    emoji: '💜',
    primary:   { main: '#4F46E5', light: '#7C3AED', dark: '#3730A3' },
    secondary: { main: '#A78BFA', light: '#C4B5FD', dark: '#8B5CF6' },
    background:{ default: '#F5F3FF', paper: '#FFFFFF' },
    text:      { primary: '#1E1B4B', secondary: '#5B5474' },
    gradient: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
    swatches: ['#4F46E5', '#7C3AED', '#A78BFA', '#F5F3FF', '#FFFFFF', '#1E1B4B'],
  },
  coffeeCream: {
    id: 'coffeeCream',
    name: 'Coffee Cream',
    tagline: 'Warm & Cozy',
    emoji: '☕',
    primary:   { main: '#6F4E37', light: '#A67C52', dark: '#4E3626' },
    secondary: { main: '#EAD8C8', light: '#F5EBE0', dark: '#D4B896' },
    background:{ default: '#FAF7F2', paper: '#FFFFFF' },
    text:      { primary: '#3E2C1C', secondary: '#7A6A5C' },
    gradient: 'linear-gradient(135deg,#6F4E37,#A67C52)',
    swatches: ['#6F4E37', '#A67C52', '#EAD8C8', '#FAF7F2', '#FFFFFF', '#3E2C1C'],
  },
}

export const paletteList = Object.values(palettes)
