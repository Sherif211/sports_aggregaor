import TweetItem from './TweetItem'
import {Col, Row} from 'react-bootstrap'
import Card from '../card/Card'
import {isValidArray} from '../../helpers/utilities'
import {memo} from 'react'

const Wrapper = ({children, cols, type = 'row'}) => {
    if (type === 'row') {
        return <>
            {
                cols > 0 ? <Row>
                    {children}
                </Row> : <>{children}</>
            }
        </>
    }
    return <>
        {
            cols > 0 ? <Col md={cols}>
                {children}
            </Col> : <>{children}</>
        }
    </>

}


const Tweets = ({tweets, cols = 0}) => {
    if (!isValidArray(tweets)) return null
    return <Card className="mb-2">
        <div><strong>Tweets</strong></div>
        <div className="tweets my-2">
            <Wrapper cols={cols}>
                {
                    tweets?.map((tweet, index) => {
                        return <Wrapper key={`tweet.user.username${index}`} cols={cols} type="col"><TweetItem
                            tweet={tweet}/></Wrapper>
                    })
                }
            </Wrapper>
        </div>
    </Card>

}
export default memo(Tweets)