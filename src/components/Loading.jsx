
const Loading = ({ small = false }) => {
    // let loaderClass="spinner mx-auto mt-[55%]";
    let loaderClass = "loader";
    if (small) {
        loaderClass += " loader-sm";
    }
    return (
        <div className={loaderClass} ></div>
    )
}

export default Loading;