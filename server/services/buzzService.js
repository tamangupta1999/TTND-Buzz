const Buzz = require('./../models/Buzz');
const { isEmpty } = require('./../libs/isEmpty');
const { generate } = require('./../libs/response');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');
const fs = require('fs');

/**
 * Create A Buzz Handler
 */
const createBuzz = async (req) => {
    try {
        let { body, files } = req;
        let filePath = [];

        if (await isEmpty(body)) {
            return await generate(true, 'Buzz Data Is Missing', 400, null);
        }
        let { userId, category, buzzMessage } = body;
        if (!buzzMessage || !userId || !category) {
            return await generate(true, 'Some fields is empty', 400, null);
        }

        if (files.length > 0) {
            for (const file of files) {
                let { path } = file;
                let uploadedImageResult = await cloudinary.uploader.upload(path);
                filePath.push(uploadedImageResult.secure_url);
                fs.unlinkSync(path);
            }
        }
        let newBuzz = new Buzz({
            createdBy: userId,
            category,
            buzzMessage,
            buzzImage: filePath
        });

        let buzz = await newBuzz.save();
        return generate(false, 'Buzz created Successfully', 200, {
            buzzId: buzz.buzzId,
            buzzMessage: buzz.buzzMessage,
            createdOn: buzz.createdOn,
            createdBy: buzz.createdBy,
            category: buzz.category,
            buzzImage: buzz.buzzImage
        })
    } catch (error) {
        return await generate(true, error.message, 422, null);
    }
}

/**
 * Gell All Buzz Posted By All Users Handler
 */

const getAllBuzz = async ({ pageNumber, size }) => {
    try {
        if (+pageNumber === 0 || +size === 0 || isNaN(+pageNumber) || isNaN(+size)) {
            return generate(true, 'Page Number or Size Must Be Valid', 404, null)
        }
        let count = await Buzz.countDocuments();


        let totalPage = Math.ceil(count / size);

        let skip = size * (pageNumber - 1);
        let limit = size

        let allBuzz = await Buzz.find().sort('-createdOn').skip(+skip).limit(+limit).select("-_id -__v");
        return {
            error: false,
            message: 'All Buzz Found Successfully',
            status: 200,
            pages: totalPage,
            data: allBuzz
        };
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 * Gell All Buzz Of Particular User Handler
*/

const getAllUserBuzz = async (userId) => {
    try {
        if (!userId) {
            return await generate(true, 'User Id can not be null', 400, null)
        }
        let buzzs = await Buzz.find({ createdBy: userId }).select('-_id -__v')
        if (buzzs.length === 0) {
            return await generate(false, 'No Buzz Found For this user', 200, [])
        }
        return await generate(false, 'Your Buzz is here', 200, buzzs)
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 * removing buzz by using buzz id
 */

const updateBuzzById = async ({ params, body, files, user }) => {
    try {
        let { buzzId } = params;
        let { buzzMessage, category, userId } = body.data || body;
        // let { userId } = user;
        let filePath = [];

        if (!buzzMessage || !category) {
            return await generate(true, 'Buzz Message Or Category is empty', 400, null);
        }
        //fetching previous buzz image
        let { buzzImage } = await Buzz.findOne({ buzzId: buzzId }).select('buzzImage');
        if (buzzImage.length > 0 && files.length === 0) {
            filePath = buzzImage
        }

        if (files.length > 0) {
            for (const file of files) {
                let { path } = file;
                let uploadedImageResult = await cloudinary.uploader.upload(path);
                filePath.push(uploadedImageResult.secure_url);
                fs.unlinkSync(path);
            }
            if (buzzImage.length > 0) {
                for (const image of buzzImage) {
                    await cloudinary.uploader.destroy(image);
                }
            }
        }
        let updatedBuzz = await Buzz.findOneAndUpdate({ createdBy: userId, buzzId: buzzId },
            {
                $set: {
                    buzzMessage: buzzMessage,
                    category: category,
                    buzzImage: filePath,
                    updatedOn: moment.now()
                }
            }, { new: true, useFindAndModify: false }).select('-_id -__v');
        return await generate(false, 'Buzz Updated Successfully', 200, updatedBuzz);
    } catch (error) {
        return await generate(true, error.message, 502, null);

    }
}

/**
 * removing buzz by using Buzz id
 */
const removeBuzzById = async ({ buzzId }, email) => {
    try {
        if (!buzzId) {
            return await generate(true, 'Buzz Id is missing', 404, null);
        }
        let deletedBuzz = await Buzz.findOneAndRemove({ buzzId: buzzId, createdBy: email }, { useFindAndModify: false });
        if (!deletedBuzz) {
            return await generate(true, 'Invalid Buzz Id', 404, null);
        }
        let { buzzImage } = deletedBuzz;
        if (buzzImage.length > 0) {
            for (const image of buzzImage) {
                await cloudinary.uploader.destroy(image);
            }
        }
        if (deletedBuzz) {
            return await generate(false, 'Buzz Deleted Successfully', 200, null);
        } else {
            return await generate(true, 'Only Creator Will Remove There Buzz', 403, null);
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 * Mark Like on Buzz And also remove previous dislike Handler
 */
const markingLikeOnBuzz = async ({ buzzId }, { userId }) => {
    try {
        if (!buzzId || !userId) {
            return await generate(true, 'User Id & Buzz Id can not be null', 400, null)
        }
        let checkIfAlreadyDislikes = await Buzz.findOne({ buzzId: buzzId, dislikes: userId });
        if (checkIfAlreadyDislikes) {
            let response = await Buzz.findOneAndUpdate({ buzzId: buzzId },
                { $pull: { dislikes: { $in: [userId] } }, $push: { likes: userId } },
                { useFindAndModify: false, new: true });

            return await generate(false, 'Like Has Been Successfully Marked', 200, response);
        } else {
            let response = await Buzz.findOneAndUpdate({ buzzId: buzzId, 'likes': { $ne: userId } },
                { $push: { likes: userId } },
                { useFindAndModify: false, new: true });

            if (response) {
                return await generate(false, 'Like Has Been Successfully Marked', 200, response);
            } else {
                let response = await Buzz.findOneAndUpdate({ buzzId: buzzId },
                    { $pull: { likes: { $in: [userId] } } },
                    { useFindAndModify: false, new: true });
                return await generate(false, 'Like Is Removed From This Buzz', 200, response);
            }
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 * Mark Dislike on Buzz And also remove previous like Handler
 */
const markingDislikeOnBuzz = async ({ buzzId }, { userId }) => {
    try {
        if (!buzzId || !userId) {
            return await generate(true, 'User Id & Buzz Id can not be null', 400, null)
        }
        let checkIfAlreadyLiked = await Buzz.findOne({ buzzId: buzzId, likes: userId });
        if (checkIfAlreadyLiked) {
            let response = await Buzz.findOneAndUpdate({ buzzId: buzzId },
                { $pull: { likes: { $in: [userId] } }, $push: { dislikes: userId } },
                { useFindAndModify: false, new: true });

            return await generate(false, 'Dislike Has Been Successfully Marked', 200, response);
        } else {
            let response = await Buzz.findOneAndUpdate({ buzzId: buzzId, 'dislikes': { $ne: userId } },
                { $push: { dislikes: userId } },
                { useFindAndModify: false, new: true });

            if (response) {
                return await generate(false, 'Dislike Has Been Successfully Marked', 200, response);
            } else {
                let response = await Buzz.findOneAndUpdate({ buzzId: buzzId },
                    { $pull: { dislikes: { $in: [userId] } } },
                    { useFindAndModify: false, new: true });
                return await generate(false, 'Your Dislikes Is Removed From This Buzz', 200, response);
            }
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);

    }
}
module.exports = {
    createBuzz: createBuzz,
    getAllBuzz: getAllBuzz,
    removeBuzzById: removeBuzzById,
    updateBuzzById: updateBuzzById,
    getAllUserBuzz: getAllUserBuzz,
    markingLikeOnBuzz: markingLikeOnBuzz,
    markingDislikeOnBuzz: markingDislikeOnBuzz
}