import React, { useState, Fragment } from 'react';
import Styles from './BuzzEditComponent.module.css';
import Modal from './../../UI/Modal/Modal';

const BuzzEditComponent = ({ isEdit, setIsEdit, onClose, uiCategory, buzz, onUpdateBuzzHandler }) => {
    let { buzzMessage, category, buzzImage, buzzId } = buzz;
    const [updatedMessage, setUpdatedMessage] = useState(buzzMessage);
    const [updatedCategory, setUpdatedCategory] = useState(category);
    const [updatedImage, setUpdatedImage] = useState([]);


    const onUpdateProfile = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("buzzMessage", updatedMessage);
        formdata.append("category", updatedCategory);
        for (const image of updatedImage) {
            formdata.append("buzzImage", image);
        }
        onUpdateBuzzHandler(buzzId, formdata);
    }
    const onImageUpdate = async (event) => {
        await setUpdatedImage([...event.target.files]);
    }


    return (

        <Modal show={isEdit} modalClosed={setIsEdit}>
            <div className={Styles.BuzzEditComponent}>
                <div className={Styles.BuzzEditComponentHeader}>
                    <p className={Styles.EditHeading}>Edit Buzz</p>
                    <p onClick={onClose} className={Styles.CloseArrow}>&times;</p>
                </div>
                <form encType="multipart/form-data" onSubmit={onUpdateProfile}>
                    <div className={Styles.BuzzBodyWrapper}>
                        <div className={Styles.BuzzBody}>
                            <div className={Styles.ElementWrapper}>
                                <label className={Styles.Label}> Your Thought..</label>
                                <textarea value={updatedMessage} className={Styles.TextArea}
                                    onChange={event => setUpdatedMessage(event.target.value)} />
                            </div>
                            <div className={Styles.ElementWrapper}>
                                <label className={Styles.Label}>Update Category</label>
                                <select className={Styles.Select} value={updatedCategory}
                                    onChange={event => setUpdatedCategory(event.target.value)}>
                                    <option hidden value=""></option>
                                    {uiCategory.map(categ => {
                                        return <option key={categ} value={categ}>{categ}</option>
                                    })}
                                </select>
                            </div>
                            <div className={Styles.ElementWrapper}>
                                {buzzImage.length > 0 ? <Fragment>
                                    <p className={Styles.Label}>Your Image</p>
                                    {buzzImage.map(imageUrl => {
                                        return <img key={imageUrl} src={imageUrl} alt='buzzimage' className={Styles.BuzzImage} />
                                    })}
                                </Fragment> : <p>No Previous Image Found</p>}
                            </div>
                            <div className={Styles.ElementWrapper}>
                                <label className={Styles.Label}>Select New Image</label>
                                <input className={Styles.Input} type='file' id="file" name='buzzImage' accept="image/*"
                                    onChange={event => onImageUpdate(event)} multiple />
                            </div>
                            <div className={Styles.BuzzFooter}>
                                <button className={Styles.UpdateBtn}>Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default BuzzEditComponent;
