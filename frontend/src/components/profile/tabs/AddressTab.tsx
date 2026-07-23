import { Box, Paper, Typography, Button, Chip, Stack, IconButton, Tooltip } from '@mui/material'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined'

interface Address {
  id: number
  label: string
  icon: React.ReactNode
  name: string
  line1: string
  line2: string
  phone: string
  isDefault: boolean
}

const mockAddresses: Address[] = [
  {
    id: 1, label: 'Home', icon: <HomeOutlinedIcon />,
    name: 'Rahim Khan', line1: 'House 12, Road 5, Gulshan-1', line2: 'Dhaka, Dhaka Division — 1212',
    phone: '01700-000000', isDefault: true,
  },
  {
    id: 2, label: 'Office', icon: <WorkOutlineIcon />,
    name: 'Rahim Khan', line1: 'Level 8, Rupayan Center, Mohakhali', line2: 'Dhaka, Dhaka Division — 1206',
    phone: '01700-000000', isDefault: false,
  },
]

const AddressTab = () => (
  <Box>
    <Stack sx={{ direction: "row", alignItems: "center", justifyContent: "space-between", mb: 2.5 }} >
      <Typography sx={{ fontWeight: 800, fontSize: 16 }}>Saved Addresses</Typography>
      <Button
        variant="contained"
        size="small"
        startIcon={<AddLocationAltOutlinedIcon />}
        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
      >
        Add New
      </Button>
    </Stack>

    <Stack spacing={2}>
      {mockAddresses.map((addr) => (
        <Paper
          key={addr.id}
          elevation={0}
          sx={{
            border: '1.5px solid',
            borderColor: addr.isDefault ? 'primary.200' : 'divider',
            borderRadius: 3,
            p: 2.5,
            bgcolor: addr.isDefault ? 'primary.50' : 'background.paper',
            transition: '.2s',
            '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,.07)' },
          }}
        >
          <Stack sx={{ direction: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
            <Stack sx={{ direction: "row", spacing: 1.5, alignItems: "flex-start" }}>
              <Box sx={{ color: addr.isDefault ? 'primary.main' : 'text.secondary', mt: 0.3 }}>
                {addr.icon}
              </Box>
              <Box>
                <Stack sx={{ direction: "row", spacing: 1, alignItems: "center", mb: 0.5 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{addr.label}</Typography>
                  {addr.isDefault && <Chip label="Default" color="primary" size="small" sx={{ height: 20, fontSize: 11 }} />}
                </Stack>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>{addr.name}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>{addr.line1}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>{addr.line2}</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>📞 {addr.phone}</Typography>
              </Box>
            </Stack>

            <Stack sx={{ direction: "row", spacing: 0.5 }}>
              <Tooltip title="Edit">
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'primary.50' } }}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              {!addr.isDefault && (
                <Tooltip title="Delete">
                  <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'error.50' } }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>

          {!addr.isDefault && (
            <Button size="small" variant="text" sx={{ mt: 1.5, borderRadius: 2, textTransform: 'none', fontSize: 12, p: '2px 10px' }}>
              Set as Default
            </Button>
          )}
        </Paper>
      ))}

      {/* Add new dashed button */}
      <Paper
        elevation={0}
        onClick={() => { }}
        sx={{
          border: '2px dashed', borderColor: 'divider', borderRadius: 3, p: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          cursor: 'pointer', transition: '.2s',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
        }}
      >
        <AddLocationAltOutlinedIcon sx={{ color: 'text.disabled', fontSize: 32 }} />
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>Add a new address</Typography>
      </Paper>
    </Stack>
  </Box>
)

export default AddressTab
