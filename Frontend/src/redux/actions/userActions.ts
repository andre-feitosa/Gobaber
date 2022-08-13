export function singInRequest(obj: any) {
    return ({
        type: 'singInRequest',
        payload: obj
    })
}

export function singOut() {
    return ({
        type: 'singOut'
    })
}
