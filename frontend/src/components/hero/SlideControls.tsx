import { Box, IconButton } from '@mui/material'
import ChevronLeftIcon  from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface Props {
  total:   number
  current: number
  onGoTo:  (i: number) => void
  onPrev:  () => void
  onNext:  () => void
}

const SlideControls = ({ total, current, onGoTo, onPrev, onNext }: Props) => (
  <>
    {/* Dots */}
    <Box sx={{ position: 'absolute', bottom: 20, left: { xs: 24, md: 40 }, zIndex: 3, display: 'flex', flexDirection: 'row', gap: 0.8 }}>
      {Array.from({ length: total }, (_, i) => (
        <Box
          key={i}
          onClick={() => onGoTo(i)}
          sx={{
            width:  i === current ? 24 : 8,
            height: 8,
            borderRadius: 4,
            bgcolor: i === current ? '#fff' : 'rgba(255,255,255,.4)',
            cursor: 'pointer',
            transition: '.3s',
            '&:hover': { bgcolor: 'rgba(255,255,255,.7)' },
          }}
        />
      ))}
    </Box>

    {/* Arrows */}
    <IconButton
      onClick={onPrev}
      sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 3, bgcolor: 'rgba(0,0,0,.3)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,.5)' } }}
    >
      <ChevronLeftIcon />
    </IconButton>
    <IconButton
      onClick={onNext}
      sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 3, bgcolor: 'rgba(0,0,0,.3)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,.5)' } }}
    >
      <ChevronRightIcon />
    </IconButton>
  </>
)

export default SlideControls
