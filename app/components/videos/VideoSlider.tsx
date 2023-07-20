import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {CSSProperties} from 'react'
import Card from '../card/Card'
import {isValidArray} from '../../helpers/utilities'

const VideoSlider = ({videos}) => {
    if (!isValidArray(videos)) return null
    const arrowStyles: CSSProperties = {
        position: 'absolute',
        zIndex: 8,
        top: 'calc(36% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer'
    }
    return <Card>
        <div className="mb-2"><strong>Videos</strong></div>
        <Carousel
            showIndicators={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <span className="text-black-50 opacity-75" onClick={onClickHandler} title={label}
                          style={{...arrowStyles, left: 0}}>
                  <i className="fas fa-chevron-left" style={{fontSize: '150%'}}/>
               </span>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <span className="text-black-50 opacity-75" onClick={onClickHandler} title={label}
                          style={{...arrowStyles, right: 0, textAlign: 'right'}}>
                  <i className="fas fa-chevron-right" style={{fontSize: '150%'}}/>
               </span>
                )
            }
        >
            {
                videos.map(item => {
                    return <div key={item.id}>
                        <div dangerouslySetInnerHTML={{__html: item.embed}}/>
                        <h3 className="fs-5 text-sm-start">{item.title}</h3>
                        <p className="text-sm-start">{item.description}</p>
                    </div>
                })
            }

        </Carousel>
    </Card>
}

export default VideoSlider