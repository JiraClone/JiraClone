import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './issues.module.css';

export default function Issues(){
    const [issues, setIssues] = useState(null)
    const [highlighted, setHighlighted] = useState(null)
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks')
            .then(res => setIssues(res.data))
            .catch(console.log);
    },[])


    if(issues === null) return "Loading...";

    return(
        <div className={ styles.panel }>
            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div className="dropdown-menu">
                    <p className="dropdown-item">Created</p>
                    <p className="dropdown-item">Priority</p>
                    <p className="dropdown-item">Updated</p>
                </div>
            </div>
            <div className={ styles.issueGroup }>
                {issues.map((issue) => {
                    return <div key={issue.number} 
                                className={ issue.number===highlighted ? `${styles.selected} ${styles.issue}` : `${styles.notSelected} ${styles.issue}`}
                                onClick={() => setHighlighted(issue.number)}
                            >
                        <span>{issue.name}</span>
                        <br/>
                        <span className={ styles.issueNumber }>
                            <img className={ styles.checkbox }
                                src="https://upload.wikimedia.org/wikipedia/donate/thumb/8/89/Ooui-checkbox-selected.svg/1024px-Ooui-checkbox-selected.svg.png" 
                                alt="check" />
                            GEER-{issue.number}
                        </span>
                    </div>
                })}
            </div>
            <div className={ styles.bottom }>
                <div className={ styles.refresh }>
                    <img className={ styles.refreshIcon }
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/1200px-Refresh_icon.svg.png" 
                        alt="refresh"/>
                </div>
                <span className={ styles.bottomText }>issue 3 of 24</span>
            </div>
        </div>
    )
}