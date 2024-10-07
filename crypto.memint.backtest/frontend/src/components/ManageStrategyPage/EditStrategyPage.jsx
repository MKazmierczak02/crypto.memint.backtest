import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Button,
  TextField,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import ConditionGroupForm from './ConditionGroupForm';
import { fetchActions, fetchIndicators, fetchOperandTypes } from './utils';

const EditStrategyPage = ({ strategy, onUpdate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [conditionGroups, setConditionGroups] = useState([]);
  const [availableIndicators, setAvailableIndicators] = useState([]);
  const [availableActions, setAvailableActions] = useState([]);
  const [availableOperandTypes, setAvailableOperandTypes] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Informations', 'Conditions', 'Summary'];

  useEffect(() => {
    if (strategy) {
      setName(strategy.name);
      setDescription(strategy.description);
      setConditionGroups(_.cloneDeep(strategy.condition_groups) || []);
    }
  }, [strategy]);

  useEffect(() => {
    fetchIndicators(setAvailableIndicators);
    fetchActions(setAvailableActions);
    fetchOperandTypes(setAvailableOperandTypes);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    const updatedStrategy = {
      ...strategy,
      name,
      description,
      condition_groups: conditionGroups,
    };
    onUpdate(updatedStrategy);
  };

  const addConditionGroup = () => {
    const newGroup = {
      id: Date.now(),
      action: null,
      conditions: [],
      order: conditionGroups.length,
    };
    setConditionGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const updateConditionGroup = (index, updatedGroup) => {
    setConditionGroups((prevGroups) => {
      const newGroups = [...prevGroups];
      newGroups[index] = updatedGroup;
      return newGroups;
    });
  };

  const removeConditionGroup = (index) => {
    setConditionGroups((prevGroups) => {
      const newGroups = [...prevGroups];
      newGroups.splice(index, 1);
      return newGroups;
    });
  };

  const resetState = () => {
    if (strategy) {
      setName(strategy.name);
      setDescription(strategy.description);
      setConditionGroups(_.cloneDeep(strategy.condition_groups) || []);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {strategy ? 'Edit Strategy' : 'Create Strategy'}
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <>
          <TextField
            label="Strategy Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 4 }}
          />
        </>
      )}

      {activeStep === 1 && (
        <>
          {conditionGroups.map((group, index) => (
            <ConditionGroupForm
              key={group.id || index}
              index={index}
              conditionGroup={group}
              availableIndicators={availableIndicators}
              availableActions={availableActions}
              availableOperandTypes={availableOperandTypes}
              updateConditionGroup={updateConditionGroup}
              removeConditionGroup={removeConditionGroup}
            />
          ))}

          <Button
            variant="outlined"
            color="secondary"
            onClick={addConditionGroup}
            sx={{ mt: 2 }}
          >
            Add Condition Group
          </Button>
        </>
      )}

      {activeStep === 2 && (
        <>
          <Typography variant="h6">Summary</Typography>
          <Typography><strong>Name:</strong> {name}</Typography>
          <Typography><strong>Description:</strong> {description}</Typography>
          <Typography><strong>Condition groups count:</strong> {conditionGroups.length}</Typography>
        </>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="contained" color="primary">
            Previous
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        ) : (
          <Box>
            <Button onClick={resetState} variant="contained" color="secondary" sx={{ mr: 2 }}>
              Reset
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditStrategyPage;
