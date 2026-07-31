import { useState, useEffect, useCallback } from 'react'
import { heroSlides } from '../data/heroSlides'

// Slide switching এর সব logic এক জায়গায় — component শুধু UI render করে
export const useHeroSlider = (intervalMs = 4000) => {
  const [current,   setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => {
      if (index === prev) return prev
      setAnimating(true)
      setTimeout(() => setAnimating(false), 500)
      return index
    })
  }, [])

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, intervalMs)
    return () => clearInterval(timer)
  }, [next, intervalMs])

  return {
    slide: heroSlides[current],
    current,
    animating,
    goTo,
    next,
    prev,
    total: heroSlides.length,
  }
}
