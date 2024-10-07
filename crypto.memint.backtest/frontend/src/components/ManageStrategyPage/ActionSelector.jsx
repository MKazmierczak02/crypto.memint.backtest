import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const ActionSelector = ({
  action,
  availableActions,
  handleActionChange,
}) => {
  const selectedAction = action ? availableActions.find(a => a.value === action.action_type) : null;
  const actionParameters = selectedAction?.parameters || [];

  const handleActionTypeChange = (value) => {
    const newAction = {
      action_type: value,
      parameters: {},
    };
    handleActionChange(newAction);
  };

  const handleParameterChange = (paramKey, value) => {
    const updatedAction = {
      ...action,
      parameters: {
        ...action.parameters,
        [paramKey]: value,
      },
    };
    handleActionChange(updatedAction);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
        Action
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Action type</InputLabel>
        <Select
          value={action?.action_type || ''}
          onChange={(e) => handleActionTypeChange(e.target.value)}
          label="Typ Akcji"
        >
          {availableActions.map((actionOption) => (
            <MenuItem key={actionOption.value} value={actionOption.value}>
              {actionOption.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {actionParameters.map((paramKey) => (
        <TextField
          key={paramKey}
          label={`Parameter ${paramKey}`}
          value={action.parameters?.[paramKey] || ''}
          onChange={(e) => handleParameterChange(paramKey, e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      ))}
    </Box>
  );
};

export default ActionSelector;
