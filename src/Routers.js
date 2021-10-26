import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
import notFound from './Pages/notfound.jsx'

function Routers() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="*" component={notFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routers