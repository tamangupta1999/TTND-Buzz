const { createBuzz, getAllBuzz, getAllUserBuzz, removeBuzzById, updateBuzzById,
    markingLikeOnBuzz, markingDislikeOnBuzz } = require('./../services/buzzService');
const { generate } = require('./../libs/response');

const create = async (req, res) => {
    let response = await createBuzz(req);
    res.status(response.status).send(response)
}

const getAll = async (req, res) => {
    let response = await getAllBuzz(req.params);
    res.status(response.status).send(response);
}

const getBuzzByUserId = async (req, res) => {
    let response = await getAllUserBuzz(req.body.userId || req.user.userId);
    res.status(response.status).send(response);
}

const markLikeOnBuzz = async (req, res) => {
    let response = await markingLikeOnBuzz(req.params, req.user);
    res.status(response.status).send(response);
}

const markDislikeOnBuzz = async (req, res) => {
    let response = await markingDislikeOnBuzz(req.params, req.user);
    res.status(response.status).send(response);
}

const updateBuzz = async (req, res) => {
    let response = await updateBuzzById(req);
    res.status(response.status).send(response);
}

const removeBuzz = async (req, res) => {
    let response = await removeBuzzById(req.params, req.body.userId || req.user.userId);
    res.status(response.status).send(response);
}

module.exports = {
    create: create,
    getAll: getAll,
    updateBuzz: updateBuzz,
    removeBuzz: removeBuzz,
    getBuzzByUserId: getBuzzByUserId,
    markLikeOnBuzz: markLikeOnBuzz,
    markDislikeOnBuzz: markDislikeOnBuzz
}