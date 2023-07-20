import SimpleBlogItem from '../blog/SimpleBlogItem'
import Card from '../card/Card'
import {memo} from 'react'

const Blogs = ({blogs}) => {
    return <Card className="mb-3">
        <div className="mb-2">
            <a className="current-color pe-3" href={`/${process.env.NEXT_PUBLIC_BLOG_BASE_ROUTE}`}>
                <strong>Blog</strong>
            </a>

        </div>
        {
            blogs.map((blog, index) => {
                return <div key={blog.slug}>
                    <SimpleBlogItem blog={blog}/>
                    {blogs.length !== index + 1 && <hr className="my-1"/>}
                </div>
            })
        }
    </Card>

}

export default memo(Blogs)