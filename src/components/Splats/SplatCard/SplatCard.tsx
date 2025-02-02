import { Splat } from '../../../types/splats';
import SplatViewer, { CameraSettings } from '../SplatViewer/SplatViewer';

import './SplatCard.css'

interface SplatProps {
    splat: Splat;
}

const defaultCameraSettings: CameraSettings = {
    near: 2,
    far: 50,
};

const SplatCard = ({ splat }: SplatProps) => {
    return (
        <div className='splat-card'>
            <div className='splat-title'>{splat.title}</div>
            <SplatViewer
                key={splat.id}
                url={splat.url}
                cameraSettings={defaultCameraSettings}
            />
            <div className='splat-description'>{splat.description}</div>
        </div>
    )
}

export default SplatCard