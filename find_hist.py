import sys
import traceback
from PIL import Image

try:
    def get_normalized_hist(image_path):
        img = Image.open(image_path).convert('RGB').resize((100, 100))
        hist = img.histogram()
        total = sum(hist)
        return [x / total for x in hist]

    target = "/Users/danhartel/.gemini/antigravity/brain/1643901e-58c2-40a9-9a61-9de41cdaf6f4/media__1772885922977.png"
    target_hist = get_normalized_hist(target)

    best = None
    best_val = 999
    for i in range(1, 23):
        path = f"public/images/gallery/{i}.png"
        hist = get_normalized_hist(path)
        diff = sum(abs(a - b) for a, b in zip(target_hist, hist))
        print(f"Image {i}: diff = {diff}")
        if diff < best_val:
            best_val = diff
            best = i

    print(f"BEST MATCH: {best}.png")
except Exception as e:
    traceback.print_exc()
