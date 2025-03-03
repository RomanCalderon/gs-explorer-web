import { Splat } from '../../../types/splats';
import SplatViewer, { DEFAULT_CAMERA_SETTINGS } from '../SplatViewer/SplatViewer';
import { useState } from 'react';

import './SplatCard.css'
import './SplatCard.Outline.css'

interface SplatProps {
    splat: Splat;
    styleMode: 'outline' | 'normal';
}

const SplatCard = ({ splat, styleMode = 'normal' }: SplatProps) => {
    const [isOutlineMode, setIsOutlineMode] = useState(styleMode === 'outline');

    return (
        <div className={`splat-card ${isOutlineMode && 'outline'}`}>
            <SplatViewer
                key={splat.id}
                url={splat.url}
                cameraSettings={DEFAULT_CAMERA_SETTINGS}
            />
            <div className='splat-card-content-wrapper'>
                <div className='splat-card-content'>
                    <div className='splat-card-header'>
                        <div className='splat-title'>{splat.title}</div>
                    </div>
                    <div className='splat-description'>{splat.description}</div>
                </div>

                <div className="splat-card-controls">
                    <div className='style-switcher'>
                        <input
                            type='checkbox'
                            id={`style-switcher-${splat.id}`}
                            checked={isOutlineMode}
                            onChange={(e) => setIsOutlineMode(e.target.checked)}
                        />
                        <label htmlFor={`style-switcher-${splat.id}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplatCard