const Badge = ({children, className}) => {
   return <span
      className={`px-3 py-1 rounded-pill ${className}`}>{children}</span>
}

export default Badge