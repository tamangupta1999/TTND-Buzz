import React from 'react';
import Styles from './BuzzViewComponent.module.css';
import moment from 'moment';

export let formatDate = (date) => {
    let splittedDate = date.split('T');
    let formattedDate = splittedDate[0].split('-');
    return formattedDate;
}

const BuzzViewComponent = ({ email, clickLike, clickDislike, buzz }) => {
    const { createdOn, buzzMessage, likes, dislikes, createdBy, buzzImage } = buzz;
    let totalLikes = likes.length;
    let totalDislikes = dislikes.length;
    let userName = createdBy.split('@');

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
                        <p data-testid="createdBy" className={Styles.BuzzCreatedBy}>{createdBy}</p>
                        <p className={Styles.BuzzCreatedOn}>~{moment(createdOn).fromNow()}</p>
                    </div>
                </div>
                <div className={Styles.BuzzCard}>
                    {checkBuzzImage}
                    <p data-testid='buzzMessage' className={Styles.BuzzMessage}>
                        <span style={{ color: 'grey', display: 'inline-block', textDecorationLine: 'underline', marginBottom: '10px' }}>@{userName[0]}</span><br></br>
                        {buzzMessage.length > 500 ? `${buzzMessage.substring(0, 500)}...` : buzzMessage}</p>
                </div>
                <div className={Styles.StatusCard}>
                    <p data-testid="like" className={attachedLikeClass.join(' ')}><i className="fas fa-thumbs-up" onClick={clickLike}></i><span id="like-count">{totalLikes}</span></p>
                    <p className={attachedDislikeClass.join(' ')}><i className="fas fa-thumbs-down" onClick={clickDislike}></i><span id="dislike-count">{totalDislikes}</span></p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BuzzViewComponent);
