import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, NEW_REVIEW_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_RESET,NEW_REVIEW_SUCCESS,CLEAR_ERRORS, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_RESET, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET } from "../constants/productconstants"

export const productsreducers = (state={products:[]},action)=>{

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading:true,
                products:[]
            };
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                productcount:action.payload.productcount,
                resultperpage:action.payload.resultperpage,
            };
            case ADMIN_PRODUCT_SUCCESS:
                return{
                    loading:false,
                    products:action.payload,
                };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
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



export const productdetailsreducers = (state={product:{}},action)=>{

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
               ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading:false,
                product:action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return{
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

//Add Product -->Admin
export const newproductreducer = (state={product:{ }},action)=>{

    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,  
            };
        case NEW_PRODUCT_SUCCESS:
            return{
                loading:false,
                success:action.payload.success,
                product:action.payload.product
            };
        case NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                success:false,
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


//DELETE PRODUCT -->ADMIN AND UPDATE PRODUCT -->ADMIN
export const productreducers = (state={},action)=>{

    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,  
            };
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                isdeleted:action.payload,
            };
            case UPDATE_PRODUCT_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isupdated:action.payload,
                };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                isdeleted:false,
            };
            case UPDATE_PRODUCT_RESET:
                return{
                    ...state,
                    isupdated:false,
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

export const newreviewreducer = (state={},action)=>{

    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,  
            };
        case NEW_REVIEW_SUCCESS:
            return{
                loading:false,
                success:action.payload,
            };
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        case NEW_REVIEW_RESET:
            return{
                ...state,
                success:false,
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


//ALL REVIEWS-->ADMIN
export const productreviewssreducers = (state={reviews:[]},action)=>{

    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,  
            };
        case ALL_REVIEW_SUCCESS:
            return{
                loading:false,
                reviews:action.payload,
            };
        case ALL_REVIEW_FAIL:
            return{
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



export const reviewreducer = (state={},action)=>{

    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case DELETE_REVIEW_SUCCESS:
          return {
            ...state,
            loading: false,
            isdeleted: action.payload,
          };
        case DELETE_REVIEW_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        case DELETE_REVIEW_RESET:
          return {
            ...state,
            isdeleted: false,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
    
        default:
            return state;
    }
}