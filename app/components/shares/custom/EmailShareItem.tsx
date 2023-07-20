const EmailShareItem = ({href = '#'}) => {
   return <a href={href} className="shareItem emailIcon">
      <i className="fas fa-envelope"/>
   </a>
}

export default EmailShareItem