import React from 'react';
import styles from './sidebar.module.css';

export default function Sidebar() {
    return (
        <div className="row">
            <div className="col">
            <div className={ styles.sidebar }>
            <div className={ styles.sidebarContent }>
                <div className={ styles.projectTitleDiv }>
                    <img className={ styles.logo } src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Picasa.svg/256px-Picasa.svg.png" alt="logo"/>
                    <div>
                        <span className={ styles.projectTitle }>ProjectTitle</span>
                        <span className={ styles.titleInfo }>Classic business project</span>
                    </div>
                </div>
                <div className={ styles.link }>
                    <img className={ styles.arrow } src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOuGJsBtw7TwvfGIR-4W-uLYvTS2lSsswVLw&usqp=CAU" alt="arrow"/>
                    Back to project
                </div>
                <svg width="240" height="24">
                    <rect x="4" y="12" rx="2" ry="2" width="220" height="1"
                        style={{stroke:"black", strokeWidth:"1", opacity:"0.1"}} />
                </svg>
                <div className={ styles.currentSection }>Current Section</div>
                <div className={ styles.link }>My open issues</div>
                <div className={ styles.link }>Reported by me</div>
                <div className={ styles.currentlySelected }>All issues</div>
                <div className={ styles.link }>Open issues</div>
                <div className={ styles.link }>Done issues</div>
                <div className={ styles.link }>Viewed recently</div>
                <div className={ styles.link }>Created recently</div>
                <div className={ styles.link }>Resolved recently</div>
                <div className={ styles.link }>Updated recently</div>
                <svg width="240" height="24">
                    <rect x="4" y="12" rx="2" ry="2" width="220" height="1"
                        style={{stroke:"black", strokeWidth:"1", opacity:"0.1"}} />
                </svg>
                <div className={ styles.link }>View all filters</div>
            </div>
            <div className={ styles.collapseButtonDiv }>
                <svg className={ styles.collapseButton } width="26" height="26">
                    <circle cx="13" cy="13" r="12" stroke="white" strokeWidth="1" fill="white"/> 
                    <foreignObject x="7" y="-2" width="24" height="24">
                        <p style={{fontWeight:"bold"}}>{'<'}</p>
                    </foreignObject>
                </svg>
            </div>
        </div>
            </div>
        </div>
        
    )
}