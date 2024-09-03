import time

from simulator.models import Simulation


class SimulationTask:
    def __init__(self, simulation: Simulation, market_data: list):
        self.id = simulation.id
        self._simulation = simulation
        self._market_data = market_data

    def run(self):
        for data in self._market_data:
            print(f"Next step for: {data}")
            time.sleep(1)
        print("Simulation is stopped.")
