
const ADD_NUMBER = 'ADD_NUMBER'
const SUBTRACT_NUMBER = 'SUBTRACT_NUMBER'


let initialState = {
    number: 0
};

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NUMBER:
            return {
                ...state,
                number: state.number + 1
            }
        case SUBTRACT_NUMBER:
            return {
                ...state,
                number: state.number - 1
            }


        default:
            return state;
    }
}


export const addNumber = () => ({type:ADD_NUMBER})
export const substractNumber = () => ({type:SUBTRACT_NUMBER})



