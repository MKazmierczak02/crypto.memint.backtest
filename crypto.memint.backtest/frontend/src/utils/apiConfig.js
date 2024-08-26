export const getAuthConfig = (getState) => {
    const {
        userLogin: { userInfo },
    } = getState();

    return {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };
};
