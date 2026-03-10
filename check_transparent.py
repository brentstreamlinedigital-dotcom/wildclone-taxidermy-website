from PIL import Image
import os

files = [f for f in os.listdir('public/images') if f.endswith('.png')]
for f in files:
    try:
        img = Image.open('public/images/' + f)
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            extrema = img.getextrema()
            if img.mode == 'RGBA':
                if extrema[3][0] < 255:
                    print(f"Transparent: {f}")
                else:
                    print(f"Opaque: {f}")
            else:
                print(f"Transparent (other mode): {f}")
        else:
            print(f"Opaque: {f}")
    except Exception as e:
        print(e)
