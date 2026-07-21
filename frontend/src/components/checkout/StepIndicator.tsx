interface Props {
  currentStep: number
}

const steps = [
  { num: 1, label: 'Address' },
  { num: 2, label: 'Payment' },
  { num: 3, label: 'Review' },
]

const StepIndicator = ({ currentStep }: Props) => {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              currentStep > step.num ? 'bg-green-500 text-white' :
              currentStep === step.num ? 'bg-indigo-600 text-white' :
              'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step.num ? '✓' : step.num}
            </div>
            <span className={`text-xs mt-1 font-medium ${currentStep === step.num ? 'text-indigo-600' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${currentStep > step.num ? 'bg-green-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
