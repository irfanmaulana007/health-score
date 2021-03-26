export const setToken = (token) => {
    window.localStorage.setItem('token', token)
}

export const setID = (id) => {
    window.localStorage.setItem('id', id)
}

export const getUserToken = () => {
    return localStorage.getItem('token')
}

export const getUserID = () => {
    return parseInt(localStorage.getItem('id'))
}