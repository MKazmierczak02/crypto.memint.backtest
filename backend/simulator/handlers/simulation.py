import threading
import time


class SimulationThread(threading.Thread):
    def __init__(self, id, simulation_details):
        super().__init__()
        self.id = id
        self.simulation_details = simulation_details
        self._stop_simulation = threading.Event()
        self.counter = 0

    def stop(self):
        self._stop_simulation.set()

    def stopped(self):
        return self._stop_simulation.is_set()

    def run(self):
        while not self.stopped():
            print(f"Thread is running... {self.counter}")
            self.counter += 1
            for condition in self.simulation_details["buy_conditions"]:
                print(condition["name"])
            time.sleep(1)
        print("Thread is stopped.")
