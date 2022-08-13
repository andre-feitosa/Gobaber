import axios from 'axios'

export const UserSLice = (state = [], {payload, type}: any) => {
    switch (type) {
        case 'singInRequest':
            return payload
        case 'singOut':
            return ''
        default: 
            return state;
    }
}