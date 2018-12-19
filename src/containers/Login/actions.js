export const userLogin = (user) => ({
    type: 'USER_LOGIN',
    payload: {email: user.email, isAdmin: user.isAdmin}
})
