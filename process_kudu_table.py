from PIL import Image

def process_table():
    input_path = "/Users/danhartel/.gemini/antigravity/brain/1643901e-58c2-40a9-9a61-9de41cdaf6f4/media__1772884849646.png"
    output_path = "public/images/wyldecraft/kudu_table_transparent.png"
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
        print("Successfully processed kudu table PNG")
    except Exception as e:
        print(f"Error processing kudu table: {e}")

if __name__ == "__main__":
    process_table()
