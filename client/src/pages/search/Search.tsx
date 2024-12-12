import { useState } from "react";
import { toast } from "sonner";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Resp_Search_Results } from "../../types";
import { getVideo } from "../../utils";
import HLSVideo from "../../components/HLSVideo";
import StaggeredText from "../../components/StaggeredText";

export default function Search() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<Resp_Search_Results[]>([]);
  const [loading, setLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState<{ url: string, title: string, id: string } | null>(null);
  const [videoStart, setVideoStart] = useState(0);
  const handleSearch = async () => {
    if (!prompt) {
      toast.error("Prompt cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search?prompt=${encodeURIComponent(prompt)}`);
      const data = await response.json();

      if (response.ok) {
        if (!Array.isArray(data.results)) {
          toast.error("Couldn't get ehat you were searching for")
          return;
        }
        const results = data.results as Resp_Search_Results[]
        setResults(results);
        toast.success("Search successful!");
        const video_id = results[0].video_id;
        const startTime = results[0].start;
        const videoData = await getVideo(video_id);

        if (videoData.error) {
          toast.error("Couldn't load the video");
          return;
        }

        setVideoSrc({
          url: videoData.data.player_url.replace(import.meta.env.VITE_IMG_STARTER, ''),
          title: videoData.data.title,
          id: video_id
        });

        setVideoStart(startTime);
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch {
      toast.error("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Search Across Videos</h1>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex justify-center items-center w-full gap-4">
            <div className="w-full max-w-[420px] flex items-center border rounded-full p-2">
              <input
                type="text"
                className="flex-grow outline-none w-full px-2"
                placeholder="Enter your search prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <button
              className="flex items-center bg-neutral-800 text-white px-4 py-2 rounded-full hover:bg-neutral-950"
              onClick={handleSearch}
              disabled={loading}
            >
              <MagnifyingGlassIcon className="mr-1 size-5" />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="mt-6 w-[70%]">
            <h2 className="text-lg font-semibold">
              { results.length > 0 ? "Results:" : "Search anything, and we will find it from your videos!"}
            </h2>
            {!loading ? (
              <div className="flex w-full">
                <ul className="list-none ml-5 w-[60%]">
                  {results.map((result, index) => (
                    <li key={index} className="mb-2">
                      <p className="text-blue-400">{result.name}</p>
                      <StaggeredText className="mt-4" text={result.text} />
                    </li>
                  ))}
                </ul>
                {
                  videoSrc  && (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <HLSVideo
                        startTime={videoStart}
                        width="0"
                        className="w-[400px] rounded"
                        src={videoSrc.url.replace(import.meta.env.VITE_IMG_STARTER, '')}
                      />
                      <h2 className="text-xl text-neutral-800 font-semibold">{videoSrc.title}</h2>
                    </div>
                  )
                }
              </div>
              
            ) : (
              <div className="animate-pulse flex flex-col gap-1 w-[50%]">
                <div className="h-3 rounded-full bg-neutral-200"></div>
                <div className="flex items-center justify-between gap-4">
                  <div className="h-3 rounded-full w-[60%] bg-neutral-200"></div>
                  <div className="h-3 rounded-full w-[40%] bg-neutral-200"></div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="h-3 rounded-full w-[30%] bg-neutral-200"></div>
                  <div className="h-3 rounded-full w-[40%] bg-neutral-200"></div>
                  <div className="h-3 rounded-full w-[30%] bg-neutral-200"></div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
