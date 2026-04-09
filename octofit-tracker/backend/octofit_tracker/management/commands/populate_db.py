from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data (delete one by one for Djongo compatibility)
        for model in [Activity, Leaderboard, User, Team, Workout]:
            for obj in model.objects.all():
                if hasattr(obj, 'id') and obj.id:
                    obj.delete()

        # Teams
        marvel = Team.objects.create(name='Team Marvel', universe='Marvel')
        dc = Team.objects.create(name='Team DC', universe='DC')

        # Users
        tony = User.objects.create(email='tony@stark.com', username='IronMan', team=marvel, is_superhero=True)
        steve = User.objects.create(email='steve@rogers.com', username='CaptainAmerica', team=marvel, is_superhero=True)
        bruce = User.objects.create(email='bruce@wayne.com', username='Batman', team=dc, is_superhero=True)
        clark = User.objects.create(email='clark@kent.com', username='Superman', team=dc, is_superhero=True)

        # Workouts
        pushups = Workout.objects.create(name='Pushups', description='Pushups for strength', difficulty='Easy')
        running = Workout.objects.create(name='Running', description='Running for endurance', difficulty='Medium')
        flying = Workout.objects.create(name='Flying', description='Flying workout', difficulty='Hard')

        # Activities
        Activity.objects.create(user=tony, workout=pushups, duration=30, calories=200)
        Activity.objects.create(user=steve, workout=running, duration=45, calories=400)
        Activity.objects.create(user=bruce, workout=pushups, duration=20, calories=150)
        Activity.objects.create(user=clark, workout=flying, duration=60, calories=600)

        # Leaderboard
        Leaderboard.objects.create(user=tony, score=1200, rank=1)
        Leaderboard.objects.create(user=steve, score=1100, rank=2)
        Leaderboard.objects.create(user=clark, score=1050, rank=3)
        Leaderboard.objects.create(user=bruce, score=1000, rank=4)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
