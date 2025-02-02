import { useEffect, useState } from 'react';
import { Posts } from '../components/Posts/Posts';
import SplatCard from '../components/Splats/SplatCard/SplatCard';
import { Splat } from '../types/splats';

import backgroundImg from '/colorful-background.webp'
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    const { data: splats, isLoading, isError, error } = useQuery<Splat[]>({
        queryKey: ['splats/user/647/v1'],
    });
    const [currentSplat, setCurrentSplat] = useState<Splat | null>(null);

    useEffect(() => {
        if (splats && splats.length > 0) {
            setCurrentSplat(splats[0]);
        }
    }, [splats]);

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
                {isLoading && <p>Loading splat...</p>}
                {isError && <p>Splat error: {error?.message}</p>}
                {currentSplat && <SplatCard splat={currentSplat} />}

                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <label htmlFor='splat-select'>Select a splat: </label>
                    <select
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

                <div className='subtitle'>
                    This experimental project explores the application
                    of 3D content through Gaussian splatting.
                    <br /><br />
                    I want to share how Gaussian splatting can be used to create,
                    showcase and manipulate context from our world in innovative ways.
                </div>
                <h2>Posts</h2>
                <Posts showNav={true} />
            </div >
        </>
    )
}

export default Home
