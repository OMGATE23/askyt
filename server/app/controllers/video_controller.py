from ..config.videodb import conn
import os
from dotenv import load_dotenv
from videodb import SceneExtractionType

load_dotenv()

def get_video_player_url(video_id: str):
  try:
    coll = conn.get_collection()
    video = coll.get_video(video_id=video_id)

    if video is None:
       raise Exception("video not found")
    
    return {"message": "Video Found", "player_url": video.player_url, "title": video.name, "id": video.id}
  except Exception as e:
    return {"error": str(e)}

def get_video_urls():
  try:
    coll = conn.get_collection()

    videos = []
    for video in coll.get_videos():
      videos.append({"player_url":video.player_url, "id": video.id, "title": video.name})
    return {"collection": coll.id, "videos": videos}

  except Exception as e:
    return {"error": str(e)}


def upload_video(url: str):
    try:
      print(url)
      coll = conn.get_collection()
      video =  coll.upload(url=url)
      video.index_spoken_words()
      video.index_scenes(
          extraction_type=SceneExtractionType.time_based,
          extraction_config={"time": 2, "select_frames": ['first', 'last']},
          prompt="Describe the scene in detail"
      )

      return {
        "message": "Video Uploaded Successfully", 
        "video_id": video.id,
        "player_url": video.player_url
      }
    
    except Exception as e:
       return {"error": str(e)}

    
def process_scene_prompt(prompt: str):
  try:
    coll = conn.get_collection()
    scene_results = coll.search(
        query=prompt,
    )

    shots = []
    for video_shot in scene_results.shots:
      if video_shot.search_score >=0.4:
        shots.append({
          "start": video_shot.start, 
          "end": video_shot.end, 
          "text": video_shot.text,
          "video_id": video_shot.video_id,
          "name": video_shot.video_title
        })
    
    return {"prompt": prompt, "results": shots}
  except Exception as e:
    return {"error": str(e)}

def search_in_video(video_id: str, prompt: str):
  try:
    coll = conn.get_collection()
    video = coll.get_video(video_id=video_id)

    if video is None:
      return {"error": "Video not found for the given video_id"}

    scene_results = video.search(
      query=prompt,
    )

    shots = []
    for video_shot in scene_results.shots:
      shots.append({
        "start": video_shot.start, 
        "end": video_shot.end, 
        "text": video_shot.text,
        "video_id": video_shot.video_id,
        "name": video_shot.video_title
      })

    return {"prompt": prompt, "results": shots}
  except Exception as e:
    return {"error": str(e)}
