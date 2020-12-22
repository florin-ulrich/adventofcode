puzzle_input = [2, 0, 6, 12, 1, 3]


def play_memory_game(turns):
    spoken_in_turn = {}

    for ind, val in enumerate(puzzle_input[:len(puzzle_input) - 1]):
        spoken_in_turn[val] = [ind]

    last_spoken = puzzle_input[-1]

    for i in range(len(puzzle_input) - 1, turns - 1):
        if last_spoken in spoken_in_turn:
            spoken_in_turn[last_spoken].append(i)
            last_spoken = i - spoken_in_turn[last_spoken][-2]
        else:
            spoken_in_turn[last_spoken] = [i]
            last_spoken = 0
    return last_spoken


print("part 1 last spoken:", play_memory_game(2020))
print("part 2 last spoken:", play_memory_game(30000000))
