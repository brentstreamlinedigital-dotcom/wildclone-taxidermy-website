import sys
import glob
from PIL import Image

def get_hash(image_path):
    try:
        img = Image.open(image_path).convert('L').resize((16, 16), Image.Resampling.LANCZOS)
        avg = sum(list(img.getdata())) / 256
        return ''.join(['1' if p > avg else '0' for p in img.getdata()])
    except Exception as e:
        print(f"Error on {image_path}: {e}")
        return None

def hamming_distance(s1, s2):
    return sum(c1 != c2 for c1, c2 in zip(s1, s2))

target = sys.argv[1]
target_hash = get_hash(target)

best_match = None
best_dist = 9999

for i in range(1, 23):
    path = f"public/images/gallery/{i}.png"
    h = get_hash(path)
    if h:
        dist = hamming_distance(target_hash, h)
        if dist < best_dist:
            best_dist = dist
            best_match = path

print(f"Best match: {best_match} with distance {best_dist}")
