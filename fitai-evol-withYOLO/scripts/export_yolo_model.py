"""
YOLO11-Nano Pose Model Export Script
Exports YOLO11n-pose.pt to ONNX format for browser inference

Requirements:
pip install ultralytics

Usage:
python export_yolo_model.py
"""

from ultralytics import YOLO
import os

def export_yolo11_pose():
    print("🚀 Starting YOLO11-Nano Pose export...")
    
    # Load YOLO11-Nano Pose model
    # This will auto-download if not present (~6 MB)
    model = YOLO("yolo11n-pose.pt")
    
    print("✅ Model loaded successfully")
    
    # Export to ONNX format
    print("📦 Exporting to ONNX...")
    
    model.export(
        format="onnx",
        imgsz=640,  # Input image size (640x640)
        simplify=True,  # Simplify ONNX graph
        opset=12,  # ONNX opset version (compatible with onnxruntime-web)
        dynamic=False,  # Fixed input shape for better performance
    )
    
    print("✅ Export complete!")
    
    # Get output file name
    onnx_file = "yolo11n-pose.onnx"
    
    if os.path.exists(onnx_file):
        file_size = os.path.getsize(onnx_file) / (1024 * 1024)  # MB
        print(f"📊 Model size: {file_size:.2f} MB")
        print(f"📁 Location: {os.path.abspath(onnx_file)}")
        print("\n✨ Next steps:")
        print("1. Move this file to: public/models/yolo11n-pose.onnx")
        print("2. Run npm install in your project")
        print("3. Start integration in CameraWorkout.tsx")
    else:
        print("❌ Export failed - file not found")

if __name__ == "__main__":
    try:
        export_yolo11_pose()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n💡 Make sure you have installed ultralytics:")
        print("   pip install ultralytics")
