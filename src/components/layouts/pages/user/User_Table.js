import React, { Component } from 'react';
import '../../../../css/Popup.scss'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class User_Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            isPopup: false,
            userId: ""
        }
    }
    componentDidMount(){
        this.getListUser()
        this.props.reload(this.getListUser);
    }

    getListUser = () => {
        fetch(`http://localhost:8080/users`, {
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
    
    togglePopup = (id) => {
        this.setState({
            isPopup: !this.state.isPopup,
            userId: id
        }, () => this.getListUser())
    }

    removeProduct = (id) => {
        confirmAlert({
            title: 'Remove User',
            message: 'Do you want this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8080/users/${id}` , {
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

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-sm table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users && this.state.users.length 
                        ? 
                        this.state.users.map((d) => {
                            return(
                                <tr key={d._id}>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>
                                        <button className="btn btn-primary mr-1" onClick={() => this.togglePopup(d._id)} type="button">Edit</button>
                                        <button className="btn btn-danger" type="button" onClick={() => this.removeProduct(d._id)} >Remove</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={5}>
                                <h5 className="text-center text-danger">No Users</h5>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
                {
                    this.state.isPopup
                    ?
                        <Popup text="Edit User" closePopup={() => this.togglePopup(this.state.userId)} userId={this.state.userId} />
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
            password: "",
            user: []
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    removeItem() {
        // remove scripts then:
        this.props.closePopup()
    }


    // Cycle life trc khi render sẽ chạy dòng dày để get user theo id
    componentDidMount = () => {
        fetch(`http://localhost:8080/users/${this.props.userId}` , {
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
    
    handleUpdate = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/users/${this.props.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({
                name: this.state.nameUser,
                email: this.state.emailUser
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
                                <input type="text" className="form-control" id="nameUser" name="nameUser" placeholder="User Name" onChange={this.handleChange} value={this.state.nameUser} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="emailUser">Email</label>
                                <input type="text" className="form-control" id="emailUser" name="emailUser" placeholder="Email" onChange={this.handleChange} value={this.state.emailUser} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Upadate</button>
                    </form>
                
                </div>
            </div>
        )
    }
}




export default User_Table;