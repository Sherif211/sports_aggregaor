const FacebookShareItem = ({href = '#'}) => {
   return <a href={href} className="shareItem facebookIcon">
      <i className="fab fa-facebook-square"/>
   </a>
}

export default FacebookShareItem