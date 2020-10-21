import React, { useEffect, useState, useCallback } from 'react';
import Styles from './RecentBuzzComponent.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import BuzzViewComponent from './../BuzzViewComponent/BuzzViewComponent';

const RecentBuzzComponent = ({ isLoading, buzzs, email,
    markLike, markDislike, totalPage, currentPage, size,
    fetchBuzz, updateCurrentPage }) => {

    const [buzzList, setBuzzList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    console.log(buzzList)

    if (isFetching) {
        updateCurrentPage(currentPage + 1);
        setIsFetching(false)
    }

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return setIsFetching(false);
        if ((totalPage - currentPage) === 0) {
            setIsLastPage(true);
            setIsFetching(false);
        } else {
            setIsFetching(true);
        }
    }, [currentPage, setIsFetching, totalPage]);

    useEffect(() => {
        setBuzzList(prevBuzz => ([...prevBuzz, ...buzzs]))
    }, [buzzs])

    useEffect(() => {
        fetchBuzz(currentPage, size);
        setIsFetching(false);
    }, [fetchBuzz, currentPage, size]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);



    const onLikeHandler = (buzzId) => {
        markLike(buzzId)
    }
    const onDislikeHandler = (buzzId) => {
        markDislike(buzzId);
    }

    let buzzView = null;
    if (!isLoading) {
        if (buzzList.length === 0) {
            buzzView = <p>No Recent Buzz is Available</p>
        }
        else {
            buzzView = (
                buzzList.map(buzz => <BuzzViewComponent key={buzz.buzzId}
                    email={email} buzz={buzz}
                    clickLike={() => onLikeHandler(buzz.buzzId)}
                    clickDislike={() => onDislikeHandler(buzz.buzzId)} />)
            )
        }
    }
    return (
        <div className={Styles.RecentBuzzComponent}>
            <h3 className={Styles.BuzzHeader}><i className="fab fa-rocketchat"></i>Recent Buzz</h3>
            {buzzView}
            {isFetching ? <Spinner /> : null}
            {isLastPage ? <p>No More Recent Buzz</p> : null}
        </div>
    )
}

export default RecentBuzzComponent;
