import { Suspense, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BackgroundFog from '../components/Backgrounds/BackgroundFog';
import { Posts } from '../components/Posts/Posts';
import { PostsSkeleton } from '../components/Posts/PostsSkeleton';
import SplatCard from '../components/Splats/SplatCard/SplatCard';
import { Splat } from '../types/splats';

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
            <BackgroundFog highlightColor='#ff00ff' midtoneColor='#00ffff' lowlightColor='#7fff00' baseColor='#000000' />
            <div className='title'>Gaussian Explorer</div>
            <section>
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
                    <div className='content-section'>
                        <h2 className='section-title'>Posts</h2>
                        <Suspense fallback={<PostsSkeleton count={12} />}>
                            <Posts showNav={true} pageSize={12} maxPages={10} />
                        </Suspense>
                    </div>
                </div >
            </section>
            <footer>
                <h2>Gaussian Explorer</h2>
                <div className='footer-content'>
                    <span>
                        <a href="https://github.com/RomanCalderon/gs-explorer-web" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            
                            GitHub
                        </a>
                    </span>
                    <span>By <a href="https://romancalderon.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline' }}>Roman Calderon</a></span>
                </div>
            </footer>
        </>
    )
}

export default Home
