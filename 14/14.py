from functools import reduce

with open("in", "r") as f:
    lines = [line.rstrip().split(' = ') for line in f]


def apply_mask_part_1(val, mask):
    ones = int(''.join([a if a == '1' else '0' for a in mask]), 2)
    zeroes = int(''.join([a if a == '0' else '1' for a in mask]), 2)
    return (int(val) | ones) & zeroes


def extract_addr(addr_string):
    return int(addr_string[0][4: len(addr_string[0]) - 1])


def part_1():
    mask = ''
    vals = {}
    for line in lines:
        if line[0].startswith('mask'):
            mask = line[1]
        else:
            addr = extract_addr(line)
            vals[addr] = apply_mask_part_1(line[1], mask)

    print('part 1 result:', reduce(lambda a, b: a + b, vals.values()))


part_1()


# part 2

def apply_mask_part_2(val, mask):
    return [a[0] if a[1] == '0' else a[1] for a in zip(val, mask)]


def get_addresses(addr_number):
    x_indices = []
    addresses = []

    for idx, val in enumerate(addr_number):
        if val == 'X':
            x_indices.append(idx)

    for i in range(0, 2 ** len(x_indices)):
        insert_string = "{0:b}".format(i).rjust(len(x_indices), '0')
        new_addr = list(addr_number)
        for ind, ch in zip(x_indices, insert_string):
            new_addr[ind] = ch
        addresses.append(new_addr)

    return addresses


def part_2():
    mask = ''
    vals = {}
    for line in lines:
        if line[0].startswith('mask'):
            mask = line[1]
        else:
            addr = "{0:b}".format(extract_addr(line)).rjust(36, '0')
            masked_addr = apply_mask_part_2(addr, mask)
            addresses = [''.join(a) for a in get_addresses(masked_addr)]
            for address in addresses:
                vals[address] = int(line[1])

    print('part 2 result:', reduce(lambda a, b: a + b, vals.values()))


part_2()
