export default function SlideShowButtonPrev({buttonHandler}) {
    return (
        <>
            <div className="slider-arrow slider-arrow-prev" onClick={buttonHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                    <path d="m17.621 48.246 31.207-42.75c0.44922-0.61328 1.0859-0.49219 1.8672-0.49219h31.488c0.98438 0 1.5508 1.1133 0.96875 1.9062l-31.461 43.094 31.457 43.094c0.57812 0.79297 0.015624 1.9062-0.96875 1.9062h-32.383c-0.76562 0-1.0469-0.59766-1.5156-1.2422l-31.426-43.051c-0.64453-0.87891 0.15234-1.625 0.76562-2.4648z" fillRule="evenodd"/>
                </svg>
            </div>
        </>
    )
}