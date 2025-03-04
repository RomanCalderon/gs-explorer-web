import { useEffect, useState } from 'react';
import { Splat } from '../../../types/splats';
import SplatViewer, { DEFAULT_CAMERA_SETTINGS } from '../SplatViewer/SplatViewer';

import './SplatCard.css'
import './SplatCard.Outline.css'

interface SplatProps {
    splats: Splat[];
    styleMode: 'outline' | 'normal';
}

const SplatCard = ({ splats, styleMode = 'normal' }: SplatProps) => {
    const [currentSplat, setCurrentSplat] = useState<Splat | null>(splats[0]);
    const [isOutlineMode, setIsOutlineMode] = useState(styleMode === 'outline');

    useEffect(() => {
        if (splats && splats.length > 0) {
            setCurrentSplat(splats[0]);
        }
    }, [splats]);

    return (
        <div className={`splat-card ${isOutlineMode && 'outline'}`}>
            <SplatViewer
                key={currentSplat?.id}
                url={currentSplat?.url || null}
                cameraSettings={DEFAULT_CAMERA_SETTINGS}
            />
            <div className='splat-card-content-wrapper'>
                <div className='splat-card-content'>
                    <div className='splat-card-header'>
                        <select
                            className='splat-title'
                            value={currentSplat?.id || ''}
                            onChange={(e) => {
                                const selected = splats?.find(splat => splat.id == e.target.value);
                                if (selected) setCurrentSplat(selected);
                            }}
                        >
                            {splats?.map(splat => (
                                <option key={splat.id} value={splat.id}>
                                    {splat.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='splat-description'>{currentSplat?.description}</div>
                </div>

                <div className="splat-card-controls">
                    <div className='style-switcher'>
                        <input
                            type='checkbox'
                            id={`style-switcher-${currentSplat?.id}`}
                            checked={isOutlineMode}
                            onChange={(e) => setIsOutlineMode(e.target.checked)}
                        />
                        <label htmlFor={`style-switcher-${currentSplat?.id}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplatCard