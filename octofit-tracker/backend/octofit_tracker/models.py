from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    universe = models.CharField(max_length=50)  # e.g. Marvel, DC
    class Meta:
        db_table = 'teams'
    def __str__(self):
        return self.name

class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members')
    is_superhero = models.BooleanField(default=True)
    class Meta:
        db_table = 'users'
    def __str__(self):
        return self.username

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    class Meta:
        db_table = 'workouts'
    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField(help_text='Duration in minutes')
    calories = models.IntegerField()
    class Meta:
        db_table = 'activities'
    def __str__(self):
        return f"{self.user} - {self.workout} - {self.date}"

class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    rank = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'
    def __str__(self):
        return f"{self.user} - {self.score}"
