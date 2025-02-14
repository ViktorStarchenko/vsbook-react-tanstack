import { Link, useLoaderData, useLocation } from "react-router-dom";
import BooksListing from "../components/BookListing/BooksListing";
import {useQuery} from "@tanstack/react-query";
// import {booksLoader} from "../booksFunctions";
import {fetchPosts, queryClient} from "../util/http";
import LoadingIndicator from "../components/LoadingIndicator";
import SlideShow from "../components/Slider/SlideShow";
import {usePageData} from "../hooks/usePageData";
import classes from "../components/ErrorsBlock/ErrorsBlock.module.css";
import {Helmet} from "react-helmet-async";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import PageContent from "../components/PageContent";
import Spacer from "../components/elements/Spacer";
import Section from "../components/Section/Section";
import KeenSlider from "../components/KeenSlider/KeenSlider";
import SlideShowItem from "../components/Slider/SlideShowItem";
import KeenSliderSlide from "../components/KeenSlider/KeenSliderSlide";

function HomePage() {
    // const books = useLoaderData();
    const location = useLocation();
    const currentFullURL = `${window.location.origin}${location.pathname}${location.search}`;
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['books'],
        queryFn: ({signal}) => fetchPosts({signal, perPage: 8})
    })

    const {data: dataHome, isLoading: isLoadingHome, isError: isErrorHome, error: errorHome} = usePageData( 'home' );

    let posts = [];

    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (data && data.posts.length > 0) {
        posts = data.posts;
        content = (<BooksListing books={posts} />)
    }

    let homeBanner
    let keenBanner
    if (dataHome && dataHome.acf && dataHome.acf.home_banner) {
        homeBanner = <SlideShow data={dataHome.acf.home_banner}/>
        keenBanner = <KeenSlider perView="1">
            {dataHome.acf.home_banner.items.map((item, index) => (
                <KeenSliderSlide key={index}>
                    <div className="hero-banner">
                        {item.image && (
                            <div className="hero-banner-image">
                                {item.enable_overlay && <div className="overlay"></div>}
                                <img src={item.image.url} alt={item.image.title}/>
                            </div>
                        )}
                        <div className="hero-banner-content">
                            {item.title && <div className="h2" dangerouslySetInnerHTML={{__html: item.title}}></div>}
                            {item.description && <div className="hero-banner-description" dangerouslySetInnerHTML={{__html: item.description}}></div>}
                            {item.button && <div><Link className="btn" to={item.button.url} target={item.button.target}>{item.button.title}</Link></div>}
                        </div>
                    </div>
                </KeenSliderSlide>
            ))}
        </KeenSlider>
    }

    return (
        <>
            <Helmet>
                <title>VSBookcollection test website</title>
                <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, veniam."/>
                <link rel="canonical" href={currentFullURL}/>
            </Helmet>
            <PageContent>
                <Section contentWrapper="wrapper-fullwidth-p-0" sectionClass="wrapper-fullwidth-p-0 pt-0 pb-0">
                    {keenBanner}
                </Section>

                {/*<Spacer height="2rem"/>*/}
                {/*<Section contentWrapper="wrapper-1220">*/}
                {/*    {homeBanner}*/}
                {/*</Section>*/}
                <Section contentWrapper="wrapper-1220">
                    <h1 className="h1">THIS IS HOME PAGE ASDASD ASD ASD D </h1>
                    <p className="pb-1rem">Go see <Link to="/books">more books</Link>.</p>
                </Section>
                <Section sectionClass="pt-0 pb-xl" contentWrapper="wrapper-1220">
                    {content}
                </Section>
            </PageContent>
        </>
    )
}

export default HomePage;

export function loader({params}) {
    console.log(params)
    return queryClient.fetchQuery({
        queryKey: ['books'],
        queryFn: ({signal}) => fetchPosts({signal, perPage: 8})
    })
}