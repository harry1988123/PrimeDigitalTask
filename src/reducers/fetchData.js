const initialState =  {};

const fetchThings = (state = initialState, action) =>{ 
    switch(action.type){
        case 'COLOR': return { ...state, color: action.payload }
        case 'SHAPE': return { ...state, shape: action.payload } 
        case 'SIZE': return  { ...state, size: action.payload } 
        case 'STORE_COLOR': return { ...state, selectedColorList: action.payload } 
        case 'STORE_SHAPE': return { ...state, selectedShapeList: action.payload } 
        case 'STORE_SIZE': return { ...state, selectedSizeList: action.payload }
        case 'SEARCH_TEXT': return { ...state, selectedText: action.payload }
        case 'SEARCH_RESULT': return { ...state, searchResult: action.payload }
        default:
            return state;
    }
} 

export default fetchThings;