from PIL import Image

for i in range(1, 23):
    try:
        path = f"public/images/gallery/{i}.png"
        img = Image.open(path)
        print(f"{i}.png: {img.size}")
    except Exception as e:
        pass
