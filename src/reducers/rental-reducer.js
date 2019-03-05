import { FETCH_RENTALS, 
         FETCH_RENTALS_BY_ID_SUCCESS, 
         FETCH_RENTALS_BY_ID_INIT,
         FETCH_RENTALS_SUCCESS } from '../actions/type'

const INITIAL_STATE = {
    rentals: {
        data: []
    },
    rental: {
        data: {}
    }
}

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
    switch(action.type) {
        case FETCH_RENTALS_SUCCESS :
        debugger
            return {...state, data:action.rentals}
        default:
        return state;
    }
}

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
    switch(action.type) {
        case FETCH_RENTALS_BY_ID_INIT :
            return {...state, data: {}};
        case FETCH_RENTALS_BY_ID_SUCCESS :
            return {...state, data:action.rental};
        

        default:
        return state;
    }
}