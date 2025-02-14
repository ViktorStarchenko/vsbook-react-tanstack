export default function SlideShowButtonNext({buttonHandler}) {
    return (
        <>
            <div className="slider-arrow slider-arrow-next" onClick={buttonHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                    <path d="m83.145 50.711-31.426 43.051c-0.46875 0.64453-0.75 1.2422-1.5156 1.2422h-32.383c-0.98437 0-1.5508-1.1133-0.96875-1.9062l31.457-43.094-31.461-43.09c-0.57812-0.79297-0.015625-1.9062 0.96875-1.9062h31.488c0.78125 0 1.418-0.12109 1.8672 0.49219l31.207 42.75c0.61328 0.83594 1.4102 1.582 0.76562 2.4609z" fillRule="evenodd"/>
                </svg>
            </div>
        </>
    )
}