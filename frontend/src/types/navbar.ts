export interface NavLink {
  label: string
  href:  string
}

export interface Category {
  label: string
  href:  string
  subcategories: NavLink[]
}
