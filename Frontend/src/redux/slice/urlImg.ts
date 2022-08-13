export const UrlSlice = (state = '', {payload, type}: any) => {
    switch (type) {
        case 'URLIMG':
            return payload.data.id
        default: 
            return state;
    }
}