/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ActionsUsers from "../../Storages/Actions/Users"
import midlewareAuth from "../../Utils/PagesAuth"
import bg from '../../Assets/bg1.jpg'
import axios from 'axios'
import './login.scoped.css'

const Login = (props) => {

    const route = useHistory()
    const [change, setChange] = useState({ username: '', password: '' })
    const [error, setError] = useState({})

    function handleChange(e) {
        const name = e.target.name 
        const value = e.target.value
        setChange({ ...change, ...{ [name]: value } })
    }
    
    const submit = async (e) => {
        e.preventDefault()
        axios({
            url: "https://tasklogin.herokuapp.com/api/login",
            method: "POST",
            data: change
        })
            .then(function ({ data }) {
                props.AuthSet(data.access_token)
                props.UserSet([{name: 'johndoe'}])
                route.push('/')
            })
            .catch(function (error) {
                if (error.response) {
                    const { data, headers } = error.response
                    if (headers['content-length'] === '54') {
                        setError({ uname: data.message})
                    } else if (headers['content-length'] === '39') {
                        setError({ pass: data.message})
                    }
                }
            });
    }

    return (
        <>
            <img className="bg" src={bg} alt="" />
            <div className="screen">
                <div className="card">
                    <div>
                        <h1 className="text-xl font-semibold text-center">Login</h1>
                    </div>
                    <form method="post" onSubmit={submit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" onChange={handleChange} />
                            <span id="uname" className="error">{(error['uname'])? error['uname']: ''}</span>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={handleChange} />
                            <span id="upass" className="error">{(error['pass'])? error['pass']: ''}</span>
                        </div>
                        <div className="btn-form">
                            <button type="submit" className="btn-login">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

// get redux
const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}
// set redux
const mapDispatchToProps = (dispacth) => {
    return {
        AuthSet: bindActionCreators(ActionsUsers.AuthSet, dispacth),
        UserSet: bindActionCreators(ActionsUsers.UserSet, dispacth),
    }
}

export default midlewareAuth( connect(mapStateToProps,mapDispatchToProps)(Login) )