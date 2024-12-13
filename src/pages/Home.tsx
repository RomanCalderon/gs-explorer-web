import { useState } from 'react'

import { Card } from '../components/Card/Card';
import IFrame from '../components/IFrame/IFrame'
import { Posts } from '../components/Posts/Posts'
import SplatViewer, { CameraSettings } from '../components/SplatViewer/SplatViewer';

import backgroundImg from '/colorful-background.webp'

const defaultCameraSettings: CameraSettings = {
    near: 2,
    far: 50,
};
interface Splat {
    id: string;
    name: string;
    url: string;
}
const splats: Splat[] = [
    { id: 'bikes_3', name: 'Bikes', url: 'postshot/bikes/bikes_3.splat' },
    { id: 'ford-gt', name: 'Ford GT', url: 'postshot/ford-gt/ford-gt.splat' },
    { id: 'm235', name: 'M235i', url: 'postshot/m235/m235.splat' },
    { id: 'flowers1', name: 'Flowers', url: 'postshot/flowers1/flowers1.splat' },
    { id: 'guitar-1', name: 'Classic Acoustic Guitar', url: 'postshot/guitar-1/guitar-1.splat' },
];

const Home = () => {
    const [currentSplat, setCurrentSplat] = useState<Splat>(splats[0]);

    return (
        <>
            <div
                style={{
                    zIndex: -1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        `linear-gradient(to bottom,
                            rgba(0, 0, 0, 0.7),
                            rgba(16, 17, 20, 0),
                            rgba(16, 17, 20, 0),
                            rgba(16, 17, 20, 1.5)),
                        url(${backgroundImg})
                        no-repeat 50% 0`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className='title'>Gaussian Explorer</div>

            <div className='container'>
                <Card>
                    <SplatViewer
                        url={`https://huggingface.co/datasets/roman-apollo/3dgs/resolve/main/${currentSplat.url}`}
                        cameraSettings={defaultCameraSettings} />
                    {splats.map((splat) => (
                        <button key={splat.id} onClick={() => setCurrentSplat(splat)}>{splat.name}</button>
                    ))}
                </Card>
                <div className='subtitle'>
                    This experimental project explores the application
                    of 3D content through Gaussian splatting.
                    <br /><br />
                    I want to share how Gaussian splatting can be used to create,
                    showcase and manipulate context from our world in innovative ways.
                </div>
                <Card>
                    <IFrame
                        src="https://www.youtube.com/embed/tkU6TRtD1tY"
                        title="Spanish Romance - Classical Guitar Gaussian Splat Render"
                        caption="...and the same guitar rendered in Unity"
                    />
                </Card>
                <h2>Posts</h2>
                <Posts showNav={true} />
            </div >
        </>
    )
}

export default Home
