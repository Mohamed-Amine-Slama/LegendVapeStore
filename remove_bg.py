import os
import glob
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def remove_background_aggressive(image_path):
    """Remove dark studio background from product photos using edge-based flood fill
    with high tolerance, then clean up with alpha matting."""
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        
        # Convert to numpy for efficient processing
        data = np.array(img)
        
        # Calculate brightness per pixel (max of RGB channels)
        brightness = np.max(data[:, :, :3], axis=2)
        
        # Create a mask: start with all pixels as foreground (255)
        mask = np.ones((height, width), dtype=np.uint8) * 255
        
        # Use flood fill approach: mark dark pixels connected to edges as background
        # First pass: mark all very dark pixels
        dark_threshold = 45
        is_dark = brightness < dark_threshold
        
        # Create a visited array for flood fill from edges
        from collections import deque
        visited = np.zeros((height, width), dtype=bool)
        queue = deque()
        
        # Seed from all edge pixels that are dark
        for x in range(width):
            if is_dark[0, x] and not visited[0, x]:
                queue.append((0, x))
                visited[0, x] = True
            if is_dark[height-1, x] and not visited[height-1, x]:
                queue.append((height-1, x))
                visited[height-1, x] = True
        for y in range(height):
            if is_dark[y, 0] and not visited[y, 0]:
                queue.append((y, 0))
                visited[y, 0] = True
            if is_dark[y, width-1] and not visited[y, width-1]:
                queue.append((y, width-1))
                visited[y, width-1] = True
        
        # BFS flood fill - expand from dark edges
        while queue:
            cy, cx = queue.popleft()
            mask[cy, cx] = 0  # Mark as background
            
            for dy, dx in [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]:
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < height and 0 <= nx < width and not visited[ny, nx]:
                    # More lenient threshold for connected dark regions
                    if brightness[ny, nx] < 65:
                        visited[ny, nx] = True
                        queue.append((ny, nx))
        
        # Create soft edge by blurring the mask slightly
        mask_img = Image.fromarray(mask).filter(ImageFilter.GaussianBlur(radius=1.5))
        mask = np.array(mask_img)
        
        # Apply the mask as alpha channel
        data[:, :, 3] = np.minimum(data[:, :, 3], mask)
        
        result = Image.fromarray(data)
        result.save(image_path, "PNG")
        print(f"  Success: {image_path}")
    except Exception as e:
        print(f"  Error processing {image_path}: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # First restore original images from the generated source
    import shutil
    
    brain_dir = r"C:\Users\moham\.gemini\antigravity\brain\6539ebf9-e40a-47be-a8c9-8252dcdb76fb"
    
    copies = {
        "device_slim_gold": "public/products/device-slim-gold.png",
        "device_pod_red": "public/products/device-pod-red.png",
        "device_boxmod_black": "public/products/device-boxmod-black.png",
        "device_disposable_teal": "public/products/device-disposable-teal.png",
        "device_podpack": "public/products/device-podpack.png",
        "device_refill": "public/products/device-refill.png",
        "card_strawberry_device": "public/products/card-strawberry-device.png",
        "card_cookies_device": "public/products/card-cookies-device.png",
        "card_chocolate_device": "public/products/card-chocolate-device.png",
        "product_hero_3d": "public/footer/product-hero-3d.png",
        "strawberry_1": "public/props/strawberry-1.png",
        "strawberry_2": "public/props/strawberry-2.png",
        "strawberry_3": "public/props/strawberry-3.png",
        "cookie_1": "public/props/cookie-1.png",
        "cookie_2": "public/props/cookie-2.png",
        "cookie_3": "public/props/cookie-3.png",
        "chocolate_1": "public/props/chocolate-1.png",
    }
    
    print("Step 1: Restoring original generated images...")
    for prefix, dest in copies.items():
        pattern = os.path.join(brain_dir, f"{prefix}_*.png")
        matches = glob.glob(pattern)
        if matches:
            shutil.copy2(matches[0], dest)
            print(f"  Restored: {dest}")
        else:
            print(f"  SKIP (not found): {prefix}")
    
    print("\nStep 2: Removing backgrounds...")
    all_pngs = []
    for d in ["public/products", "public/props", "public/footer"]:
        all_pngs.extend(glob.glob(os.path.join(d, "*.png")))
    
    for f in all_pngs:
        print(f"Processing {f}...")
        remove_background_aggressive(f)
    
    print("\nDone! All images processed.")
