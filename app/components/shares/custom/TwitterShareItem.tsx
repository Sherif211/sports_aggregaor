const TwitterShareItem = ({href = '#'}) => {
   return <a href={href} className="shareItem twitterIcon">
      <i className="fab fa-twitter"/>
   </a>
}

export default TwitterShareItem