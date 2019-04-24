import login from "./components/login";

const api_url = 'https://databaseproject-222606.appspot.com'
export default {
    async getTheaters() {
        return fetch(`${api_url}/theater`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
    },
    async getMovies() {
        return fetch(`${api_url}/movie`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
    },
    async getShows() {
        return fetch(`${api_url}/show`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
    },
    async getPrice(data) {
        return fetch(`${api_url}/price`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    async getSelectedSeats(id) {
        return fetch(`${api_url}/show/selectedseats`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ show_id: id })
        }).then(res => res.json())
    },
    async createOrder(data, token) {
        return fetch(`${api_url}/order/createorder`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                'x-access-token': token
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    async login(data) {
        return fetch(`${api_url}/login`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    async updateProfile(data, token) {
        return fetch(`${api_url}/user/update`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    async getRecord(token) {
        return fetch(`${api_url}/order/record`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "x-access-token": token
            },
        }).then(res => res.json())
    },
}