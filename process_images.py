import sys
from PIL import Image

def process_half_mount():
    input_path = "public/images/mount_half.png"
    output_path = "public/images/mount_half_transparent.png"
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # Check if the pixel is close to black
            if item[0] < 20 and item[1] < 20 and item[2] < 20:
                # Change to transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Successfully processed half mount PNG")
    except Exception as e:
        print(f"Error processing half mount: {e}")

def check_sizes():
    try:
        img1 = Image.open("public/images/tanning_africa_piece.png")
        print(f"africa_piece: {img1.size}")
        img2 = Image.open("public/images/tanning_guy_holding_crate.jpg")
        print(f"guy_holding_crate: {img2.size}")
    except Exception as e:
        print(f"Error checking sizes: {e}")

if __name__ == "__main__":
    check_sizes()
    process_half_mount()
