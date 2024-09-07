from .base import SimulationHandler


class MovingAverageCrossoverStrategy(SimulationHandler):
    def run(self):
        pass

    def check_conditions(self, data):
        pass

    def execute_trade(self, data):
        print(f"Executing trade at {data.timestamp}")
