const MessengerShareItem = ({href = '#'}) => {
   return <a href={href} className="shareItem messengerIcon">
      <i className="fab fa-facebook-messenger"/>
   </a>
}

export default MessengerShareItem