type NextImageType = {
    alt: string
    title?: string
    src: string
    width?: string | number
    height?: string | number
    quality?: number
    className?: string
}

const CustomNextImage = ({
                             alt,
                             title = '',
                             src = '',
                             width = '100%',
                             height = '100%',
                             className = '',
                             quality = 35
                         }: NextImageType) => {
    return <img className={className} alt={alt} title={title}
                src={`/_next/image?url=${src}&w=${width === '100%' ? 1080 : 256}&q=${quality}`}
                width={width} height={height}/>
}

export default CustomNextImage