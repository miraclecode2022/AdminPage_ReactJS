export let VerifyToken = (token) => {
    return fetch(`https://coffee-code-6868.herokuapp.com/users/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            access_token: token
        })
    })
    .then(result => result.json())
    .then(result => {
        return result.live
    })
    .catch(err => {
        return false
    })
}