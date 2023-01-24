const LOGIN_USER = 'login_user';
const LOGOUT = 'logout_user';

export const loginUser = (data) => ({
    type: LOGIN_USER,
    payload: data
    /* payload: {
        team_id: data.team_id,
        isRegistered: data.isRegistered,
    } */
});

export const logoutUser = () => ({
    type: LOGOUT
});

const initialState = {
    'user_id': sessionStorage.getItem('user_id'),
    'token': sessionStorage.getItem('token'),
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user_id: null,
                token: null,
            };
        default:
            return state;
    }
}
