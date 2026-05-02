import os
import glob
from PIL import Image, ImageDraw

def remove_background(image_path, tolerance=35):
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        
        temp_img = img.copy().convert("RGB")
        target_color = (255, 1, 254)
        
        corners = [(0,0), (width-1, 0), (0, height-1), (width-1, height-1), (width//2, 0), (width//2, height-1), (0, height//2), (width-1, height//2)]
        for x, y in corners:
            ImageDraw.floodfill(temp_img, xy=(x, y), value=target_color, thresh=tolerance)
            
        temp_pixels = temp_img.load()
        img_pixels = img.load()
        
        for y in range(height):
            for x in range(width):
                if temp_pixels[x, y] == target_color:
                    r, g, b, a = img_pixels[x, y]
                    img_pixels[x, y] = (0, 0, 0, 0)
                    
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
            remove_background(f)
