import React, { Component } from 'react';
import User_Table from './User_Table'
import '../../../../css/Popup.scss'

class User_Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopup: false,
            isReload: false
        }
    }
    togglePopup = () => {
        this.setState({
            isPopup: !this.state.isPopup,
        }, () => {this.reloadChild()})
    }


    render() {
        return (
            <div className="container-fluid">
            <h1 className="mt-4">Users Page</h1>
            <button className="btn btn-lg btn-success mb-2" onClick={this.togglePopup}>Add new User</button>
            <div className="row">
                <div className="col-xs-6 col-md-12">
                    <User_Table reload={reload => this.reloadChild = reload} />
                </div>
            </div>
            {
                    this.state.isPopup
                    ?
                        <Popup text="Add New User" closePopup={this.togglePopup} />
                    :
                        null
            }
        </div>
        );
    }
}

class Popup extends Component {
    constructor(props){
        super(props)
        this.state = {
            nameUser: "",
            emailUser: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    removeItem() {
        this.props.closePopup()
    }


    handleUpdate = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/users/register`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({
                "name": this.state.nameUser,
                "email": this.state.emailUser,
                "password": this.state.password
            })
        })
        .then(result => result.json())
        .then(result => {
            if(result.msg){
                this.removeItem()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="popup_header">
                        <h1>{this.props.text}</h1>
                        <span onClick={this.props.closePopup}><i className="fa fa-close fa-2x"></i></span>
                    </div>
                    <form onSubmit={this.handleUpdate}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="nameUser">User Name</label>
                                <input type="text" className="form-control" id="nameUser" name="nameUser" placeholder="User Name" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="emailUser">Email</label>
                                <input type="text" className="form-control" id="emailUser" name="emailUser" placeholder="Email" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.handleChange} required />
                            </div>
                            
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default User_Index;