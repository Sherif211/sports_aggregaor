import styles from './Loading.module.css'

const Loading = ({loading}): JSX.Element => {
    if (!loading) return <></>
    return <div className="text-center">
        <div className={styles.ldsDualRing}/>
    </div>
}

export default Loading