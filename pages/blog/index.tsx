import {connect} from 'react-redux'
import {wrapper} from '../../store'
import {fetchBlogs} from '../../redux/actions/blogActions'
import BlogItem from '../../app/components/blog/BlogItem'
import BlogIndexPageSEO from '../../app/seo/BlogIndexPageSEO'


const Blogs = ({blogs}) => {

    return <>
        <BlogIndexPageSEO/>
        <div className="flex my-4">
            {
                blogs.map(blog => {
                    return <BlogItem key={blog.slug} blog={blog}/>
                })
            }
        </div>
    </>

}


export const getServerSideProps = wrapper.getServerSideProps(
    store => async (context) => {
        await store.dispatch(fetchBlogs())
        return {
            props: {}
        }

    }
)

const mapStateToProps = state => ({
    blogs: state.blog.blogs
})

export default connect(mapStateToProps, null)(Blogs)

