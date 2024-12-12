import { Promise_Resp, Resp_Video, Resp_Videos } from "./types";

export async function getVideos(): Promise_Resp<Resp_Videos> {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL+'/videos');
    const data = await response.json();
    return {error: false, data: data as Resp_Videos} 
  } catch(e) {
    if(e instanceof Error){
      return {
        error: true,
        message: e.message
      }
    }

    return {
      error: true,
      message: "Something Went Wrong"
    }
  }
}

export async function uploadVideo(query: string): Promise_Resp<Resp_Videos> {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL+`search?prompt=${query}`);
    const data = await response.json();
    return {error: false, data: data as Resp_Videos} 
  } catch(e) {
    if(e instanceof Error){
      return {
        error: true,
        message: e.message
      }
    }

    return {
      error: true,
      message: "Something Went Wrong"
    }
  }
}

export async function getVideo(video_id: string): Promise_Resp<Resp_Video> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/video?video_id=${video_id}`);
    const data = await response.json();
    return {error: false, data: data as Resp_Video} 
  } catch(e) {
    if(e instanceof Error){
      return {
        error: true,
        message: e.message
      }
    }

    return {
      error: true,
      message: "Something Went Wrong"
    }
  }
}