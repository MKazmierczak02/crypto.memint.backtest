from celery import shared_task

from simulator.models import Simulation


@shared_task
def analyze_market_data(simulation_id: int):
    simulation = Simulation.objects.get(id=simulation_id)
    simulation.run()
