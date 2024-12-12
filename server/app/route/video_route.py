from fastapi import APIRouter, HTTPException
from ..controllers.video_controller import get_video_urls, upload_video, process_scene_prompt, get_video_player_url, search_in_video

router = APIRouter()

@router.get("/video")
async def get_video(video_id: str):
  try:
    return get_video_player_url(video_id)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

@router.get("/videos")
async def get_videos():
  try:
    return get_video_urls()
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

@router.post("/videos/upload")
async def upload_video_route(url: str):
  try:
    return upload_video(url)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


@router.get("/search")
async def search_scene(prompt: str):
  try:
    return process_scene_prompt(prompt)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

@router.get("/search/{video_id}")
async def search_scene_in_video(video_id: str, prompt: str):
  try:
    result = search_in_video(video_id, prompt)
    if "error" in result:
      raise HTTPException(status_code=404, detail=result["error"])
    return result
  except HTTPException as he:
    raise he
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))