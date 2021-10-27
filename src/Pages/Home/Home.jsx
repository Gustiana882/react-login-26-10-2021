import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionUser from '../../Storages/Actions/Users'
import midlewareAuth from '../../Utils/PagesAuth'
import bg from '../../Assets/bg.jpg'
import './home.scoped.css'

export const Home = (props) => {

    const route = useHistory()

    function logout() {
        props.Logout()
        route.push('/login')
    }

    return (
        <div>
            <img className="bg" src={bg} alt="" />
            <div className="screen">
                <div className="navbar">
                    <h1 className="brand">Welcome</h1>
                    <button className="btn-logout" onClick={logout}>Logout</button>
                </div>
                <div className="title">
                    <h1>Welcome Home</h1>
                    <h1>{props.users.data.name}</h1>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    Logout: bindActionCreators(ActionUser.AuthClear, dispatch)
})

export default midlewareAuth( connect(mapStateToProps, mapDispatchToProps)(Home) )
