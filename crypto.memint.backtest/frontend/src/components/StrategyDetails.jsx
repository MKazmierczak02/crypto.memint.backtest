import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  Chip,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const StrategyDetails = ({ strategy }) => {
  const [currentStrategy, setCurrentStrategy] = React.useState(_.cloneDeep(strategy));
  const navigate = useNavigate();

  return (
    <Card sx={{ mt: 4, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <CardHeader
        title={
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {currentStrategy.name}
          </Typography>
        }
        action={
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(`simulate`);
              }}
              startIcon={<PlayArrowIcon />}
              sx={{ mr: 2, textTransform: 'none' }}
            >
              Deploy
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate(`edit`);
              }}
              startIcon={<EditIcon />}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
          </Box>
        }
      />
      <CardContent>
        {currentStrategy.description && (
          <Typography variant="subtitle1" sx={{ mb: 4 }}>
            {currentStrategy.description}
          </Typography>
        )}

        {currentStrategy.condition_groups &&
          currentStrategy.condition_groups.map((conditionGroup, groupIndex) => {
            const action = conditionGroup.action;
            const conditions = conditionGroup.conditions;

            return (
              <Paper
                key={conditionGroup.id}
                elevation={3}
                sx={{ mb: 4, p: 2, backgroundColor: 'rgba(0,0,0,0.8)' }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Condition Group {groupIndex + 1}
                  </Typography>
                  <Chip
                    label={`Action: ${action.action_type}`}
                    color={action.action_type === 'BUY' ? 'success' : 'error'}
                    sx={{ fontSize: '1rem' }}
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {conditions &&
                  conditions.map((condition, index) => {
                    const leftOperand = condition.left_operand;
                    const rightOperand = condition.right_operand;
                    const logicalOperator = condition.logical_operator;

                    const renderOperand = (operand) => {
                      switch (operand.operand_type) {
                        case 'indicator':
                          return (
                            <>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {operand.indicator.name}
                              </Typography>
                              {operand.indicator.parameters &&
                                Object.entries(operand.indicator.parameters).map(
                                  ([key, value]) => (
                                    <Typography variant="body2" key={key}>
                                      {key}: {value}
                                    </Typography>
                                  )
                                )}
                            </>
                          );
                        case 'constant':
                          return (
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {operand.constant_value}
                            </Typography>
                          );
                        case 'current_price':
                          return (
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              Current Price
                            </Typography>
                          );
                        case 'profit':
                          return (
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              Profit
                            </Typography>
                          );
                        default:
                          return (
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              Unknown Operand
                            </Typography>
                          );
                      }
                    };

                    return (
                      <Box key={condition.id} sx={{ mb: 2, backgroundColor: 'transparent' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            mb: 1,
                            flexWrap: 'wrap',
                          }}
                        >
                          <Box sx={{ flex: 1, minWidth: 150 }}>
                            {renderOperand(leftOperand)}
                          </Box>

                          <Box sx={{ mx: 2 }}>
                            <Chip
                              label={condition.operator}
                              color="primary"
                              sx={{ fontSize: '1rem' }}
                            />
                          </Box>

                          <Box sx={{ flex: 1, minWidth: 150 }}>
                            {renderOperand(rightOperand)}
                          </Box>
                        </Box>

                        {logicalOperator &&
                          logicalOperator !== 'NONE' &&
                          index < conditions.length - 1 && (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 1,
                              }}
                            >
                              <Chip
                                label={logicalOperator}
                                color="secondary"
                                sx={{ fontSize: '1rem' }}
                              />
                            </Box>
                          )}

                        {index < conditions.length - 1 && <Divider sx={{ mb: 2 }} />}
                      </Box>
                    );
                  })}
              </Paper>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default StrategyDetails;
