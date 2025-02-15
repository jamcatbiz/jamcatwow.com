import json, argparse, random, requests, boto3, copy
from time import sleep
from solver import get_words
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
    s3_path = f'hashbang/days/{dt.strftime('%Y-%m-%d')}.json'
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

def generate_games(n: int, start_date: str, words: List[str]):
  games = {}
  dt = datetime.strptime(start_date,"%Y-%m-%d")

  # filter word list
  words = [ w for w in words if len(w) == 5 ]
  indexes = [
    [0,1],[0,3],
    [1,0],[1,1],[1,2],[1,3],[1,4],
    [2,1],[2,3],
    [3,0],[3,1],[3,2],[3,3],[3,4],
    [4,1],[4,3],
  ]

  while len(games) < n:
    game_words = []
    count = 0
    while len(game_words) < 4:
      if count > 5000:
        game_words.pop()
        count = 0
        continue
      tmp = words[random.randint(0, len(words)-1)]
      if len(game_words) == 0:
        game_words.append(tmp)
        count = 0
      elif len(game_words) == 1:
        if game_words[0][1] == tmp[1]:
          game_words.append(tmp)
          count = 0
      elif len(game_words) == 2:
        if game_words[1][3] == tmp[1]:
          game_words.append(tmp)
          count = 0
      elif len(game_words) == 3:
        if game_words[0][3] == tmp[1] and game_words[2][3] == tmp[3]:
          game_words.append(tmp)
          count = 0
      count += 1

    solved_board = [
      [" ",game_words[0][0]," ",game_words[2][0]," "],
      [game_words[1][0],game_words[0][1],game_words[1][2],game_words[2][1],game_words[1][4]],
      [" ",game_words[0][2]," ",game_words[2][2]," "],
      [game_words[3][0],game_words[0][3],game_words[3][2],game_words[2][3],game_words[3][4]],
      [" ",game_words[0][4]," ",game_words[2][4]," "],
    ]

    locks = {
      31: [3,1],
      13: [1,3],
      32: [3,2]
    }

    start_board = copy.deepcopy(solved_board)
    swaps = 0
    while swaps < 5:
      rand_indexes = []
      while len(rand_indexes) < 2:      
        tmp = indexes[random.randint(0, len(indexes)-1)]
        if tmp[0] * 10 + tmp[1] not in locks:
          rand_indexes.append(tmp)          
          
      i = rand_indexes[0]
      j = rand_indexes[1]
      tmp = start_board[i[0]][i[1]]
      start_board[i[0]][i[1]] = start_board[j[0]][j[1]]
      start_board[j[0]][j[1]] = tmp
      swaps += 1

    print(f"{len(games)}: {game_words[0]} {game_words[1]} {game_words[2]} {game_words[3]}")
    print("=====")
    print(json.dumps(solved_board))
    print("=====")
    print(json.dumps(start_board))
    data = {
      'startBoard': start_board,
      'solvedBoard': solved_board,
      'gameWords': game_words,
      'locks': locks,
      'date': dt.strftime('%Y-%m-%d'),
      'gameNumber': 123,
    }
    games[f"{game_words[0]}-{game_words[1]}-{game_words[2]}-{game_words[3]}"] = data.copy()
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

  games = generate_games(int(args.n), args.start_date, words)