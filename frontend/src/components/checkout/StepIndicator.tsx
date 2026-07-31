import { Stepper, Step, StepLabel, Box } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PaymentOutlinedIcon    from '@mui/icons-material/PaymentOutlined'
import FactCheckOutlinedIcon  from '@mui/icons-material/FactCheckOutlined'

interface Props {
  currentStep: 1 | 2 | 3
}

const steps = [
  { label: 'Address', icon: <LocationOnOutlinedIcon /> },
  { label: 'Payment',  icon: <PaymentOutlinedIcon />    },
  { label: 'Review',   icon: <FactCheckOutlinedIcon />  },
]

const StepIndicator = ({ currentStep }: Props) => (
  <Box sx={{ mb: 4 }}>
    <Stepper activeStep={currentStep - 1} alternativeLabel>
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel icon={step.icon}>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
)

export default StepIndicator
