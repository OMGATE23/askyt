from ..config.videodb import conn
import os
from dotenv import load_dotenv
from videodb import SceneExtractionType, SearchType, IndexType

load_dotenv()

def get_video_player_url(video_id: str):
  try:
    coll = conn.get_collection()
    video = coll.get_video(video_id=video_id)

    if video is None:
       raise Exception("video not found")
    
    return {"message": "Video Found", "player_url": video.player_url}
  except Exception as e:
    return {"error": str(e)}

def get_video_urls():
    try:
        coll = conn.get_collection()

        videos = []
        for video in coll.get_videos():
          videos.append({"player_url":video.player_url, "id": video.id})
        return {"collection": coll.id, "videos": videos}

    except Exception as e:
        return {"error": str(e)}


def upload_video(url: str):
    try:
      
      coll = conn.get_collection()
      video =  coll.upload(url=url)
      video.index_spoken_words()

      index_id = video.index_scenes(
          extraction_type=SceneExtractionType.time_based,
          extraction_config={"time": 2, "select_frames": ['first', 'last']},
          prompt="Describe the scene in detail"
      )

      scene_index = video.get_scene_index(index_id)
      return {
        "message": "Video Uploaded Successfully", 
        "video_id": video.id,
        "scene_index": scene_index
      }
    
    except Exception as e:
       return {"error": str(e)}

    
def process_scene_prompt(prompt: str):
  try:
    coll = conn.get_collection()
    scene_results = coll.search(
        query=prompt,
    )

    videos = coll.get_videos()
    results = []
    shots = []
    for video in videos:
      result = video.search(query=prompt, index_type=IndexType.scene, search_type=SearchType.semantic)
      for video_shot in result.shots:
        print(video_shot)
        shots.append({
           "start": video_shot.start, 
           "end": video_shot.end, 
           "text": video_shot.text,
           "video_id": video_shot.video_id
        })
      results.append({"player_url":result.player_url, "play": result.play})
    
    return {"results": results , "prompt": prompt, "shots": shots}
  except Exception as e:
    return {"error": str(e)}
