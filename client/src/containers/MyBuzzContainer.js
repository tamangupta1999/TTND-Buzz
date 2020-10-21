import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchMyBuzz, markLike, markDislike, deleteBuzz, updateBuzz } from './../actions';
import Spinner from './../components/UI/Spinner/Spinner';
import MyBuzz from '../components/Buzz/MyBuzzComponent/MyBuzzComponent';
import BuzzEditComponent from '../components/Buzz/BuzzEditComponent/BuzzEditComponent';

const MyBuzzContainer = (props) => {
    const { fetchMyBuzz, isLoading, isError, errorMessage, myBuzz,
        email, markLike, markDislike, deleteBuzz, updateBuzz, uiCategory } = props;

    const [isEdit, setIsEdit] = useState(false);
    const [buzz, setBuzz] = useState({});

    useEffect(() => {
        fetchMyBuzz()
    }, [fetchMyBuzz]);

    const onCloseModal = () => {
        setIsEdit(false)
    }
    const onEditViewHandler = (buzz) => {
        setBuzz(buzz);
    }
    const onUpdateBuzzHandler = async (buzzId, data) => {
        await updateBuzz(buzzId, data);
        setIsEdit(false)

    }

    let view = <Spinner />
    if (!isLoading) {
        if (isError) {
            view = <p>{errorMessage}</p>
        } else {
            view = <MyBuzz buzzs={myBuzz} isLoading={isLoading}
                email={email} markLike={markLike} markDislike={markDislike}
                deleteBuzz={deleteBuzz} setIsEdit={setIsEdit}
                onEditViewHandler={onEditViewHandler} />
        }
    }
    return (
        <div style={{ width: '90%' }}>
            {isEdit ? <BuzzEditComponent buzz={buzz} uiCategory={uiCategory} isEdit={isEdit} setIsEdit={setIsEdit}
                onClose={onCloseModal} onUpdateBuzzHandler={onUpdateBuzzHandler} /> : null}
            {view}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.buzz.isLoading,
        isError: state.buzz.isError,
        errorMessage: state.buzz.errorMessage,
        myBuzz: state.buzz.myBuzz,
        email: state.login.userDetails.email,
        uiCategory: state.login.uiConfig.category
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMyBuzz: () => dispatch(fetchMyBuzz()),
    markLike: (buzzId) => dispatch(markLike(buzzId)),
    markDislike: (buzzId) => dispatch(markDislike(buzzId)),
    deleteBuzz: (buzzId) => dispatch(deleteBuzz(buzzId)),
    updateBuzz: (buzzId, data) => dispatch(updateBuzz(buzzId, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyBuzzContainer);
