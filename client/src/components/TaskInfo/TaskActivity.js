import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';


export default function Activity({comments, setComments, number}) {

    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        const newCom = {
            sender: localStorage.getItem('userName'),
            message: newComment
        }
        axios.put(`http://localhost:8000/api/tasks/${number}`, {comments: [...comments, newCom]}, {withCredentials: true,})
            .then(res => {
                setNewComment('')
                console.log(res.data);
                // setComments(res.data.comments)
            })
            .catch(console.log)
    }

    return (
        <div>
            <h3>Activity</h3>
            <div>
                <span>Show</span>
                <button>Comments</button>
                <button>History</button>
                <button>Work Log</button>
            </div>
            {comments.map((comment, idx) => {
                return <div key={idx}>
                        <p>{comment.sender}</p>
                        <p>{comment.message}</p>
                    </div>
            })}
            <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)}/>
            <button type="button" onClick={ addComment }>Save</button>
            <button type="button" onClick={() => setNewComment('') }>Cancel</button>
        </div>
    )
}