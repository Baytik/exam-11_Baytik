import axiosAPI from "../../../axiosAPI";
import {push} from 'connected-react-router';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export const CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR';

export const fetchPostsSuccess = (posts) => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchPostsError = (error) => ({type: FETCH_POSTS_ERROR, error});
export const fetchPostSuccess = (post) => ({type: FETCH_POST_SUCCESS, post});

export const createItemError = (error) => ({type: CREATE_ITEM_ERROR, error});

export const fetchPosts = () => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get('/posts');
            dispatch(fetchPostsSuccess(response.data))
        } catch (error) {
            dispatch(fetchPostsError(error))
        }
    }
};

export const fetchPost = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get(`/posts/${id}`);
            dispatch(fetchPostSuccess(response.data))
        } catch (error) {
            dispatch(fetchPostsError(error))
        }
    }
};

export const createItem = (item) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/items', item, {headers: {'Authorization': token.token}});
            dispatch(push('/'))
        } catch (error) {
            dispatch(createItemError(error))
        }
    }
};