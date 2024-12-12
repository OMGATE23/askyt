import { Link } from "react-router-dom"
import { Resp_Video } from "../../types"
import HLSVideo from "../HLSVideo"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import '../../App.css'
interface Props {
  videos: Resp_Video[] | null
}

export default function Videos(props: Props) {
  return (
    <div>
      <h2 className="text-4xl text-center mb-8 font-semibold">Your Videos</h2>
      {
        props.videos === null && (
          <div className="grid gap-4 mx-4 grid-cols-1 md:grid-cols-2">
            <div className="h-[200px] aspect-video rounded w-full animate-pulse bg-neutral-300" />
            <div className="h-[200px] aspect-video rounded w-full animate-pulse bg-neutral-300"/>
          </div>
        )
      }
      {
        props.videos !== null && props.videos.length > 0 && (
          <div className="grid gap-4 mx-4 grid-cols-1 md:grid-cols-2">
            {
              props.videos.map((video) => (
                <div className="flex flex-col items-center gap-2" key={video.id}>
                  <HLSVideo 
                    width="0"
                    className="w-[400px] rounded"
                    src={video.player_url.replace(import.meta.env.VITE_IMG_STARTER, '')} 
                  />
                  <Link 
                    to={`/search/${video.id}`}
                    className="flex items-center gap-2 hover:text-blue-800"
                  >
                    {video.title} 
                    <MagnifyingGlassIcon className="size-5"/>
                  </Link>
                </div>
              ))
            }
          </div>
        )
      }
      {
        props.videos && props.videos.length === 0 && (
          <div>No videos uploaded yet!</div>
        )
      }
    </div>
  )
}
