import React, { useState } from 'react';
import Styles from './BuzzFormComponent.module.css';
import { toast } from 'react-toastify';

const BuzzFormComponent = (props) => {
    const { email, buzzPostHandler, uiCategory } = props;
    const [buzzMessage, setBuzzMessage] = useState('');
    const [category, setcategory] = useState('');
    const [buzzImage, setBuzzImage] = useState([]);

    const validateForm = () => {
        if (buzzMessage.length === 0) {
            toast.warning('Buzz Message Is Required');
            return true;
        } else if (category.length === 0) {
            toast.warning('Category Is Required');
            return true;
        }
        else {
            return false;
        }
    }

    const formSubmit = (event) => {
        event.preventDefault();
        let isValid = validateForm();
        if (!isValid) {
            const formdata = new FormData();
            formdata.append("buzzMessage", buzzMessage);
            formdata.append("category", category);
            for (const image of buzzImage) {
                formdata.append("buzzImage", image);
            }
            formdata.append("userId", email);
            buzzPostHandler(formdata);
            setBuzzMessage('');
            setcategory('');
            setBuzzImage('');
        }
    }
    const fileChange = async (event) => {
        await setBuzzImage(event.target.files);
    }
    return (
        <div className={Styles.BuzzFormComponent}>
            <h3 className={Styles.BuzzHeader}><i className="fas fa-edit"></i> Create Buzz</h3>
            <form onSubmit={formSubmit} encType="multipart/form-data">
                <textarea data-testid="thoughts" className={Styles.TextArea} placeholder="Share Your Thoughts......" value={buzzMessage} onChange={event => setBuzzMessage(event.target.value)}></textarea>
                <div className={Styles.FormBottom}>
                    <div>
                        <select data-testid="category" className={Styles.SelectTag} name='Category' value={category} onChange={event => setcategory(event.target.value)}>
                            <option hidden>Category</option>
                            {uiCategory.map(categ => {
                                return <option key={categ} value={categ}>{categ}</option>
                            })}
                        </select>
                        <label htmlFor="file" className={Styles.ImageLabel}><i className="fas fa-image"></i>({buzzImage.length})</label>
                        <input type='file' id="file" name='buzzImage' accept="image/*"
                            style={{ visibility: 'hidden' }}
                            onChange={event => fileChange(event)} multiple />
                    </div>
                    <button data-testid="submit" className={Styles.SubmitBtn} type="submit"><i className="fas fa-angle-right fa-2x"></i></button>
                </div>
            </form>
        </div>
    )
}

export default BuzzFormComponent;
