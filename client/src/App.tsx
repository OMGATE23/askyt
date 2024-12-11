import { useEffect, useState } from "react"
import { getVideos } from "./utils"
import { Resp_Video } from "./types";
import { Toaster } from "sonner";
import Videos from "./components/home/VIdeos";
import './App.css'
import Upload from "./components/home/Upload";
function App() {
  const [videos, setVideos] = useState<Resp_Video[] | null>(null);
  const [loading, setLoading] = useState(true);
  async function getVideoResponse(){
    setLoading(true)
    const data = await getVideos();
    if(!data.error){
      setVideos(data.data.videos)
    }
    setLoading(false)
  }

  useEffect(() => {
    getVideoResponse()
  }, [])

  if(loading){
    <div>loading...</div>
  }
  return (
    <div>
      ChatyYT
      <Upload/>
      {
        videos && videos.length > 0 && <Videos videos={videos} />
      }
      <Toaster/>
    </div>
  )
}

export default App
