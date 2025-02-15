import json, argparse, heapq
from pprint import pprint
from typing import List, Dict

operation_functions = {
  "+": lambda i, j: i + j,
  "−": lambda i, j: i - j if i > j else None,
  "×": lambda i, j: i * j,
  "÷": lambda i, j: i // j if j != 0 and i // j == i / j else None,
}

def recurse(numbers: List[int], goal: int, operations: List[str], solutions: Dict):
    if goal in numbers:
      if len(solutions[goal]['min_operations']) == 0 or len(operations) < len(solutions[goal]['min_operations']):
        solutions[goal]['min_operations'] = operations.copy()
      if len(solutions[goal]['max_operations']) == 0 or len(operations) > len(solutions[goal]['max_operations']):
        solutions[goal]['max_operations'] = operations.copy()
      return
    
    check_commutative_operations = set()
    for i, i_num in enumerate(numbers):
      for j, j_num in enumerate(numbers):
        if i == j:
          continue

        other_numbers = numbers.copy()
        other_numbers.remove(i_num)
        other_numbers.remove(j_num)

        for operator, operation in operation_functions.items():
          ans = operation(i_num, j_num)
          if not ans:
            continue
          operation_str = get_canonical_form(i_num, operator, j_num, ans)
          if is_commutative(operator):
            if operation_str in check_commutative_operations:
              continue
            check_commutative_operations.add(operation_str)
          recurse(other_numbers + [ans], goal, operations + [operation_str], solutions)

def is_commutative(operator: str) -> bool:
  return operator == '×' or operator == '+'

def get_canonical_form(i: int, operator: str, j: int, ans: int) -> str:
  if is_commutative(operator):
    return f'{min(i, j)} {operator} {max(i, j)} = {ans}'
  else:
    return f'{i} {operator} {j} = {ans}'

def solve_game(goal_numbers: List[int], play_numbers: List[int]):
  solutions = {}
  for goal in goal_numbers:
    solutions[goal] = {
      'min_operations': [],
      'max_operations': []
    }
  for goal in goal_numbers:
    recurse(play_numbers, goal, [], solutions)

  return solutions

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("--goal_numbers", type=str, required=True)
  parser.add_argument("--play_numbers", type=str, required=True)
  args = parser.parse_args()
  goal_numbers = [int(x) for x in args.goal_numbers.split(',')]
  play_numbers = [int(x) for x in args.play_numbers.split(',')]
  pprint(solve_game(goal_numbers, play_numbers))