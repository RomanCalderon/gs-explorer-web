import IFrame from "../components/IFrame/IFrame"
import { Posts } from "../components/Posts/Posts"
import SplatFrame from "../components/SplatFrame/SplatFrame"
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'

const Home = () => {
    return (
        <>
            <div className='title'>Gaussian Explorer</div>
            <div className='container'>
                <div className="card">
                    <SplatFrame
                        src='https://my.spline.design/untitled-aebf5628e1fef1c7bd394b57e024a521/'
                        caption="Garden Flowers"
                    />
                    <SplatFrame src='https://my.spline.design/untitled-81b577be40f2cc6e9576e5c777abb77d/'
                        caption="EXONAUT"
                    />
                    <SplatFrame
                        src='https://my.spline.design/untitled-6c032f1ebd91fc756fc1cc95f1f03815/'
                        caption="Bikes"
                    />
                    <SplatFrame
                        src='https://my.spline.design/jimny-0b583ed2786e02ca03b8dff3375c3b3d/'
                        caption="Jimny"
                    />
                    <SplatFrame
                        src='https://my.spline.design/untitled-ef3f680ca35f73545cc859d1d0d241bb/'
                        caption="3D gaussian splat of my classical guitar rendered in Spline"
                    />
                    <IFrame
                        src="https://www.youtube.com/embed/tkU6TRtD1tY"
                        title="Spanish Romance - Classical Guitar Gaussian Splat Render"
                        caption="...and the same guitar rendered in Unity"
                    />
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
            </div>
        </>
    )
}

export default Home
