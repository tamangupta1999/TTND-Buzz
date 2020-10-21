import React, { useState } from 'react';
import Styles from './CommentComponent.module.css';
import DummyImage from './../../../../assets/image/commentPic.png';
import moment from 'moment';

const CommentComponent = (props) => {
    const { comments, addComment, complaintId } = props;
    const [comment, setcomment] = useState('');
    const onAddComment = () => {
        addComment(complaintId, { comment: comment });
        setcomment('');
        // fetchComplaint(complaintId)
    }
    let commentsView = null;
    if (comments.length > 0) {
        commentsView = [...comments].reverse().map(comment => {
            return (<div className={Styles.Comments} key={comment.commentId}>
                <div className={Styles.CommentHeader} >
                    <img className={Styles.CommentImage} src={DummyImage} alt='dummyImage' />
                    <p className={Styles.CommentedBy}>{comment.commentedBy}</p>
                    <p className={Styles.CommentTime}>~{moment(comment.commentedOn).fromNow()}</p>
                </div>
                <p className={Styles.CommentMessage}>{comment.comment}</p>
            </div>)
        })
    }
    return (
        <div className={Styles.CommentComponent}>
            <input className={Styles.CommentInput} type="text" placeholder="Add Your Comment Here..." value={comment}
                onChange={event => setcomment(event.target.value)} />
            <button className={Styles.CommentButton} type="submit" onClick={onAddComment}>Add Comment</button>
            {commentsView}
        </div>
    )
}

export default React.memo(CommentComponent);
