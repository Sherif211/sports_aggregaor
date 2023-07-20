import {Col, Row} from 'react-bootstrap'
import Card from '../../app/components/card/Card'
import {wrapper} from "../../store";
import {fetchBlogs} from "../../redux/actions/blogActions";
import {connect} from "react-redux";
import PostItem from "../../app/components/post/PostItem";
import {fetchNews} from "../../redux/actions/newsActions";

const Posts = ({news, pagination = true}) => {
   return <>
      <Card className='mt-2'>
         <Row>
             {
                 news.data?.map(item => {
                     return <Col key={item.id} md={6}>
                         <PostItem post={item}/>
                     </Col>
                 })
             }
         </Row>
         {
            pagination ? <div className='x-center mt-4'>
               {/*<Pagination/>*/}
            </div> : null
         }

      </Card>
   </>
}

export const getServerSideProps = wrapper.getServerSideProps(
    store => async (context) => {
       await store.dispatch(fetchNews())
       return {
          props: {}
       }

    }
)

const mapStateToProps = state => ({
   news: state.news.news
})

export default connect(mapStateToProps, null)(Posts)