import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import { VerifyToken } from './components/functions/UserFN'

const ReactContext = React.createContext()

class ReactProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isSignin: false,
            isLoading: false,
            messageRes: ''
        }
    }

    async componentDidMount() {
        if(localStorage.getItem('access_token')){
            const token = localStorage.getItem('access_token')
            VerifyToken(token).then(result => {
                if(result){
                    this.setState({ isSignin: true })
                } else {
                    this.setState(() => {
                        return { isSignin: false }
                    }, () => localStorage.removeItem('access_token'))
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        this.setState({ isLoading: true })
        e.preventDefault()
        fetch(`http://localhost:8080/users/login` , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(result => result.json())
        .then(result => {
            this.setState({
                messageRes: result.message, isLoading: false
            })
            if(result.token){
                this.setState(() => {
                    return { isSignin: true, isLoading: false }
                }, () => localStorage.setItem('access_token', result.token))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleLogout = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Do you want logout ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.setState(() => {
                            return { isSignin: false, messageRes: '' }
                        }, () => {
                            localStorage.removeItem('access_token')
                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    render() {
        return (
            <ReactContext.Provider value={{
                ...this.state,
                handleChange: this.handleChange,
                handleSubmit: this.handleSubmit,
                handleLogout: this.handleLogout
            }}>
                { this.props.children }
            </ReactContext.Provider>
        );
    }
}

const ReactConsumer = ReactContext.Consumer

export { ReactProvider, ReactConsumer };