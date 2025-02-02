import { useEffect, useRef, useState } from 'react';
import * as SPLAT from 'gsplat';

import './SplatViewer.css';

export interface CameraSettings {
  near: number;
  far: number;
}

interface SplatViewerProps {
  url: string | null;
  cameraSettings: CameraSettings | undefined;
}

const SplatViewer = ({ url, cameraSettings }: SplatViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<SPLAT.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SPLAT.Scene>(new SPLAT.Scene());
  const cameraRef = useRef<SPLAT.Camera>(new SPLAT.Camera());
  const controlsRef = useRef<SPLAT.OrbitControls | null>(null);
  const animationFrameRef = useRef<number>();
  const [progress, setProgress] = useState(0);

  if (!url) return <div className='invalid-url'>Invalid URL</div>

  useEffect(() => {
    if (!viewerRef.current) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(viewerRef.current);

    cleanup();

    // Initialize new scene and camera
    if (cameraSettings) {
      const cameraData = new SPLAT.CameraData();
      cameraData.near = cameraSettings.near ?? 0.1;
      cameraData.far = cameraSettings.far ?? 1000;
      cameraRef.current = new SPLAT.Camera(cameraData);
    }

    renderViewer(url);

    return () => {
      cleanup();
      if (viewerRef.current) {
        resizeObserver.unobserve(viewerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [url, cameraSettings]);

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    if (controlsRef.current) {
      controlsRef.current = null;
    }
    sceneRef.current.reset();
  };

  async function renderViewer(url: string) {
    await SPLAT.Loader.LoadAsync(url, sceneRef.current, (progress) => setProgress(progress));
    
    if (!canvasRef.current) return;
    
    rendererRef.current = new SPLAT.WebGLRenderer(canvasRef.current);
    controlsRef.current = new SPLAT.OrbitControls(cameraRef.current, rendererRef.current.canvas);

    const frame = () => {
      if (!controlsRef.current || !rendererRef.current) return;
      
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(frame);
    };

    animationFrameRef.current = requestAnimationFrame(frame);
  }

  const handleResize = () => {
    if (!viewerRef.current) return;
    const width = viewerRef.current.clientWidth;
    const height = viewerRef.current.clientHeight;
    rendererRef.current?.setSize(width, height);
    rendererRef.current?.resize();
    cameraRef.current.update();
  };

  return (
    <div className="splat-viewer" ref={viewerRef}>
      {progress < 1 && (
        <div className="splat-loader">
          {`Loading: ${(progress * 100).toFixed(2)}%`}
        </div>
      )}
      <canvas
        id="canvas"
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SplatViewer;
