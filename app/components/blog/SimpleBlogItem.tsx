import {convertAgoFormat, generateBlogHref} from '../../helpers/utilities'

const SimpleBlogItem = ({blog}) => {
    return <div className={`p-2 bg-${process.env.NEXT_PUBLIC_THEME} mb-1`}>
        <a className="current-color w-100" href={generateBlogHref(blog.slug)}>
            <img src={blog.thumbnail} className="img-fluid" alt="" style={{marginBottom:'10px',borderRadius:'10px'}}/>
            <h3 className="fs-6">{blog.title}</h3>
            <p className="font-size-xsmall text-secondary" dangerouslySetInnerHTML={{__html: `${blog.summary}...`}}/>
        </a>
        <div className="text-end">
            <time className="font-size-xsmall text-secondary">{convertAgoFormat(blog.postedAt * 1000)}</time>
        </div>
    </div>
}

export default SimpleBlogItem