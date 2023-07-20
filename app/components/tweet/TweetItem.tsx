import Card from '../card/Card'
import BadgeCheckIcon from '../icons/BadgeCheckIcon'
import Image from 'next/image'
import {setUrlHashtagStyle} from '../../helpers/utilities'

const TweetItem = ({tweet}) => {
    const tweetMedia = tweet.media
    return <Card borderless={false} className="tweetItem">
        <a href={tweet.link} target="_blank" rel="nofollow noreferrer" className="current-color hover-current-color">
            <div className="info d-flex justify-content-between align-items-center align-content-center">
                <div className="d-flex align-items-center  align-content-center pb-2">
                    <div className="d-inline-block">
                        <Image width={50} height={50} src={tweet?.user?.avatar} className="avatar"
                               alt={tweet?.user?.name}/>
                    </div>
                    <div className="d-inline-block px-2">
                        <div className="d-flex align-items-center fw-bold">
                            <span className="pe-1">{tweet?.user?.name}</span>
                            <BadgeCheckIcon className="svgIcon twitter"/>
                        </div>
                        <div className="text-muted">
                            <span>@</span>{tweet?.user?.username}</div>
                    </div>
                </div>
            </div>
            <p className="tweet"
               dangerouslySetInnerHTML={{__html: (setUrlHashtagStyle(tweet.tweet))}}/>

            <div className="row">
                {
                    tweetMedia && (tweetMedia)?.map(item => {
                        return <div key={item.id} className={`col-md-${12 / tweetMedia.length}`}>
                            <Image layout="raw" height={400} width={400} alt={`${tweet.user.name} tweet`}
                                   style={{height: '400px', width: '100%', objectFit: 'cover'}}
                                   className="img-fluid thumbnail my-1 rounded-2" src={item.media_url_https}
                                   loading="lazy"/>
                        </div>

                    })}
            </div>
        </a>


    </Card>
}

export default TweetItem