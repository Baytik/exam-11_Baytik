import axiosAPI from "../../../axiosAPI";
import {push} from 'connected-react-router';

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';

export const CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';

export const fetchItemsSuccess = (items) => ({type: FETCH_ITEMS_SUCCESS, items});
export const fetchItemsError = (error) => ({type: FETCH_ITEMS_ERROR, error});
export const fetchItemSuccess = (item) => ({type: FETCH_ITEM_SUCCESS, item});

export const createItemError = (error) => ({type: CREATE_ITEM_ERROR, error});
export const deleteItemError = (error) => ({type: DELETE_ITEM_ERROR, error});
export const deleteItemSuccess = (message) => ({type: DELETE_ITEM_SUCCESS, message});

export const fetchItems = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get(`/items/${id}`);
            dispatch(fetchItemsSuccess(response.data))
        } catch (error) {
            dispatch(fetchItemsError(error))
        }
    }
};

export const fetchItem = (id) => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get(`/item/${id}`);
            dispatch(fetchItemSuccess(response.data))
        } catch (error) {
            dispatch(fetchItemsError(error))
        }
    }
};

export const createItem = (item) => {
    return async (dispatch, getState) => {
        const token = getState().user.user;
        try {
            await axiosAPI.post('/items', item, {headers: {'Authorization': token.token}});
            dispatch(push('/'));
            alert('Item successfully added')
        } catch (error) {
            dispatch(createItemError(error))
        }
    }
};

export const deleteItem = (id) => {
  return async (dispatch, getState) => {
      const token = getState().user.user;
      try {
         const response = await axiosAPI.delete(`/item/${id}`, {headers: {'Authorization': token.token}});
          dispatch(deleteItemSuccess(response.data));
          dispatch(push('/'))
      } catch (error) {
          dispatch(deleteItemError(error.response.data));
          dispatch(push('/'));
          alert('Item successfully deleted')
      }
  }
};