import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Resp_Search_Results } from "../../types";
import HLSVideo from "../../components/HLSVideo";
import StaggeredText from "../../components/StaggeredText";

export default function VideoSearch() {
  const { video_id } = useParams<{ video_id: string }>();
  const [video, setVideo] = useState<{ player_url: string, name: string } | null>(null);
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<Resp_Search_Results[]>([]);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setVideoLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/video?video_id=${video_id}`);
        const data = await response.json();

        if (response.ok && data.player_url) {
          setVideo({ player_url: data.player_url, name: data.name });
        } else {
          toast.error(data.error || "Video not found.");
        }
      } catch {
        toast.error("Failed to fetch video.");
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideo();
  }, [video_id]);

  const handleSearch = async () => {
    if (!prompt) {
      toast.error("Prompt cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/search/${video_id}?prompt=${encodeURIComponent(prompt)}`
      );
      const data = await response.json();

      if (response.ok) {
        const results = data.results as Resp_Search_Results[];
        setStartTime(results[0].start);
        setResults(results);
        toast.success("Search successful!");
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch {
      toast.error("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  if(videoLoading){
    return <></>
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Search</h1>

      {video ? (
        <div className="flex flex-col md:flex-row-reverse w-full justify-center">
          <div className="flex flex-col items-center gap-2">
            <HLSVideo
              startTime={startTime}
              width="0"
              className="w-[400px] rounded"
              src={video.player_url.replace(import.meta.env.VITE_IMG_STARTER, '')}
            />
            <h2 className="text-xl text-neutral-800 font-semibold">{video.name}</h2>
          </div>
          <div className="md:w-[50%]">
            <div className="flex items-center w-full gap-2">
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

            <div className="mt-6 w-full max-w-md">
              <h2 className="text-lg font-semibold">Results:</h2>
              {!loading ? <ul className="list-disc ml-5">
                {results.map((result, index) => (
                  <li key={index} className="mb-2">
                    <p>{result.name}</p>
                    <StaggeredText className="text-neutral-700" text={result.text} />
                  </li>
                ))}
              </ul> : (
                <div className="animate-pulse flex flex-col gap-1">
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
      ) : (
        <div className="text-red-500">
          <p>Video not found. Please check the video ID.</p>
        </div>
      )}
    </div>
  );
}
