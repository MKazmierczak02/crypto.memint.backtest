import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import IndicatorSelector from './IndicatorSelector';

const ConditionForm = ({
  index,
  condition,
  availableIndicators,
  availableOperandTypes,
  updateCondition,
  removeCondition,
}) => {
  const handleOperandChange = (side, field, value) => {
    const operand = condition[side] || {};
    let updatedOperand;
    if (field === 'operand_type') {
      updatedOperand = {
        operand_type: value,
        indicator: null,
        constant_value: null,
      };
    } else if (field === 'indicator' || field === 'constant_value') {
      updatedOperand = {
        ...operand,
        [field]: value,
      };
    } else {
      updatedOperand = value;
    }

    const updatedCondition = {
      ...condition,
      [side]: updatedOperand,
    };
    updateCondition(updatedCondition);
  };

  const renderOperandSelector = (side, operand) => {
    const operandType = operand?.operand_type || '';

    return (
      <>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Operand Type</InputLabel>
          <Select
            value={operandType}
            onChange={(e) => handleOperandChange(side, 'operand_type', e.target.value)}
            label="Operand Type"
          >
            {availableOperandTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {operandType === 'indicator' && (
          <IndicatorSelector
            operand={operand}
            handleOperandChange={(field, value) => handleOperandChange(side, field, value)}
            availableIndicators={availableIndicators}
          />
        )}

        {operandType === 'constant' && (
          <TextField
            label="Constant Value"
            type="number"
            value={operand.constant_value || ''}
            onChange={(e) =>
              handleOperandChange(side, 'constant_value', Number(e.target.value))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        )}

        {(operandType === 'current_price' || operandType === 'profit') && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {operandType === 'current_price' ? 'Current Price' : 'Profit'}
          </Typography>
        )}
      </>
    );
  };

  return (
    <Accordion sx={{ mb: 2, backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`condition${index}-content`}
        id={`condition${index}-header`}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle1">Condition {index + 1}</Typography>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              removeCondition();
            }}
            sx={{ color: 'error.main' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
          Left Operand
        </Typography>
        {renderOperandSelector('left_operand', condition.left_operand)}

        <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
          Operator
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Operator</InputLabel>
          <Select
            value={condition.operator}
            onChange={(e) =>
              updateCondition({ ...condition, operator: e.target.value })
            }
            label="Operator"
          >
            <MenuItem value="GT">{'>'}</MenuItem>
            <MenuItem value="LT">{'<'}</MenuItem>
            <MenuItem value="EQ">{'=='}</MenuItem>
            <MenuItem value="GTE">{'>='}</MenuItem>
            <MenuItem value="LTE">{'<='}</MenuItem>
            <MenuItem value="NEQ">{'!='}</MenuItem>
            <MenuItem value="XAB">Crosses Above</MenuItem>
            <MenuItem value="XBE">Crosses Below</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
          Right Operand
        </Typography>
        {renderOperandSelector('right_operand', condition.right_operand)}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Logical Operator</InputLabel>
          <Select
            value={condition.logical_operator}
            onChange={(e) =>
              updateCondition({ ...condition, logical_operator: e.target.value })
            }
            label="Logical Operator"
          >
            <MenuItem value="AND">AND</MenuItem>
            <MenuItem value="OR">OR</MenuItem>
            <MenuItem value="NONE">NONE</MenuItem>
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default ConditionForm;
