import axios from 'axios'
import authService from 'services/auth-service'
import axiosService from 'services/axios-service'

import { FETCH_RENTALS_BY_ID_SUCCESS,
         FETCH_RENTALS_BY_ID_INIT,
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_INIT,
         FETCH_RENTALS_FAIL,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         FETCH_USER_BOOKINGS_SUCCESS,
         FETCH_USER_BOOKINGS_FAIL,
         FETCH_USER_BOOKINGS_INIT,
         UPDATE_RENTAL_SUCCESS,
         UPDATE_RENTAL_FAIL,
         RESET_RENTAL_ERRORS,
         RELOAD_MAP,
         RELOAD_MAP_FINISH } from './types'

const axiosInstance = axiosService.getInstance();

// export const verifyRentalOwner = (rentalId) => {
//     return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
// }

// RENTALS ATIONS ---------------------------

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
        axiosInstance.get("/rentals")
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

// USER BOOKINGS ACTIONS ---------------------------


// AUTH ACTIONS ---------------------------
export const register = (userData) => {
    return axios.post('/api/users/register', userData)
                .then(res => res.data,
                      err => Promise.reject(err.response.data.errors))
}

const loginSuccess = () => {
    const username = authService.getUsername();
  
    return {
        type: LOGIN_SUCCESS,
        username
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
      return axios.post('/api/users/auth', userData)
                  .then(res => res.data)
                  .then(token => {
                      authService.saveToken(token);
                      dispatch(loginSuccess());
                    })
                  .catch(({response}) => {
                      dispatch(loginFailure(response.data.errors));
                   })
    }
}

export const logout = () => {
    authService.invalidateUser();
  
    return {
       type: LOGOUT
    }
}

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
                        .then(res => res.data)
                        .catch(({response}) => Promise.reject(response.data.errors))
}
  

