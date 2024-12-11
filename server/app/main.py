from fastapi import FastAPI
from dotenv import load_dotenv
from app.route.video_route import router as video_router
load_dotenv()
app = FastAPI()

app.include_router(video_router, prefix="/v1")

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
