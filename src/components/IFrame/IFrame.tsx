import './IFrame.css'

export interface IFrameProps {
  src: string;
  title: string;
  caption?: string;
}

const IFrame = (props: IFrameProps) => {
  return (
    <>
      <div className='iframe-container'>
        <iframe
          src={props.src}
          title={props.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder={0}>
        </iframe>
      </div>
      {props.caption &&
        <p className='caption'>
          {props.caption}
        </p>
      }</>
  )
}

export default IFrame