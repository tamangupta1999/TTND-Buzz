import React from 'react';
import Styles from './MyBuzzViewComponent.module.css';
import moment from 'moment';

const MyBuzzViewComponent = ({ email, clickLike,
    clickDislike, deleteBuzz, buzz, setIsEdit, onEditView }) => {
    const { createdOn, buzzMessage, likes, dislikes, createdBy, buzzImage } = buzz;

    // finding total likes and dislikes on buzz
    let totalLikes = likes.length;
    let totalDislikes = dislikes.length;
    let userName = createdBy.split('@');
    let formatDate = (date) => {
        let splittedDate = date.split('T');
        let formattedDate = splittedDate[0].split('-');
        return formattedDate;
    }
    let formattedDate = formatDate(createdOn);

    /*
    attaching some custom css according to liked or disliked 
    */
    let attachedLikeClass = [Styles.Like]
    let likesFind = likes.find(ele => ele === email);
    if (likesFind) {
        attachedLikeClass.push(Styles.AfterLike)
    }
    let attachedDislikeClass = [Styles.Dislike];
    let dislikeFind = dislikes.find(ele => ele === email);
    if (dislikeFind) {
        attachedDislikeClass.push(Styles.AfterDislike)
    }

    const onEditHandler = () => {
        setIsEdit(true)
        onEditView()
    }

    /*
        check for buzz image  
    */
    let checkBuzzImage = null;
    if (buzzImage.length > 0) {
        checkBuzzImage = (
            <img src={buzzImage[0]} className={Styles.BuzzImage} alt="buzzImage" />
        );
    }

    return (
        <div className={Styles.BuzzViewComponent}>
            <p className={Styles.ShowDate}>
                {formattedDate[2]}<br></br>
                {formattedDate[1]}
            </p>
            <div className={Styles.BuzzContentCard}>
                <div className={Styles.BuzzContentHeader}>
                    <div className={Styles.BuzzContentHeader}>
                        <p className={Styles.BuzzCreatedBy}>{createdBy}</p>
                        <p className={Styles.BuzzCreatedOn}>~{moment(createdOn).fromNow()}</p>
                    </div>
                    <button className={Styles.EditBtn} onClick={onEditHandler}>Edit</button>
                    <button className={Styles.DeleteBtn} onClick={deleteBuzz}>Delete</button>
                </div>
                <div className={Styles.BuzzCard}>
                    {checkBuzzImage}
                    <p className={Styles.BuzzMessage}>
                        <span className={Styles.UserName}>@{userName[0]}</span><br></br>
                        {buzzMessage.length > 500 ? `${buzzMessage.substring(0, 500)}...` : buzzMessage}</p>
                </div>
                <div className={Styles.StatusCard}>
                    <p className={attachedLikeClass.join(' ')}><i className="fas fa-thumbs-up" onClick={clickLike}></i>{totalLikes}</p>
                    <p className={attachedDislikeClass.join(' ')}><i className="fas fa-thumbs-down" onClick={clickDislike}></i>{totalDislikes}</p>
                </div>
            </div>
        </div>
    );
}

export default MyBuzzViewComponent;
