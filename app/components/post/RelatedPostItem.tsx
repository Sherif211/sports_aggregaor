import Link from 'next/link'

const RelatedPostItem = () => {
   return <div className="relatePostItem">
      <img src="https://streamsgate.net/uploads/1639407203pasted%20image%200.png" width={60} height={60}/>
      <h6>
         <Link href="#">
            <a>
               Tottenham-Rennes postponed due to a covid outbreak. "We're scared," Conte claimed.
            </a>
         </Link>
      </h6>
      <p>Cristiano Ronaldo and Richard Hughes are two of the best players in the world The former won five Ballons d'Or,
         while the latter had a modest career</p>
   </div>
}

export default RelatedPostItem