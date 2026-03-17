from PIL import Image

hashes = {}
duplicates = []

def get_normalized_hist(image_path):
    try:
        img = Image.open(image_path).convert('RGB').resize((100, 100))
        hist = img.histogram()
        total = sum(hist)
        return tuple(round(x / total, 3) for x in hist)
    except Exception as e:
        return None

for i in range(1, 23):
    path = f"public/images/gallery/{i}.png"
    hist = get_normalized_hist(path)
    if hist:
        if hist in hashes:
            duplicates.append((hashes[hist], i))
        else:
            hashes[hist] = i

for d in duplicates:
    print(f"DUPLICATE DETECTED: {d[0]}.png and {d[1]}.png")
