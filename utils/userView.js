const userView = (user) => {
    const view = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        temp: user.accessToken + ' ' + user.refreshToken
    }
    return view;
}

module.exports = userView ;