import { Box, Checkbox, Typography } from "@mui/material";

export default function PermissionTable({ name, state, disabled, initialCreate, initialUpdate, initialRemove, setState }) {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <Typography>{name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '40px', marginLeft: 'auto' }}>
        {/* create */}
        <Checkbox
          checked={state[name].create}
          disabled={disabled}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [name]: { ...prev[name], create: e.target.checked } }))
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {/* update */}
        <Checkbox
          checked={state[name].update}
          disabled={disabled}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [name]: { ...prev[name], update: e.target.checked } }))
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {/* delete */}
        <Checkbox
          checked={state[name].delete}
          disabled={disabled}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [name]: { ...prev[name], delete: e.target.checked } }))
          }
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
    </Box>
  );
}
