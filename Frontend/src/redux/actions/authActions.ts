export function authUser(obj: any) {
    return {
        type: "authUser",
        payload: obj
    }
}