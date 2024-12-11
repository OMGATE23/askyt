import { Resp_Video } from "../../types"
import HLSVideo from "../HLSVideo"

interface Props {
  videos: Resp_Video[]
}

export default function Videos(props: Props) {
  return (
    <div>
      <h2 className="text-4xl text-center mb-8 font-semibold">Your Videos</h2>
      {
        props.videos.length > 0 ? (
          <div className="grid-container">
            {
              props.videos.map((video) => (
                <div className="flex flex-col items-center gap-2" key={video.id}>
                  <HLSVideo 
                    width="0"
                    className="w-[400px] rounded"
                    src={video.player_url.replace(import.meta.env.VITE_IMG_STARTER, '')} 
                  />
                  <p>{video.title}</p>
                </div>
              ))
            }
          </div>
        ) : (
          <div>No videos uploaded yet</div>
        )
      }
    </div>
  )
}
