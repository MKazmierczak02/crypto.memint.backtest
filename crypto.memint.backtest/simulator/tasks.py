import datetime

from celery import shared_task

from .handlers import SimulationTask
from .models import Simulation, Symbol


def get_market_data(symbol: Symbol):
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 4, 5, 6, 3, 2, 1]


@shared_task
def analyze_market_data(simulation_id: int):
    simulation = Simulation.objects.get(id=simulation_id)
    market_data = get_market_data(simulation.symbol)

    simulation_task = SimulationTask(simulation, market_data)
    simulation.status = "Running"
    simulation.save()

    simulation_task.run()

    simulation.end_date = datetime.datetime.now()
    simulation.status = "Finished"
    simulation.save()
