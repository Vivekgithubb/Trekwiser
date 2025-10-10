import sys
import json
from ultralytics import YOLO
import cv2
from skimage.metrics import structural_similarity as ssim
import numpy as np

def compare_images(before_path, after_path):
    # Load YOLOv8 pretrained on TACO (or COCO if TACO unavailable)
    model = YOLO("yolov8n.pt")  # Replace with a trash-trained model if available

    # Step 1: Scene similarity
    img1 = cv2.imread(before_path)
    img2 = cv2.imread(after_path)
    img1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # Resize for comparison
    img2_gray = cv2.resize(img2_gray, (img1_gray.shape[1], img1_gray.shape[0]))
    similarity_score, _ = ssim(img1_gray, img2_gray, full=True)

    same_location = similarity_score > 0.5  # 50% threshold

    # Step 2: Trash detection
    results_before = model(before_path)
    results_after = model(after_path)

    trash_before = len(results_before[0].boxes)
    trash_after = len(results_after[0].boxes)

    # Step 3: Cleanup score
    reduction = max(0, trash_before - trash_after)
    cleanup_score = (reduction / trash_before * 100) if trash_before > 0 else 0
    verified = same_location and cleanup_score >= 60  # 60% threshold

    result = {
        "same_location": same_location,
        "trash_before": trash_before,
        "trash_after": trash_after,
        "cleanup_score": round(cleanup_score, 2),
        "verified": verified
    }

    print(json.dumps(result))

if __name__ == "__main__":
    before_img = sys.argv[1]
    after_img = sys.argv[2]
    compare_images(before_img, after_img)
