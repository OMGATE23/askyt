import { UploadIcon } from "@radix-ui/react-icons";

export default function Upload() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <input 
          className="outline outline-1 outline-neutral-300 w-[80%] max-w-[400px] py-1 px-2 rounded shadow" />
        <button 
        className="flex items-center gap-1 outline outline-1 bg-neutral-900 hover:bg-black shadow py-1 px-3 rounded text-white">
          <UploadIcon/>
          Upload
        </button>
      </div>
    </div>
  )
}
