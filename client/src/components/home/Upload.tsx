import { UploadIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface Props {
  setReloadToken: Dispatch<SetStateAction<number>>;
}

export default function Upload(props: Props) {
  const [url, setUrl] = useState('');

  async function uploadVideo() {
    if (!url) return;

    toast.loading("Uploading video...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/videos/upload?url=${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Video uploaded successfully!`);
      } else {
        toast.error(`Upload failed: ${result.error}`);
      }

      props.setReloadToken(Math.random());
    } catch {
      toast.error(`Oops! Couldn't upload the video`);
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Youtube Link"
          className="outline outline-1 outline-neutral-300 w-[80%] max-w-[400px] py-1 px-2 rounded shadow" />
        <button 
          onClick={uploadVideo}
          disabled={url === ''}
          className="flex items-center gap-1 outline outline-1 bg-neutral-900 hover:bg-black disabled:bg-neutral-700 shadow py-1.5 px-5 rounded-full text-white">
          <UploadIcon />
          Upload
        </button>
      </div>
    </div>
  );
}
