import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { toast } from 'sonner';
import '../App.css'

interface Props {
  src: string;
  width?: string;
  controls?: boolean;
  autoPlay?: boolean;
  className?: string;
  startTime?: number;
}

const HLSVideo = ({
  src,
  width = '300',
  controls = true,
  autoPlay = false,
  className = '',
  startTime = 0,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video !== null) {
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
        toast.error("Cannot play the video because your browser doesn't support HLS");
        console.error('HLS is not supported in this browser.');
      }
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && startTime > 0) {
      console.log('Changing start time', startTime)
      video.currentTime = startTime;
      video.play().catch(() => console.log("Couldn't play the video"));
    }
  }, [startTime]);

  return (
    <div className='p-4'>
      <video
        ref={videoRef}
        width={width}
        controls={controls}
        autoPlay={autoPlay}
        className={`${className} ${startTime > 0 && 'flash-effect'}`}
      />
    </div>
  );
};

export default HLSVideo;
