import { useEffect, useRef, useState } from 'react';
import * as SPLAT from 'gsplat';

import './SplatViewer.css';

const scene = new SPLAT.Scene();
let camera = new SPLAT.Camera();
let renderer: SPLAT.WebGLRenderer;
let controls: SPLAT.OrbitControls;

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
  const [progress, setProgress] = useState(0);

  if (!url) return <div className='invalid-url'>Invalid URL</div>

  useEffect(() => {
    if (!viewerRef.current) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(viewerRef.current);

    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    scene.reset();

    if (cameraSettings) {
      const cameraData = new SPLAT.CameraData();
      cameraData.near = cameraSettings.near ?? 0.1;
      cameraData.far = cameraSettings.far ?? 1000;
      camera = new SPLAT.Camera(cameraData);
    }

    renderViewer(url);

    return () => {
      resizeObserver.disconnect();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      scene.reset();
    };
  }, [url, cameraSettings]);

  async function renderViewer(url: string) {
    await SPLAT.Loader.LoadAsync(url, scene, (progress) => setProgress(progress));
    renderer = new SPLAT.WebGLRenderer(canvasRef.current);
    controls = new SPLAT.OrbitControls(camera, renderer.canvas);
    rendererRef.current = renderer;

    const frame = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  const handleResize = () => {
    if (!viewerRef.current) return;
    const width = viewerRef.current.clientWidth;
    const height = viewerRef.current.clientHeight;
    rendererRef.current?.setSize(width, height);
    rendererRef.current?.resize();
    camera.update();
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
