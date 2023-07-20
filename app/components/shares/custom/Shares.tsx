import FacebookShareItem from './FacebookShareItem'
import {Stack} from 'react-bootstrap'
import TwitterShareItem from './TwitterShareItem'
import MessengerShareItem from './MessengerShareItem'
import PinterestShareItem from './PinterestShareItem'
import EmailShareItem from './EmailShareItem'

const Shares = () => {
   return <Stack className="shares" gap={2}>
      <FacebookShareItem/>
      <TwitterShareItem/>
      <MessengerShareItem/>
      <PinterestShareItem/>
      <EmailShareItem/>
   </Stack>
}

export default Shares