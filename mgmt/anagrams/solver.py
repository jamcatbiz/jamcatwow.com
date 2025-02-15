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

def solve_game(word: str, words: List[str]):
  # Helper function to perform depth-first search to find paths
  def get_points(string: str):
    return {
      "points": len(string) - 3,
      "bonus": 0,
    }
  
  # setup dict of chars to keep count of available chars
  char_dict = {}
  for char in word:
    if char not in char_dict:
      char_dict[char] = 1
    else: 
      char_dict[char] += 1
  
  # check if the chars in each word str in words match the available chars from word,
  # if so then the string is an anagram
  anagrams = {}
  for string in words:
    char_dict_copy = dict(char_dict)
    isAnagram = True
    for char in string:
      if char not in char_dict_copy:
        isAnagram = False
        break
      if char_dict_copy[char] == 0:
        isAnagram = False
        break
      char_dict_copy[char] -= 1
    if isAnagram:
      anagrams[string] = get_points(string)

  return anagrams

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("str")
  args = parser.parse_args()

  words_bucket = 'jamcatwow.com.games'
  words_path = 'ladders/data/all_words.json'
  words = get_words(s3_bucket=words_bucket, s3_path=words_path)
  
  pprint(solve_game(args.str, words))