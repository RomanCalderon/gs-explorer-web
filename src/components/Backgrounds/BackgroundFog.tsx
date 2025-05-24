import { useEffect, useState } from 'react'
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';

interface BackgroundFogProps {
  highlightColor?: string;
  midtoneColor?: string;
  lowlightColor?: string;
  baseColor?: string;
}

const BackgroundFog = ({
  highlightColor,
  midtoneColor,
  lowlightColor,
  baseColor
}: BackgroundFogProps) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: "#vanta-container",
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: highlightColor,
          midtoneColor: midtoneColor,
          lowlightColor: lowlightColor,
          baseColor: baseColor
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const NoiseFilter = () => (
    <svg style={{ position: 'fixed', pointerEvents: 'none' }}>
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
      </filter>
    </svg>
  );

  return (
    <>
      <div id='vanta-container'
        style={{
          zIndex: -2,
          position: 'absolute',
          top: -50,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          filter: 'blur(32px)',
          opacity: 0.65,
          maskImage:        'linear-gradient(to bottom, black 0%, transparent 90%)',
          WebkitMaskImage:  'linear-gradient(to bottom, black 0%, transparent 90%)', // For Safari, IE support
        }}
      />
      <NoiseFilter />
      <div
        style={{
          zIndex: -1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1,
          filter: 'url(#noiseFilter)', // Apply the filter to the div
        }}
      />
    </>
  )
}

export default BackgroundFog