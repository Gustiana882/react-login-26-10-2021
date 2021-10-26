import { useHistory, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useHistory()
        const Url = Router.location.pathname
        const urlAuth = ['/login', '/sign-up']

        const { token: accessToken } = useSelector((state) => state.users)

        if (accessToken && (Url === '/login' || Url === '/sign-up')) {
            return <Redirect to="/" />
        }

        if (!accessToken && !urlAuth.find((val, i)=> Url === val)) {
            return <Redirect to="/login" />
        }

        return <WrappedComponent {...props} />
    }
}


export default withAuth