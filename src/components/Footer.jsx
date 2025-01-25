import classes from './Footer.module.css';
import RecentlyViewed from "./RecentlyViewed";

export default function Footer() {
    return (
        <>
            <RecentlyViewed />
            <footer className="">
                <div className="wrapper-1220">
                    <p>Viktor Starchenko Test React</p>
                </div>
            </footer>
        </>
    )
}