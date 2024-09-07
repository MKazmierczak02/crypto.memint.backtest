import datetime

from celery import shared_task

from ..handlers import MovingAverageCrossoverStrategy
from ..models import PriceData, Simulation


@shared_task
def analyze_market_data(simulation_id: int):
    simulation = Simulation.objects.get(id=simulation_id)
    simulation_task = MovingAverageCrossoverStrategy(simulation)
    # simulation.status = "Running"
    # simulation.save()

    simulation_task.run()

    # simulation.end_date = datetime.datetime.now()
    # simulation.status = "Finished"
    # simulation.save()
