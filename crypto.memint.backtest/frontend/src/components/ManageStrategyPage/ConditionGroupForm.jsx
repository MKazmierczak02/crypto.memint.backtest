import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ConditionForm from './ConditionForm';
import ActionSelector from './ActionSelector';

const ConditionGroupForm = ({
  index,
  conditionGroup,
  availableIndicators,
  availableActions,
  availableOperandTypes,
  updateConditionGroup,
  removeConditionGroup,
}) => {
  const [group, setGroup] = useState(conditionGroup);

  const handleActionChange = (action) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      action,
    }));
    updateConditionGroup(index, {
      ...group,
      action,
    });
  };

  const addCondition = () => {
    const newCondition = {
      id: Date.now(),
      left_operand: null,
      operator: 'GT',
      right_operand: null,
      logical_operator: 'AND',
      order: group.conditions.length,
    };
    const updatedConditions = [...group.conditions, newCondition];
    setGroup((prevGroup) => ({
      ...prevGroup,
      conditions: updatedConditions,
    }));
    updateConditionGroup(index, {
      ...group,
      conditions: updatedConditions,
    });
  };

  const updateCondition = (condIndex, updatedCondition) => {
    const updatedConditions = [...group.conditions];
    updatedConditions[condIndex] = updatedCondition;
    setGroup((prevGroup) => ({
      ...prevGroup,
      conditions: updatedConditions,
    }));
    updateConditionGroup(index, {
      ...group,
      conditions: updatedConditions,
    });
  };

  const removeCondition = (condIndex) => {
    const updatedConditions = [...group.conditions];
    updatedConditions.splice(condIndex, 1);
    setGroup((prevGroup) => ({
      ...prevGroup,
      conditions: updatedConditions,
    }));
    updateConditionGroup(index, {
      ...group,
      conditions: updatedConditions,
    });
  };

  return (
    <Accordion sx={{ mb: 2, backgroundColor: "rgba(0,0,0,0.8)" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`group${index}-content`}
        id={`group${index}-header`}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Condition group {index + 1}</Typography>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              removeConditionGroup(index);
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <ActionSelector
          action={group.action}
          availableActions={availableActions}
          handleActionChange={handleActionChange}
        />

        {group.conditions.map((condition, condIndex) => (
          <ConditionForm
            key={condition.id || condIndex}
            index={condIndex}
            condition={condition}
            availableIndicators={availableIndicators}
            availableOperandTypes={availableOperandTypes}
            updateCondition={(updatedCondition) => updateCondition(condIndex, updatedCondition)}
            removeCondition={() => removeCondition(condIndex)}
          />
        ))}

        <Button
          variant="outlined"
          color="secondary"
          onClick={addCondition}
          sx={{ mt: 2 }}
        >
          Add Condition
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default ConditionGroupForm;
