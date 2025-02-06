import { Splat } from '../../../types/splats';
import SplatViewer, { DEFAULT_CAMERA_SETTINGS } from '../SplatViewer/SplatViewer';

import './SplatCard.css'

interface SplatProps {
    splat: Splat;
}

const SplatCard = ({ splat }: SplatProps) => {
    return (
        <div className='splat-card'>
            <div className='splat-title'>{splat.title}</div>
            <SplatViewer
                key={splat.id}
                url={splat.url}
                cameraSettings={DEFAULT_CAMERA_SETTINGS}
            />
            <div className='splat-description'>{splat.description}</div>
        </div>
    )
}

export default SplatCard