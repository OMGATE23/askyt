import { Promise_Resp, Resp_Videos } from "./types";

export async function getVideos(): Promise_Resp<Resp_Videos> {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL+'/videos');
    console.log(response)
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