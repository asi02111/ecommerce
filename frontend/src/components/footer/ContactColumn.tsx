import { Box, Typography } from '@mui/material'
import { contactInfo } from '../../data/footerLinks'

const ContactColumn = () => (
  <Box>
    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14, mb: 2 }}>
      Contact Us
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
      {contactInfo.map((item, i) => (
        <Box key={i} sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'flex-start' }}>
          <Typography sx={{ fontSize: 14, mt: 0.1 }}>{item.icon}</Typography>
          <Typography sx={{ fontSize: 13, color: 'grey.400', lineHeight: 1.5 }}>
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

export default ContactColumn
