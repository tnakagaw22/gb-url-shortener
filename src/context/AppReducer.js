export default (state, action) => {
    switch (action.type) {
        case 'SET_LINKS_LOADING':
            return {
                ...state,
                isLinkLoading: action.payload
            }
        case 'SET_LINKS_LOAD_ERROR':
            return {
                ...state,
                linkLoadError: action.payload
            }
        case 'SET_LINKS':
            return {
                ...state,
                links: action.payload
            }
        case 'ADD_LINK':
            return {
                ...state,
                links: [...state.links, action.payload]
            }
        case 'REMOVE_LINK':
            return {
                ...state,
                links: state.links.filter((link, i) => i !== action.payload)
            }
        default:
            return state;
    }
}