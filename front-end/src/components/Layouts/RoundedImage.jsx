import styles from './RoundedImage.module.css'

function RoundedImage({src, alt, width}){
    return (
        <img
            className={`${styles.rounded_image} ${styles[width]}`}
            src={src}
            alt={src} 
        />
    )
}

export default RoundedImage