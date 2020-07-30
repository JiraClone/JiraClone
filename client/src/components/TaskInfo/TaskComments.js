import React, { useState } from 'react';
import axios from 'axios';
import styles from './task.module.css';

export default function TaskComments({comments, number}) {
    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        const newCom = {
            sender: localStorage.getItem('userName'),
            message: newComment
        }
        axios.put(`http://localhost:8000/api/tasks/${number}`, {comments: [...comments, newCom]}, {withCredentials: true,})
            .then(res => {
                setNewComment('')
            })
            .catch(console.log)
    }

    if(comments === undefined) return "Loading...";
    
    return(
        <div>
            <div className={ styles.commentArea }>
                {comments.map((comment, idx) => {
                    return <div key={idx}>
                            <p>{comment.sender}</p>
                            <p>{comment.message}</p>
                        </div>
                })}
            </div>
            <textarea type="text" value={newComment} 
                    onChange={e => setNewComment(e.target.value)} 
                    placeholder="leave a comment"
                    className={ styles.commentInput }/>
            <button type="button" 
                    onClick={ addComment }
                    className={ styles.saveButton }>
                        Save
            </button>
            <button type="button" 
                    onClick={() => setNewComment('') }
                    className={ styles.cancelButton }>
                        Cancel
            </button>
        </div>
    )
}