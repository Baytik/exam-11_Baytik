import {FETCH_ITEMS_SUCCESS} from "../../actions/itemsAction/itemsAction";

const initialState = {
    items: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_SUCCESS:
            return {...state, items: action.items};
        default:
            return state;
    }
};

export default itemsReducer;