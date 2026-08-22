import success from '../../assets/success-animation.json'
import {Player} from '@lottiefiles/react-lottie-player'
function Success() {
    return (
        <Player
            src={success}
            loop={true}
            autoplay={true}
                style={{
                    width: "300px",
                    height: "300px"
                }}
        />
    )
}


export default Success