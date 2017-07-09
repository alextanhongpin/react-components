import re
import json

country_codes = []

with open('./flags.css', 'r') as f:
    lines = [x for x in f.readlines()]
    for _, line in enumerate(lines):
        out = re.match(r'\.flag\.flag-(.*)\s\{', line)
        if out:
            print(out.group(1))
            country_codes.append(out.group(1))

print('Found {} country codes'.format(len(country_codes)))
with open('country-codes.json', 'w') as outfile:
    json.dump(country_codes, outfile)