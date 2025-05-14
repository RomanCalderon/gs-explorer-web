import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import BackgroundFog from '../../components/Backgrounds/BackgroundFog';
import { Posts } from '../../components/Posts/Posts';
import { PostsSkeleton } from '../../components/Posts/PostsSkeleton';
import SplatCard from '../../components/Splats/SplatCard/SplatCard';
import { Splat } from '../../types/splats';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';

import './Home.css'

const Home = () => {
    const { data: splats, isLoading, isError, error } = useQuery<Splat[]>({
        queryKey: ['splats/user/647/v1'],
    });

    const showcaseSplats = () => {
        if (isLoading) {
            return <p>Loading splat...</p>
        }
        if (isError) {
            return <p>Splat error: {error?.message}</p>
        }
        return <SplatCard splats={splats || []} styleMode='normal' />
    }

    return (
        <>
            <BackgroundFog highlightColor='#ff00ff' midtoneColor='#00ffff' lowlightColor='#7fff00' baseColor='#000000' />
            <div className='title'>Gaussian Explorer</div>
            <section>
                <div className='container'>
                    <ErrorBoundary>
                        {showcaseSplats()}
                    </ErrorBoundary>
                    <div className='subtitle'>
                        This experimental project explores the application
                        of 3D content through Gaussian splatting.
                        <br /><br />
                        I want to share how Gaussian splatting can be used to create,
                        showcase and manipulate context from our world in innovative ways.
                    </div>
                    <div className='content-section'>
                        <h2 className='section-title'>Posts</h2>
                        <ErrorBoundary >
                            <Suspense fallback={<PostsSkeleton count={12} />}>
                                <Posts showNav={true} pageSize={12} maxPages={10} />
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                </div >
            </section>
            <footer>
                <h2>Gaussian Explorer</h2>
                <div className='footer-content'>
                    <span>
                        <a href="https://github.com/RomanCalderon/gs-explorer-web" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-primary)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img src="/github-mark-white.svg" alt="GitHub" style={{ width: '24px', height: '24px' }} />
                        </a>
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Home
