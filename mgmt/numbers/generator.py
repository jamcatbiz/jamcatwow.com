import argparse, random, json, boto3
from solver import solve_game
from datetime import datetime, timedelta

small_numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13]
small_counts = [3,4]
big_numbers = [23,25,46,50,68,75,84,97,100]
answer_numbers = list(range(111, 1001))

def save_game(goal_numbers, play_numbers, solutions, dt, save_local=False, save_s3=False):
  data = {
    'goalNumbers': goal_numbers,
    'playNumbers': play_numbers,
    'solutions': solutions,
    'date': dt.strftime('%Y-%m-%d'),
    'gameNumber': 123,
  }
  if save_local:
    local_path = f'./{dt.strftime('%Y-%m-%d')}.json'
    with open(local_path, 'w') as f:
      json.dump(data, f)
  if save_s3:
    s3_bucket = 'jamcatwow.com.games'
    s3_path = f'numbers/days/{dt.strftime('%Y-%m-%d')}.json'
    s3 = boto3.resource('s3')
    s3.Object(s3_bucket, s3_path).put(Body=(bytes(json.dumps(data).encode('UTF-8'))))


def validate_solutions(solutions):
  # filtered_solutions = []
  # for solution in solutions:
  #   if len(solution) < 4 or len(solution) > 7:
  #     continue
  #   filtered_solutions.append(solution)
  # if len(filtered_solutions) < 1 or len(filtered_solutions) > 3:
  #   return False
  return True


def generate_games(n: int, start_date: str):

  dt = datetime.strptime(start_date,"%Y-%m-%d")
  i = 0

  while i < n:
    small_count = random.choice(small_counts)

    play_numbers = []
    for _ in range(small_count):
      play_numbers.append(random.choice(small_numbers))
    for _ in range(6 - small_count):
      play_numbers.append(random.choice(big_numbers))

    goal_numbers = []
    for _ in range(3):
      goal_numbers.append(random.choice(answer_numbers))

    solutions = solve_game(goal_numbers, play_numbers)
    if validate_solutions(solutions):
      save_game(goal_numbers, play_numbers, solutions, dt, save_local=True, save_s3=True)
      dt = dt + timedelta(days=1)
      i += 1


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("n")
  parser.add_argument("start_date")
  args = parser.parse_args()

  generate_games(int(args.n), args.start_date)