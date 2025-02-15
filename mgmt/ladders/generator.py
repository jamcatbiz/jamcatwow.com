import json, argparse, random, requests, boto3
from time import sleep
from solver import solve_game, get_words
from datetime import datetime, timedelta
from typing import List

filter_cache = {}

def save_game(data, dt, save_local=False, save_s3=False):
  if save_local:
    local_path = f'./{dt.strftime('%Y-%m-%d')}.json'
    with open(local_path, 'w') as f:
      json.dump(data, f)
  if save_s3:
    s3_bucket = 'jamcatwow.com.games'
    s3_path = f'ladders/days/{dt.strftime('%Y-%m-%d')}.json'
    s3 = boto3.resource('s3')
    s3.Object(s3_bucket, s3_path).put(Body=(bytes(json.dumps(data).encode('UTF-8'))))

# returns true if word passes filters, false if not
def filter_word(word: str):
  if word in filter_cache:
    return filter_cache[word]

  url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
  myResponse = requests.get(url)
  if myResponse.ok:
    filter_cache[word] = True
    return True
  elif str(myResponse.status_code) == "404":
    filter_cache[word] = False
    return False
  elif str(myResponse.status_code) == "429":
    while str(myResponse.status_code) == "429":
      sleep_time = int(myResponse.headers.get('Retry-After'))
      sleep(sleep_time)
      myResponse = requests.get(url)
      if myResponse.ok:
        filter_cache[word] = True
        return True
      elif str(myResponse.status_code) == "404":
        filter_cache[word] = False
        return False

  else:
    print(f"  ERROR: {word} {myResponse.status_code}")

def generate_games(n: int, start_date: str, path_len: List[int], word_len: List[int], solutions_len: List[int], words: List[str]):
  games = {}
  dt = datetime.strptime(start_date,"%Y-%m-%d")

  # filter word list
  if len(word_len) > 0:
    words = [ w for w in words if len(w) in word_len ]

  while len(games) < n:
    # generate start and stop words
    word1 = words[random.randint(0, len(words)-1)]
    word2 = "" # init word2 to empty and search for random string of same len
    while len(word1) != len(word2):
      word2 = words[random.randint(0, len(words)-1)]
    print(f"{len(games)}: {word1} {word2}")

    # solve game
    solutions = solve_game(word1, word2, words)

    # validate game
    if len(path_len) > 0:
      solutions = [ s for s in solutions if len(s) in path_len ]
    if len(solutions) == 0:
      continue
    if len(solutions_len) > 0 and len(solutions) not in solutions_len:
        continue
    
    data = {
      'topWord': word1,
      'bottomWord': word2,
      'solutions': solutions,
      'date': dt.strftime('%Y-%m-%d'),
      'gameNumber': 123,
    }
    games[f"{word1}-{word2}"] = data.copy()
    save_game(data, dt, save_local=True, save_s3=True)
    dt = dt + timedelta(days=1)
  return games

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("n")
  parser.add_argument("start_date")
  args = parser.parse_args()
  
  words_bucket = 'jamcatwow.com.games'
  words_path = 'ladders/data/all_words.json'
  words = get_words(s3_bucket=words_bucket, s3_path=words_path)

  games = generate_games(int(args.n), args.start_date, [4,5,6], [], [], words)