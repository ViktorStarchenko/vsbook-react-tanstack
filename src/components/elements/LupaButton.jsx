export default function LupaButton({clickHandler, height}) {

    return (
        <>
            <div className="icon-button" onClick={clickHandler}>
                <svg style={{height: height}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve" fill="#e1eeeb"><path d="M92.948,82.441L67.998,57.49l-2.267,2.268l-5.275-5.276c4.454-5.399,7.133-12.316,7.133-19.846  c0-17.228-14.016-31.243-31.244-31.243c-17.228,0-31.243,14.016-31.243,31.243c0,17.228,14.015,31.242,31.243,31.242  c7.395,0,14.192-2.587,19.547-6.896l5.309,5.308l-2.267,2.266l24.95,24.95c1.251,1.251,2.892,1.877,4.532,1.877  c1.64,0,3.279-0.626,4.531-1.877C95.451,89.002,95.451,84.944,92.948,82.441z M11.512,34.635c0-13.693,11.14-24.834,24.833-24.834  c13.694,0,24.834,11.141,24.834,24.834S50.039,59.468,36.345,59.468C22.652,59.468,11.512,48.329,11.512,34.635z"/><path d="M47.893,23.016c5.979,5.978,8.661,13.806,7.816,20.742c1.114-2.614,1.731-5.49,1.731-8.51c0-11.991-9.72-21.71-21.71-21.71  c-2.913,0-5.69,0.578-8.229,1.618C34.349,14.441,42.016,17.139,47.893,23.016z"/></svg>
            </div>
        </>
    )
}


