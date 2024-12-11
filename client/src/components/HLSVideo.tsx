import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { toast } from 'sonner';

interface Props {
  src: string;
  width?: string;
  controls?: boolean;
  autoPlay?: boolean;
  className?: string
}
const HLSVideo = ({ src, width = '300', controls = true, autoPlay = false, className = '' }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    console.log(src, Hls.isSupported())
    if(video !== null) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
  
        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error('HLS error', data);
        });
  
        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      } else {
        toast.error("Cannot play the video because your browser doesn't support HLS")
        console.error('HLS is not supported in this browser.');
      }
    }
    
  }, [src]);

  return (
    <video
      ref={videoRef}
      width={width}
      controls={controls}
      autoPlay={autoPlay}
      className={className}
    />
  );
};

export default HLSVideo;
