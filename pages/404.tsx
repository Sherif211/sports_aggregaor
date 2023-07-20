import {connect} from 'react-redux'
import Link from 'next/link'

const NotFoundPage = (props) => {
   return <div className='row'>
      <div id='link404' className='col-12 text-center'>
         <h1 style={{fontSize: '100px'}} className='text-center'>404</h1>
         <br/>
         <p>
            The page you are looking for may be removed or the game has ended,
            Please check the home for the <Link href='/'><a>{props.sportData.logo} schedule</a></Link>
         </p>
         <br/>
         <Link href='/'>
            <a>
               <h3>Go To Home Page</h3>
            </a>
         </Link>
      </div>
   </div>
}

const mapStateToProps = state => ({
   sportData: state.sport.sportData
})

export default connect(mapStateToProps, {})(NotFoundPage)
