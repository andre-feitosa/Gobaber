export const AuthUser = (state = false, {type, payload}: any) => {
    switch (type) {
        case "authUser":
            console.log(payload)

            return payload
        default: return state
    }
}