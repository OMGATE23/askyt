import { useEffect, useRef, useState } from 'react';
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
  const [isFlashing, setIsFlashing] = useState(false);

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
      video.currentTime = startTime;
      video.play().catch(() => toast.error("Couldn't play the video"));
    }
  }, [startTime]);

  useEffect(() => {
    setIsFlashing(true);
    const timer = setTimeout(() => setIsFlashing(false), 1000);
    return () => clearTimeout(timer);
  }, [startTime]);

  return (
    <div className={`relative ${isFlashing ? 'flash' : ''}`}>
      <video
        ref={videoRef}
        width={width}
        controls={controls}
        autoPlay={autoPlay}
        className={className}
      />
    </div>
  );
};

export default HLSVideo;
