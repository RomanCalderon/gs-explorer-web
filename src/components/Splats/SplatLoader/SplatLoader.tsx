import './SplatLoader.css';

export interface SplatLoaderProps {
  progress: number;
  radius: number;
  strokeWidth: number;
  color: string;
}

const SplatLoader = ({
  progress,
  radius,
  strokeWidth,
  color
}: SplatLoaderProps) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="splat-loader">
      <div className="loader-overlay">
        <div className="loader-content">
          <svg className="progress-ring" width={radius * 2} height={radius * 2}>
            <circle
              className="progress-ring-circle-bg"
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius - strokeWidth / 2}
              cx={radius}
              cy={radius}
            />
            <circle
              className="progress-ring-circle"
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius - strokeWidth / 2}
              cx={radius}
              cy={radius}
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: strokeDashoffset
              }}
            />
          </svg>
          <div className="loader-text">
            {`${Math.round(progress * 100)}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplatLoader;