import {convertAgoFormat, generateBlogHref} from '../../helpers/utilities'

const BlogItem = ({blog}) => {
        return <article className={`p-3 bg-${process.env.NEXT_PUBLIC_THEME} mb-3`}>
        <a className="current-color w-100" href={generateBlogHref(blog.slug)}>
            <div>
                <h3 className="fs-5">{blog.title}</h3>
                <p dangerouslySetInnerHTML={{__html: blog.summary}}/>
            </div>
        </a>
        <div className="text-end">
            <time className="font-size-xsmall text-secondary px-2">{convertAgoFormat(blog.postedAt * 1000)}</time>
        </div>
    </article>
}

export default BlogItem