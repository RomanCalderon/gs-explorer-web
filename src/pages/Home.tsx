import { Posts } from "../components/Posts/Posts"
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'

const Home = () => {
    return (
        <>
            <div className='title'>Gaussian Explorer</div>
            <div className='container'>
                <div className="card">
                    <div className='iframe-container'>
                        <iframe
                            src="https://www.youtube.com/embed/tkU6TRtD1tY"
                            title="Spanish Romance - Classical Guitar Gaussian Splat Render"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            frameBorder={0}>
                        </iframe>
                    </div>
                    <p className='caption'>
                        3D gaussian splat of my classical guitar rendered in Unity
                    </p>
                    <div className='iframe-container'>
                        <iframe
                            src='https://my.spline.design/untitled-ef3f680ca35f73545cc859d1d0d241bb/'
                            frameBorder='0'
                            width='100%'
                            height='100%'>
                        </iframe>
                    </div>
                    <p className='caption'>
                        ...and the same guitar rendered in Spline
                    </p>
                    <div className='iframe-container'>
                        <iframe
                            src='https://my.spline.design/untitled-81b577be40f2cc6e9576e5c777abb77d/'
                            frameBorder='0'
                            width='100%'
                            height='100%'>
                        </iframe>
                    </div>
                    <p className='caption'>
                        EXONAUT
                    </p>
                </div>
                <h2>Posts</h2>
                <Posts showNav={true} />
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </>
    )
}

export default Home
