import IFrame from '../components/IFrame/IFrame'
import { Posts } from '../components/Posts/Posts'
import SplatFrame from '../components/SplatFrame/SplatFrame'
import backgroundImg from '/colorful-background.webp'

const Home = () => {
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
                <div className="card" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1em',
                    margin: '2em',
                }}>
                    <SplatFrame
                        src='https://my.spline.design/untitled-aebf5628e1fef1c7bd394b57e024a521/'
                        caption="Garden Flowers"
                    />
                    <div className='subtitle'>
                        This experimental project explores the application
                        of Gaussian splats in 3D content.
                        <br /><br />
                        Gaussian splats, a technique often used in computer graphics,
                        are utilized in this project to create, showcase and
                        manipulate 3D content in innovative ways.
                    </div>
                </div>
                <div className="card">
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
            </div >
        </>
    )
}

export default Home
