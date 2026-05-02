import os
import glob
from PIL import Image

def make_background_transparent(image_path, threshold=15):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # If the pixel is very dark (close to black), make it transparent
            if item[0] <= threshold and item[1] <= threshold and item[2] <= threshold:
                # To prevent sharp edges, we can do a soft alpha if it's very close to threshold
                # but for simplicity, we just make it fully transparent.
                new_data.append((item[0], item[1], item[2], 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Success: {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    directories = [
        "public/products",
        "public/props",
        "public/footer"
    ]
    
    for d in directories:
        png_files = glob.glob(os.path.join(d, "*.png"))
        for f in png_files:
            print(f"Processing {f}...")
            make_background_transparent(f)
    
    print("Done!")
