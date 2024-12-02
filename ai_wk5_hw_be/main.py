import io

from PIL import Image
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()


origins = [
    "http://localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


checkpoint = "openai/clip-vit-large-patch14"
detector = pipeline(model=checkpoint, task="zero-shot-image-classification", device=0)


labels = ["leopard", "red panda", "cat", "dog", "elephant", "bear", "fish", "parrot", "giraffe", "koala"]


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/classify-animal")
async def classify_animal(file: UploadFile = File(...)):
    # Check if the file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    # Read the image file
    contents = await file.read()
    try:
        image = Image.open(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Unable to open image: " + str(e))

    # Perform zero-shot image classification
    predictions = detector(
        image,
        candidate_labels=labels,
    )

    # Set a confidence threshold
    confidence_threshold = 50.0

    # Find the top prediction
    top_prediction = max(predictions, key=lambda x: x["score"])

    # Check whether the top prediction meets the confidence threshold
    if top_prediction["score"] * 100 >= confidence_threshold:
        return {"animal": top_prediction["label"], "confidence": top_prediction["score"] * 100}
    else:
        return {"animal": "undetected", "confidence": 0.0}
