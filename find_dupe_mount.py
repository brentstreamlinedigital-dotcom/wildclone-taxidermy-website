import sys
from PIL import Image

def get_tiny(image_path):
    try:
        img = Image.open(image_path).convert('L').resize((8, 8), Image.Resampling.LANCZOS)
        return list(img.getdata())
    except Exception as e:
        return None

data = {}
for i in range(1, 23):
    if i == 7:
        continue
    pixels = get_tiny(f"public/images/gallery/{i}.png")
    if pixels:
        data[i] = pixels

best_match = None
best_diff = 99999
for i in data:
    for j in data:
        if i < j:
            diff = sum(abs(a - b) for a, b in zip(data[i], data[j]))
            if diff < 500:
                print(f"Potential Duplicate: {i}.png and {j}.png with diff {diff}")
            if diff < best_diff:
                best_diff = diff
                best_match = (i, j)

print(f"Best match overall: {best_match} with diff {best_diff}")
