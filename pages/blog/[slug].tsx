import {wrapper} from '../../store'
import {connect} from 'react-redux'
import {convertAgoFormat, generateBlogHref} from '../../app/helpers/utilities'
import {fetchBlog} from '../../redux/actions/blogActions'
import BlogPageSEO from '../../app/seo/BlogPageSEO'
import {DOMAIN} from '../../app/constants'

const Blog = ({blog}) => {
    const paths = [
        {
            name: blog.title,
            url: `${DOMAIN}/${generateBlogHref(blog.slug)}`
        }
    ]
    return <>
        <BlogPageSEO blog={blog} paths={paths}/>
        <article className={`p-3 bg-${process.env.NEXT_PUBLIC_THEME} rounded`}>
            <h1 className="fs-2"><strong>{blog.title}</strong></h1>
            <div className="text-end p-2 text-secondary">
                <time className="font-size-xsmall">{convertAgoFormat(blog.updated_at)}</time>
            </div>
            <div id={"dynamic-content"} dangerouslySetInnerHTML={{__html: blog.content}}/>
        </article>
    </>


}

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const {slug} = context.params
    await store.dispatch(fetchBlog(slug))
    return {
        props: {}
    }
})

const mapStateToProps = state => ({
    blog: state.blog.blog
})

export default connect(mapStateToProps, null)(Blog)
