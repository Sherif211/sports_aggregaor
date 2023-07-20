import {Col, Row} from 'react-bootstrap'
// import Shares from '../../app/components/shares/custom/Shares'
// import RelatedPostItem from '../../app/components/post/RelatedPostItem'
import Card from '../../app/components/card/Card'
import {wrapper} from "../../store";
import {connect} from "react-redux";
import {fetchNew} from "../../redux/actions/newsActions";
import {getDate} from "../../app/helpers/utilities";
import {LogoJsonLd, NextSeo} from "next-seo";
import {APP_NAME, DOMAIN} from "../../app/constants";
import {withRouter} from "next/router";

const Post = (props) => {
   const post = props.post
   return <>

      <NextSeo
          title={post.title}
          canonical={ DOMAIN + props.router.asPath}
          openGraph={{
             type: 'website',
             url: DOMAIN + props.router.asPath,
             title: post.title,
             images: [
                {
                   url: post.thumbnail,
                   width: 96,
                   height: 96,
                   alt: post.title
                }
             ]
          }}
          twitter={{
             cardType: 'summary'
          }}
      />
      <Row className="my-3">
         <Col md={12} className="mb-3">
            <Card borderless={false}>
               <article className="post">
                  <h1>
                     {post.title}
                  </h1>
                  <img src={post.thumbnail} className={"img-fluid"} alt={post.title}/>
                  <Row>
                     {/*<Col md={2}>*/}
                     {/*   <Shares/>*/}
                     {/*</Col>*/}
                     <Col md={12}>
                        <div className="postDetail">
                           <small>
                              <strong>Admin</strong>
                           </small>
                           <small>
                              <time>
                                 {getDate(post.posted_date)}
                              </time>
                           </small>
                        </div>
                        <hr/>
                        <p className="textBody" dangerouslySetInnerHTML={{__html: post.summary}}></p>
                        <a href={post.link} target={"_blank"} rel={"noreferrer noopener"}>Read More</a>
                     </Col>
                  </Row>
               </article>
            </Card>
         </Col>
         {/*<Col md={3}>*/}
         {/*   <aside className="relatedPosts">*/}
         {/*      <Card borderless={false}>*/}
         {/*         <b>related posts</b>*/}
         {/*         <hr/>*/}
         {/*         <RelatedPostItem/>*/}
         {/*      </Card>*/}

         {/*   </aside>*/}
         {/*</Col>*/}
      </Row>
   </>
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
   const {slug} = context.params
   await store.dispatch(fetchNew(slug))
   return {
      props: {}
   }
})


const mapStateToProps = state => ({
   post: state.news.singleNews
})

export default withRouter(connect(mapStateToProps, null)(Post))