import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOGOUT_FAIL,LOGOUT_SUCCESS,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_RESET,UPDATE_PROFILE_SUCCESS,CLEAR_ERRORS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET,FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_REQUEST, DELETE_USER_REQUEST, UPDATE_USER_FAIL, DELETE_USER_FAIL, UPDATE_USER_RESET, DELETE_USER_RESET, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS} from "../constants/userconstants"

export const userreducers = (state={user:{}},action)=>{

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isauthenticated:false
            };
            case LOGIN_SUCCESS:
            case REGISTER_USER_SUCCESS:
            case LOAD_USER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isauthenticated:true,
                    user:action.payload
                };
                case LOGIN_FAIL:
                case REGISTER_USER_FAIL:
                return {
                    ...state,
                    loading:false,
                    isauthenticated:false,
                    user:null,
                    error:action.payload
                };

                case LOAD_USER_FAIL:
                    return {
                        loading:false,
                        isauthenticated:false,
                        user:null,
                        error:action.payload
                    }
                case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    };

                case LOGOUT_SUCCESS:
                    return{
                        loading:false,
                        user:null,
                        isauthenticated:false,
                    }
                case LOGOUT_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload ,
                    }
            
                default:
                    return state;
    
    }
}





export const profilereducers = (state={},action)=>{

    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return{
                ...state,
                loading:true,
            };
            case UPDATE_PROFILE_SUCCESS:
            case UPDATE_PASSWORD_SUCCESS:
            case UPDATE_USER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isupdated:action.payload
                };
                case DELETE_USER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isdeleted:action.payload,
                    message:action.payload.message
                };
            
                case UPDATE_PROFILE_FAIL:
                case UPDATE_PASSWORD_FAIL:
                case UPDATE_USER_FAIL:
                case DELETE_USER_FAIL:
                    return {
                    ...state,
                    loading:false,
                    error:action.payload
                };

                case UPDATE_PROFILE_RESET:
                case UPDATE_PASSWORD_RESET:
                case UPDATE_USER_RESET:
                    return {
                    ...state,
                    isupdated:false
                };

                case DELETE_USER_RESET:
                    return {
                    ...state,
                    isdeleted:false
                };

                case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    };

                default:
                    return state;
    
    }
}




export const forgotpasswordreducers = (state={},action)=>{

    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            };
            case FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    message:action.payload
                };
                case RESET_PASSWORD_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    success:action.payload
                };
            
                case FORGOT_PASSWORD_FAIL:
                case RESET_PASSWORD_FAIL:
                    return {
                    ...state,
                    loading:false,
                    error:action.payload
                };
                case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    };

                default:
                    return state;
    
    }
}


//ALL USER DATA -->ADMIN
export const allusersreducers = (state={ users:[]},action)=>{

    switch (action.type) {
        case ALL_USERS_REQUEST:
            return{
                ...state,
                loading:true,
            };
            case ALL_USERS_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    users:action.payload
                };
            case ALL_USERS_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload
                };
            case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    };

                default:
                    return state;
    
    }
}



//Particular USER Detail -->ADMIN
export const userdetailsreducers = (state={ user:{}},action)=>{

    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
            };
            case USER_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    user:action.payload
                };
            case USER_DETAILS_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload
                };
            case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    };

                default:
                    return state;
    
    }
}