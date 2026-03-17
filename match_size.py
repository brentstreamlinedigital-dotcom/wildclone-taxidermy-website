from PIL import Image

target_path = "/Users/danhartel/.gemini/antigravity/brain/1643901e-58c2-40a9-9a61-9de41cdaf6f4/media__1772885922977.png"
try:
    target_size = Image.open(target_path).size
    print(f"Target size: {target_size}")

    for i in range(1, 23):
        try:
            path = f"public/images/gallery/{i}.png"
            if Image.open(path).size == target_size:
                print(f"Match found: {i}.png")
        except Exception as e:
            pass
except Exception as e:
    print(e)
