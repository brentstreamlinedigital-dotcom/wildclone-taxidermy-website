import csv
import json
import re

# Load extracted prices
extracted_prices = {}
with open('Wildclone Price Calculator 3/extracted_prices.csv', mode='r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        species = row['Species'].lower().replace(' ', '_').replace('(', '').replace(')', '').replace('&', 'and')
        # Handle specifically 'crocodile' and others
        if 'duiker_common_and_red' in species: species = 'duiker_common_red'
        if 'vaal_rhebuck' in species: species = 'vaal_rhebuck'
        if 'mountain_reedbuck' in species: species = 'mountain_reedbuck'
        if 'common_reedbuck' in species: species = 'common_reedbuck'
        if 'black_wildebeest' in species: species = 'black_wildebeest'
        if 'blue_wildebeest' in species: species = 'blue_wildebeest'
        if 'cape_buffalo' in species: species = 'cape_buffalo'
        if 'vervet_monkey' in species: species = 'vervet_monkey'
        if 'red_hartebeest' in species: species = 'red_hartebeest'
        if 'fallow_deer' in species: species = 'fallow_deer'
        
        extracted_prices[species] = row

# Mapping of columns to mount IDs
COL_MAP = {
    'Shoulder Mount': 'shoulder_mount',
    'Pedestal Wall': 'pedestal_wall',
    'Pedestal Floor': 'pedestal_floor',
    'Full Mount': 'full_mount',
    'Half Mount': 'half_mount',
    'Bleached Skull': 'bleached_skull',
    'European Mount': 'european_mount',
    'Flat Skin': 'flat_skin',
    'Back Skin': 'back_skin'
}

# The current PRICE_DATA from index.html (I'll extract it using a regex or simple parser)
def get_current_price_data(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Simple regex to find the PRICE_DATA object
    match = re.search(r'const PRICE_DATA = \{(.*?)\};', content, re.DOTALL)
    if not match:
        return {}
    
    data_str = "{" + match.group(1) + "}"
    # This is slightly dangerous as it's not JSON, but let's try a very basic "parser"
    # Actually, I'll just look at the keys and values
    lines = match.group(1).split('\n')
    parsed = {}
    for line in lines:
        if ':' in line and '{' in line:
            key = line.split(':')[0].strip().replace(',', '')
            # Try to extract the dict inside
            inner_match = re.search(r'\{(.*?)\}', line)
            if inner_match:
                inner_str = inner_match.group(1)
                inner_data = {}
                pairs = inner_str.split(',')
                for p in pairs:
                    if ':' in p:
                        k, v = p.split(':')
                        inner_data[k.strip()] = v.strip().replace('"', '').replace("'", "")
                parsed[key] = inner_data
    return parsed

current_data = get_current_price_data('Wildclone Price Calculator 3/index.html')

print("Discrepancies found:")
for species, ext_row in extracted_prices.items():
    if species not in current_data:
        print(f"Species not in current data: {species}")
        continue
    
    curr_row = current_data[species]
    for col, mount_id in COL_MAP.items():
        ext_val = ext_row[col].strip()
        curr_val = curr_row.get(mount_id, 'None').strip()
        
        if ext_val == '-' or not ext_val:
            continue
            
        if ext_val != curr_val:
            # Special case for "per foot"
            if 'per' in ext_val or 'POA' in ext_val:
                print(f"{species} {mount_id}: Booklet='{ext_val}', Current='{curr_val}'")
            else:
                try:
                    if int(ext_val) != int(curr_val):
                        print(f"{species} {mount_id}: Booklet='{ext_val}', Current='{curr_val}'")
                except ValueError:
                    print(f"{species} {mount_id}: Booklet='{ext_val}', Current='{curr_val}'")
