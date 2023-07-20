import {Alert} from 'react-bootstrap'
import {memo, useEffect, useState} from 'react'
import ApiInterface from '../../helpers/ApiInterface'

const NordComponent = (props) => {
    const [show, setShow] = useState(true)
    const [ipData, setIPData] = useState<any>({})
    const link = process.env.NEXT_PUBLIC_PREMIUM_SERVICE_LINK
    useEffect(() => {
        try {
            ApiInterface.instance
                .get(process.env.NEXT_PUBLIC_GEO_API)
                .then(res => {
                    setIPData(res.data)
                    setTimeout(function () {
                        if (res.data.country_code == 'US') {
                            let sponsoredElement = document.getElementById('sponsored-stream')
                            if (sponsoredElement) {
                                sponsoredElement.style.display = ''
                            }
                        }
                    }, 200)
                }).catch(e => {
                console.error(e)
            })
        } catch (e) {
            console.error(e)
        }
    }, [])
    if (!link) return null

    if (!Object.keys(ipData).length) return <div id='nordd'/>
    let city = ''
    if (ipData.city !== 'Unknown') {
        city = `Near ${ipData.city}, `
    }
    if (ipData.protected) {
        return <Alert dismissible onClose={() => setShow(false)} show={show} variant='success'>
            <div className='text-center' id='nd-com'>
                <p className='text-center mb-0'>
                    Your IP: {ipData.ip} Location: <span>Country: {ipData.country} {city}</span> ~ You are protected
                </p>
            </div>
        </Alert>
    }

    let textColor = '#18345c'
    let ipColor = '#ff3a82'
    if (props.darkTheme) {
        textColor = '#ffc107'
    }
    return <div className='container' id='stand-with-uk'>
        <div className='row'>
            <div className='col-12'>
                <div className='text-center mb-3 mt-3'
                     style={{
                         border: '2px solid ' + ipColor,
                         borderRadius: '20px', padding: '25px', fontWeight: 'bold',
                         backgroundColor: props.darkTheme ? '#121212' : 'transparent',
                         color: textColor,
                         position: 'relative'
                     }}>
                    <div style={{fontSize: '20px'}} className='mb-3'><span
                        style={{color: props.darkTheme ? '#fff' : textColor}}>YOUR IP AND LOCATION ARE EXPOSED! </span>
                    </div>
                    <div style={{
                        color: ipColor,
                        position: 'relative',
                        overflow: 'hidden',
                        overflowWrap: 'break-word'
                    }}>{ipData.ip}</div>
                    <div style={{color: ipColor}} className='mb-2'>{city} {ipData.country}</div>
                    <div style={{textTransform: 'uppercase'}} className='mb-3'><span
                        style={{color: props.darkTheme ? '#fff' : textColor}}>Protect yourself while streaming, always. </span>
                    </div>
                    <div>
                        <a href={link} target='_blank' className='btn' style={{
                            backgroundColor: ipColor,
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            color: '#18345c',
                            boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.46)',
                            paddingRight: '30px', paddingLeft: '30px'
                        }} rel='noreferrer'><span><img width={30} height={40} style={{width: '30px'}}
                                                       src='/images/shield-check.svg?v1.1'
                                                       alt=''/></span>&nbsp; HIDE NOW</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default memo(NordComponent)