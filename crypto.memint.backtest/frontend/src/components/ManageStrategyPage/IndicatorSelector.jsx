import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const IndicatorSelector = ({
  operand,
  handleOperandChange,
  availableIndicators,
}) => {
  const selectedIndicator = availableIndicators?.find(
    (ind) => ind.name === operand.indicator?.name
  );

  const handleIndicatorFieldChange = (field, value) => {
    let indicator = operand.indicator || {};
    if (field === 'name') {
      if (value === '') {
        indicator = null;
      } else {
        const selected = availableIndicators.find((ind) => ind.name === value);
        if (selected) {
          indicator = {
            name: selected.name,
            parameters: {},
          };
          selected.parameters.forEach((param) => {
            indicator.parameters[param] = '';
          });
        }
      }
      handleOperandChange('indicator', indicator);
    } else {
      if (indicator) {
        indicator.parameters = {
          ...indicator.parameters,
          [field]: value,
        };
        handleOperandChange('indicator', indicator);
      }
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Indicator</InputLabel>
        <Select
          value={operand.indicator?.name || ''}
          onChange={(e) => handleIndicatorFieldChange('name', e.target.value)}
          label="Indicator"
        >
          {availableIndicators?.map((indicator) => (
            <MenuItem key={indicator.name} value={indicator.name}>
              {indicator.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedIndicator &&
        selectedIndicator.parameters.map((paramKey) => (
          <TextField
            type="number"
            key={paramKey}
            label={`Parameter ${paramKey}`}
            value={operand.indicator?.parameters?.[paramKey] || ''}
            onChange={(e) =>
              handleIndicatorFieldChange(
                paramKey,
                e.target.value === '' ? '' : Number(e.target.value)
              )
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        ))}
    </>
  );
};

export default IndicatorSelector;
