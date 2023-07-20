import Card from '../card/Card'
import {generateNewsHref, getDate} from "../../helpers/utilities";

const PostItem = ({post}) => {
   return <>
      <Card className='postItem mb-2' borderless={false}>
         <img src={post?.thumbnail} width='100%' alt={post.title} loading='lazy'/>
         <a href={generateNewsHref(post.slug)}>
            <a>
               <div className='headText'>
                  <h2>
                     {post.title}
                  </h2>
                  <p className='desc' dangerouslySetInnerHTML={{__html: post.summary}}/>
               </div>
            </a>
         </a>

         <div>
            <a href={generateNewsHref(post.slug)} className='readMore'>
               <span className='more'>More</span>
               <i className='fas fa-angle-double-right'/>
            </a>
         </div>
         <p className='postItem--date'>Posted at {getDate(post.posted_date)}</p>
      </Card>
   </>
}

export default PostItem