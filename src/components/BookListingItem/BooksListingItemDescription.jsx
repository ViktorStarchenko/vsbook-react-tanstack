import { useState } from 'react'

import classes from '../BooksListing.module.css';

export default function BooksListingItemDescription({children}) {

    return (
        <>
            {/*<div className={`${showDescription ? classes['show'] : classes['hide']}`}>*/}
            {/*    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium animi beatae commodi consequuntur culpa debitis dolorem ea enim eos eveniet ex exercitationem id incidunt inventore ipsum iste laborum magni maiores minus, nam odit provident quidem quod ratione recusandae reiciendis sed suscipit, tempore tenetur ut voluptas voluptate voluptatum! Aliquid, eum.</p>*/}
            {/*</div>*/}
            <div className={classes.listingItemDescription}>
                <div className={classes.listingItemDescriptionInner}>
                    {children}
                </div>
            </div>
        </>
    )
}