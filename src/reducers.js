import { combineReducers } from 'redux'
import Api from './Api';
const cartState = {
    id: -1,
    adult_qty: 0,
    half_qty: 0,
    discount_qty: 0,
    price: 0,
    half_price: 0,
    discount_price: 0,
    total: 0,
    seats: []
}
const user = (state = { token: '', record: [] }, action) => {
    switch (action.type) {
        case 'LOGIN':
            const data = action.data
            return {
                ...state,
                ...data
            }
        case 'SET_PROFILE':
            const record = state.record
            let profile = action.data
            profile.record = record
            return {
                ...state,
                ...profile
            }
        case 'SET_RECORD':
            let user = state
            user.record = action.data
            return {
                ...user
            }
        default: return state
    }
}
const theaters = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_THEATERS':
            return action.theaters
        default: return state
    }
}
const movies = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_MOVIES':
            return action.movies
        default: return state
    }
}
const shows = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SHOWS':
            return action.shows
        default: return state
    }
}
const cart = (state = cartState, action) => {
    switch (action.type) {
        case 'SET_CART':
            return action.data
        case 'SET_SEAT':
            return {
                ...state,
                seats: action.seats
            }
        default: return state
    }
}
export const getMovieById = (state, id) => {
    return state.movies.find(ele => ele.id == id) || {}
}

export const getTheaterById = (state, id) => {
    return state.theaters.find(ele => ele.id == id) || {}
}
export const getShowById = (state, id) => {
    return state.shows.find(ele => ele.id == id) || {}
}
export const setCart = data => async dispatch => {
    let _data = await Api.getPrice(data)
    _data.id = data.id
    _data.adult_qty = data.adult_qty
    _data.discount_qty = data.discount_qty
    _data.youth_qty = data.youth_qty
    _data.seats = []
    return dispatch({ type: 'SET_CART', data: _data })
}
export default combineReducers({ user, movies, theaters, shows, cart })