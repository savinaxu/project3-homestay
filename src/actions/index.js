import { FETCH_RENTALS, FETCH_RENTALS_BY_ID_SUCCESS } from './type'
const rentals = [
    {
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
    },
    {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
    },
    {
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
    },
    {
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
    }
  ]

export const fetchRentals = () => {
    return {
        type: FETCH_RENTALS,
        rentals
    }
}



export const fetchRentalsById = (rentalId) => {

    return function(dispatch) {
        //simulate server call
        setTimeout(() => {
            const rental = rentals.find((rental) => rental.id.toString() === rentalId);
            dispatch(fetchRentalsByIdSuccess(rental))
        }, 1000)
    }  
}

const fetchRentalsByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTALS_BY_ID_SUCCESS,
        rental
    }
}