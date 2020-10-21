import React from 'react';
import Styles from './MyBuzzComponent.module.css';
import Spinner from './../../UI/Spinner/Spinner';
import MyBuzzViewComponent from './../MyBuzzViewComponent/MyBuzzViewComponent';

const MyBuzzComponent = ({ isLoading, buzzs, email,
    markLike, markDislike, deleteBuzz, setIsEdit, onEditViewHandler }) => {
    const onLikeHandler = (buzzId) => {
        markLike(buzzId)
    }
    const onDislikeHandler = (buzzId) => {
        markDislike(buzzId);
    }
    const onEditView = (buzz) => {
        onEditViewHandler(buzz)
    }

    let res = <Spinner />;
    if (!isLoading) {
        let allBuzzs = [...buzzs].reverse();
        if (allBuzzs.length === 0) {
            res = <p className={Styles.NoBuzz}>No Recent Buzz is Available</p>
        }
        else {
            res = (
                allBuzzs.map(buzz => <MyBuzzViewComponent key={buzz.buzzId}
                    setIsEdit={setIsEdit}
                    email={email} buzz={buzz}
                    deleteBuzz={() => deleteBuzz(buzz.buzzId)}
                    onEditView={() => onEditView(buzz)}
                    clickLike={() => onLikeHandler(buzz.buzzId)}
                    clickDislike={() => onDislikeHandler(buzz.buzzId)} />)
            )
        }
    }
    return (
        <div className={Styles.MyBuzzComponent}>
            <h3 className={Styles.BuzzHeader}><i className="fab fa-rocketchat"></i>My Buzz</h3>
            {res}
        </div>
    )
}

export default MyBuzzComponent
