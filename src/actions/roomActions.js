export const move = (data) => {
    return {
        type: "MOVE",
        payload: data
    }
}

export const login = username => {
    return {
        type: "LOGIN",
        payload: username
    }
}

