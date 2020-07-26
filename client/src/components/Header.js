import React from 'react';
import styles from './header.module.css';

export default function Header() {
    return (
        <div className={ styles.header }>
            <div>
                <img className={ styles.logo }src="https://cdn.dribbble.com/users/317366/screenshots/3696949/dribbble-icecream.png" alt="logo"/>
                <span className={ styles.brandName }>Geera Software</span>
                <span className={ styles.headerLinks }>Your Work</span>
                <span className={ styles.headerLinks }>Projects</span>
                <span className={ styles.headerLinks }>Filters</span>
                <button className={ styles.createButton }>Create</button>
            </div>
            <div>
                <span><img className={ styles.userLogo }src="https://www.underconsideration.com/brandnew/archives/boundless_logo_detail.png" alt="user"/></span>
            </div>
        </div>
    )
}