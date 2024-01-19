
const LoadingSpinner = ({ small= false }) => {
    let loaderClass="spinner mx-auto";
    if (small){
        loaderClass += " loader-sm";
    } 
    return(
        <div className={loaderClass} ></div>
    )
}

export default LoadingSpinner;