import './SplatFrame.css'

export interface SplatFrameProps {
  src: string;
  caption?: string;
}

const SplatFrame = (props: SplatFrameProps) => {
  return (
    <>
      <div className='splat-frame-container'>
        <iframe
          src={props.src}
          frameBorder='0'
          width='100%'
          height='100%'>
        </iframe>
      </div>
      {props.caption &&
        <p className='caption'>
          {props.caption}
        </p>
      }
    </>
  )
}

SplatFrame.propTypes = {}

export default SplatFrame