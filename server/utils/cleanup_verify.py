# ============================================
# trash_compare.py
# ============================================
import json
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from inference_sdk import InferenceHTTPClient

# ============================================
# ⚙️ Initialize Roboflow client
# ============================================
CLIENT = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="0n8rk4efLnAGJ24GWx0T"
)

# ============================================
# 🧠 Helper functions
# ============================================

def to_serializable(val):
    """Fix JSON serialization for NumPy values."""
    if isinstance(val, (np.bool_, bool)):
        return bool(val)
    if isinstance(val, (np.integer, int)):
        return int(val)
    if isinstance(val, (np.floating, float)):
        return float(val)
    return val


def orb_match_ratio(img1_gray, img2_gray, nfeatures=2000):
    """Compare ORB keypoints to check if both images are same location."""
    orb = cv2.ORB_create(nfeatures=nfeatures)
    kp1, des1 = orb.detectAndCompute(img1_gray, None)
    kp2, des2 = orb.detectAndCompute(img2_gray, None)

    if des1 is None or des2 is None or len(kp1) < 5 or len(kp2) < 5:
        return 0.0, 0, len(kp1), len(kp2)

    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
    matches = bf.knnMatch(des1, des2, k=2)
    good = [m for m, n in matches if m.distance < 0.75 * n.distance]
    denom = min(len(kp1), len(kp2))
    ratio = len(good) / denom if denom > 0 else 0.0
    return ratio, len(good), len(kp1), len(kp2)


def detect_trash(image_path):
    """Run Roboflow litter detection model and count detections."""
    result = CLIENT.infer(image_path, model_id="litter-w1mho/1")
    predictions = result.get("predictions", [])
    return predictions


def compare_images(before_path, after_path):
    """Compare two images for trash cleanup verification."""
    img1 = cv2.imread(before_path)
    img2 = cv2.imread(after_path)
    if img1 is None or img2 is None:
        raise ValueError("Could not read one of the images.")

    img1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    img2_gray = cv2.resize(img2_gray, (img1_gray.shape[1], img1_gray.shape[0]))

    # ---- Step 1: Scene Similarity ----
    ssim_score, _ = ssim(img1_gray, img2_gray, full=True)
    same_location_ssim = ssim_score > 0.1
    orb_ratio, orb_good, orb_kp1, orb_kp2 = orb_match_ratio(img1_gray, img2_gray)
    same_location_orb = orb_ratio > 0.003

    # ---- Step 2: Trash Detection ----
    preds_before = detect_trash(before_path)
    preds_after = detect_trash(after_path)
    trash_before = len(preds_before)
    trash_after = len(preds_after)

    # ---- Step 3: Cleanup Score ----
    reduction = max(0, trash_before - trash_after)
    cleanup_score = (reduction / trash_before * 100) if trash_before > 0 else 0
    verified = (same_location_ssim or same_location_orb) and cleanup_score >= 60

    result = {
        "same_location_ssim": to_serializable(same_location_ssim),
        "ssim_score": round(to_serializable(ssim_score), 3),
        "same_location_orb": to_serializable(same_location_orb),
        "orb_match_ratio": round(to_serializable(orb_ratio), 4),
        "trash_before": trash_before,
        "trash_after": trash_after,
        "cleanup_score": round(to_serializable(cleanup_score), 2),
        "verified": to_serializable(verified)
    }

    return result


# ============================================
# Example usage
# ============================================
if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        print("Usage: python trash_compare.py <before_image> <after_image>")
        sys.exit(1)

    before_img = sys.argv[1]
    after_img = sys.argv[2]

    comparison = compare_images(before_img, after_img)
    print(json.dumps(comparison, indent=2))
