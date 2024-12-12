import { useEffect, useState } from "react"
import { getVideos } from "../../utils"
import { Resp_Video } from "../../types"
import { Toaster } from "sonner";
import Videos from "../../components/home/Videos";
import Upload from "../../components/home/Upload";
function Home() {
  const [videos, setVideos] = useState<Resp_Video[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchVideosToken, setFetchVideosToken] = useState(0);
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
  }, [fetchVideosToken])

  if(loading){
    <div>loading...</div>
  }
  return (
    <div>
      <div className="min-h-[80vh] pb-12 flex flex-col justify-center items-center gap-8 w-full">
        <Upload setReloadToken={setFetchVideosToken} />
        <Videos videos={videos} />
      </div>
      <Toaster/>
    </div>
  )
}

export default Home
