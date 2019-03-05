import axios from 'axios'
import { FETCH_RENTALS_BY_ID_SUCCESS,
         FETCH_RENTALS_BY_ID_INIT,
         FETCH_RENTALS_SUCCESS } from './type'

const fetchRentalsByIdInit = () => {
    return {
        type: FETCH_RENTALS_BY_ID_INIT
    }
}

const fetchRentalsByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTALS_BY_ID_SUCCESS,
        rental
    }
}

const fetchRentalsSuccess = rentals => {
    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals
    }
}

export const fetchRentals = () => {
    return dispatch => {
        axios.get("/api/rentals")
             .then(res => res.data)
             .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
    }
}

export const fetchRentalsById = (rentalId) => {

    return function(dispatch) {
        dispatch(fetchRentalsByIdInit())

        axios.get(`/api/rentals/${rentalId}`)
             .then(res => res.data)
             .then(rental => dispatch(fetchRentalsByIdSuccess(rental)))
    }  
}



