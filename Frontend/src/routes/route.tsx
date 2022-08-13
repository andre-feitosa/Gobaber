import { Route , Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authUser } from '../redux/actions/authActions'

interface PrivateProps {
    children: any,
    redirect: any
}

export function RouteNotLogin({children, redirect}: PrivateProps) {
    const selector = useSelector(authUser)

    return selector.payload.auth == true ? children : <Navigate to={redirect}/>
}

export function RouteLogin({children, redirect}: PrivateProps) {
    const selector = useSelector(authUser)

    return !selector.payload.auth ? children : <Navigate to={redirect}/>
}