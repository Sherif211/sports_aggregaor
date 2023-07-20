const PinterestShareItem = ({href = '#'}) => {
   return <a href={href} className="shareItem pinterestIcon">
      <i className="fab fa-pinterest"/>
   </a>
}

export default PinterestShareItem