import { Box } from '@mui/material'
import SlideContent  from './SlideContent'
import SlideControls from './SlideControls'
import { useHeroSlider } from '../../hooks/useHeroSlider'

const MainSlide = () => {
  const { slide, current, animating, goTo, next, prev, total } = useHeroSlider()

  return (
    <Box sx={{ position: 'relative', flex: 1, minHeight: 670, borderRadius: 4, overflow: 'hidden' }}>

      {/* Background image */}
      <Box
        component="img"
        src={slide.image}
        alt={slide.title}
        sx={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transition: 'opacity .5s', opacity: animating ? 0 : 1,
        }}
      />

      {/* Overlay */}
      <Box sx={{ position: 'absolute', inset: 0, background: slide.overlay }} />

      <SlideContent slide={slide} animating={animating} />
      <SlideControls total={total} current={current} onGoTo={goTo} onPrev={prev} onNext={next} />
    </Box>
  )
}

export default MainSlide
