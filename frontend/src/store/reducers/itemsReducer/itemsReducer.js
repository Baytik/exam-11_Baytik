import {DELETE_ITEM_SUCCESS, FETCH_ITEM_SUCCESS, FETCH_ITEMS_SUCCESS} from "../../actions/itemsAction/itemsAction";

const initialState = {
    items: [],
    item: [],
    message: null
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_SUCCESS:
            return {...state, items: action.items};
        case FETCH_ITEM_SUCCESS:
            return {...state, item: action.item};
        case DELETE_ITEM_SUCCESS:
            return {...state, message: action.message};
        default:
            return state;
    }
};

export default itemsReducer;