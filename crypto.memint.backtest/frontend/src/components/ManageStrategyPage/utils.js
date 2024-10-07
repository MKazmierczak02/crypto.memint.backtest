export const fetchIndicators = async (setAvailableIndicators) => {
      try {
        const response = await fetch('/api/simulator/technical-indicators/');
        const data = await response.json();
        const indicatorsArray = Object.keys(data).map((key) => ({
          name: key,
          parameters: data[key],
        }));
        setAvailableIndicators(indicatorsArray);
      } catch (error) {
        console.error('Error fetching indicators:', error);
      }
    };

export const fetchActions = async (setAvailableActions) => {
      try {
        const response = await fetch('/api/simulator/actions/');
        const data = await response.json();
        setAvailableActions(data);
      } catch (error) {
        console.error('Error fetching indicators:', error);
      }
    };

export const fetchOperandTypes = async (setAvailableOperands) => {
      try {
        const response = await fetch('/api/simulator/operand-types/');
        const data = await response.json();
        setAvailableOperands(data);
      } catch (error) {
        console.error('Error fetching indicators:', error);
      }
    };

