import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const UserContext = React.createContext()

class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            isPopup: false,
            isUpdate: false,
            userId: "",
            nameUser: "",
            emailUser: "",
            password: "",
            imageUser: null
        }
    }

    componentDidMount(){
        this.getListUser()
    }

    togglePopup = (id, isEdit) => {
        this.setState({
            isPopup: !this.state.isPopup,
            userId: id,
            isUpdate: isEdit ? true : false
        }, () => this.getListUser())
        if(isEdit){
            this.getUserById(id)
        }else{
            this.setState({
                userId: "",
                nameUser: "",
                emailUser: "",
                password: "",
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSelectImage = (e) => {
        this.setState({
            imageUser : e.target.files[0]
        })
    }

    getListUser = () => {
        fetch(`https://coffee-code-6868.herokuapp.com/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result.count > 0){
                this.setState({ users: result.users })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    getUserById = (id) => {
        fetch(`https://coffee-code-6868.herokuapp.com/users/${id}` , {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result.user){
                this.setState({
                    nameUser: result.user.name,
                    emailUser: result.user.email
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    removeProduct = (id) => {
        confirmAlert({
            title: 'Remove User',
            message: 'Do you want this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://coffee-code-6868.herokuapp.com/users/${id}` , {
                            method: "DELETE",
                            headers: {
                                "Content-Type" : "application/json",
                                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                            }
                        })
                        .then(result => result.json())
                        .then(result => {
                            if(result.msg){
                                this.getListUser()
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("name", this.state.nameUser)
        fd.append("email", this.state.emailUser)
        fd.append("image", this.state.imageUser)
        fetch(`http://localhost:8080/users/${this.state.userId}`, {
            method: "PATCH",
            headers: {
                // "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            // mimeType: "multipart/form-data",
            body: fd
        })
        .then(result => result.json())
        .then(result => {
            if(result.status){
                this.setState({
                    isPopup: false,
                    image : null
                }, () => this.getListUser())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleCreate = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("name", this.state.nameUser)
        fd.append("email", this.state.emailUser)
        fd.append("password", this.state.password)
        fd.append("image", this.state.imageUser)
        fetch(`http://localhost:8080/users/register`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            mimeType: "multipart/form-data" ,
            body: fd
        })
        .then(result => result.json())
        .then(result => {
            if(result.status){
                this.setState({
                    isPopup: false,
                }, () => this.getListUser())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                togglePopup: this.togglePopup,
                removeProduct: this.removeProduct,
                handleChange: this.handleChange,
                handleCreate: this.handleCreate,
                handleUpdate: this.handleUpdate,
                handleSelectImage: this.handleSelectImage
            }}>
            { this.props.children }
            </UserContext.Provider>
        );
    }
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer };