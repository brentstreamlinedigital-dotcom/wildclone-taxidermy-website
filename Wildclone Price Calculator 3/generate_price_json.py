import csv
import json

# Mapping of species keys to booklet names
SPECIES_MAP = {
    'baboon': 'Baboon',
    'barbary_sheep': 'Barbary Sheep',
    'black_wildebeest': 'Black Wildebeest',
    'blesbuck': 'Blesbuck',
    'blue_duiker': 'Blue Duiker',
    'blue_wildebeest': 'Blue Wildebeest',
    'bontebok': 'Bontebok',
    'bushbuck': 'Bushbuck',
    'bushpig': 'Bushpig',
    'cape_buffalo': 'Cape Buffalo',
    'cheetah': 'Cheetah',
    'common_reedbuck': 'Common Reedbuck',
    'crocodile': 'Crocodile',
    'dassie': 'Dassie',
    'duiker_common_red': 'Duiker (Common & Red)',
    'eland': 'Eland',
    'elephant': 'Elephant',
    'fallow_deer': 'Fallow Deer',
    'foxes': 'Foxes',
    'gemsbuck': 'Gemsbuck',
    'genet': 'Genet',
    'giraffe': 'Giraffe',
    'grysbuck': 'Grysbuck',
    'hippopotamus': 'Hippopotamus',
    'hyena': 'Hyena',
    'impala': 'Impala',
    'jackal': 'Jackal',
    'klipspringer': 'Klipspringer',
    'kudu': 'Kudu',
    'lechwe': 'Lechwe',
    'leopard': 'Leopard',
    'lion': 'Lion',
    'lynx': 'Lynx',
    'mountain_reedbuck': 'Mountain Reedbuck',
    'nyala': 'Nyala',
    'oribi': 'Oribi',
    'ostrich': 'Ostrich',
    'porcupine': 'Porcupine',
    'red_hartebeest': 'Red Hartebeest',
    'rhino': 'Rhino',
    'roan': 'Roan',
    'sable': 'Sable',
    'sitatunga': 'Sitatunga',
    'springbuck': 'Springbuck',
    'springhare': 'Springhare',
    'steenbuck': 'Steenbuck',
    'suni': 'Suni',
    'vaal_rhebuck': 'Vaal Rhebuck',
    'vervet_monkey': 'Vervet Monkey',
    'warthog': 'Warthog',
    'waterbuck': 'Waterbuck',
    'zebra': 'Zebra'
}

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

booklet_data = {}
with open('Wildclone Price Calculator 3/extracted_prices.csv', mode='r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        booklet_data[row['Species']] = row

output = "const PRICE_DATA = {\n"
for key, booklet_name in SPECIES_MAP.items():
    row = booklet_data.get(booklet_name)
    if not row:
        output += f"  {key}: {{ }},\n"
        continue
    
    entries = []
    # Core mounts
    for col, mount_id in COL_MAP.items():
        val = row[col].strip()
        if val == '-' or not val:
            # Special case for Crocodile Full Mount - user says it's missing
            if key == 'crocodile' and mount_id == 'full_mount':
                val = 'POA'
            else:
                continue
        
        # Format values
        if 'per' in val or val == 'POA':
            entries.append(f"{mount_id}: '{val}'")
        else:
            try:
                entries.append(f"{mount_id}: {int(val)}")
            except ValueError:
                entries.append(f"{mount_id}: '{val}'")
    
    output += f"  {key}: {{ {', '.join(entries)} }},\n"

output += "};"
print(output)
