import json, argparse, boto3
from collections import deque, defaultdict
from pprint import pprint
from typing import List

words = {
  "thing": {},
  "spoke": {},
  "shape": {},
  "snake": {},
}
solved_board = [
  [' ','t',' ','s',' '],
  ['s','h','a','p','e'],
  [' ','i',' ','s',' '],
  ['s','n','a','k','e'],
  [' ','g',' ','s',' ']
]

start_board = [
  [' ','t',' ','s',' '],
  ['s','h','a','p','e'],
  [' ','i',' ','s',' '],
  ['s','n','a','k','e'],
  [' ','g',' ','s',' ']
]

def get_words(local_path='', s3_bucket='', s3_path=''):
  if s3_bucket != '' and s3_path != '':
    s3 = boto3.resource('s3')
    content_object = s3.Object(s3_bucket, s3_path)
    words = list(json.loads(content_object.get()['Body'].read().decode('utf-8')))
  elif local_path:
    with open(local_path) as infile:
      words = list(json.load(infile).keys())
  return words

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("str1")
  parser.add_argument("str2")
  args = parser.parse_args()

  words_bucket = 'jamcatwow.com.games'
  words_path = 'ladders/data/all_words.json'
  words = get_words(s3_bucket=words_bucket, s3_path=words_path)