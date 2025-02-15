import json, argparse, boto3
from collections import deque, defaultdict
from pprint import pprint
from typing import List

def get_words(local_path='', s3_bucket='', s3_path=''):
  if s3_bucket != '' and s3_path != '':
    s3 = boto3.resource('s3')
    content_object = s3.Object(s3_bucket, s3_path)
    words = list(json.loads(content_object.get()['Body'].read().decode('utf-8')))
  elif local_path:
    with open(local_path) as infile:
      words = list(json.load(infile).keys())
  return words

def solve_game(begin_word: str, end_word: str, words: List[str]):
  # Helper function to perform depth-first search to find paths
  def dfs(path: List[str], current_word: str):
    if current_word == begin_word:
      # Reverse the path since we are moving from endWord to beginWord
      ans.append(path[::-1])
      return
    # Iterate over all predecessors and continue building the path
    for path_word in paths_map[current_word]:
      path.append(path_word)
      dfs(path, path_word)
      path.pop()

  ans = []
  words = set(words)

  # check if words not in the word list
  if end_word not in words or begin_word not in words:
    return ans

  words.discard(begin_word)
  distances_map = {begin_word: 0}
  paths_map = defaultdict(set)

  # Initialize queue for BFS
  queue = deque([begin_word])
  found = False
  step = 0

  # Perform BFS until the queue is empty or the end word is found
  while queue and not found:
    step += 1
    for _ in range(len(queue)):
      current_word = queue.popleft()
      word_chars = list(current_word)

      # Try changing each character in the current word
      for i in range(len(word_chars)):
        original_char = word_chars[i]

        # Try all possible transformations by changing the character to 'a' to 'z'
        for letter in range(26):
          word_chars[i] = chr(ord('a') + letter)
          new_word = ''.join(word_chars)

          # Skip words that are not correct distance away
          if distances_map.get(new_word, 0) == step:
            paths_map[new_word].add(current_word)

          # If the new word is in the words set, it is a valid transformation
          if new_word in words:
            paths_map[new_word].add(current_word)
            words.discard(new_word)  # Mark the new word as visited
            queue.append(new_word)  # Add the new word to the queue
            distances_map[new_word] = step

            # If the end word is reached, mark that we found a transformation
            if end_word == new_word:
              found = True
          # Restore the original character at the index
          word_chars[i] = original_char

  # If a transformation was found, reconstruct paths using DFS
  if found:
    dfs([end_word], end_word)  # Initial call to dfs to start path reconstruction
  
  return ans  # Return the list of all shortest transformation sequences

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("str1")
  parser.add_argument("str2")
  args = parser.parse_args()

  words_bucket = 'jamcatwow.com.games'
  words_path = 'ladders/data/all_words.json'
  words = get_words(s3_bucket=words_bucket, s3_path=words_path)
  
  pprint(solve_game(args.str1, args.str2, words))