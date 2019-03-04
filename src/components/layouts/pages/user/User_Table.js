import React, { Component } from 'react';
import { UserConsumer } from './contextUser'
import '../../../../css/Popup.scss'

class User_Table extends Component {
    render() {
        return (
            <UserConsumer>
            {
                (c) => {
                    return(
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
                                    c.users && c.users.length 
                                    ? 
                                    c.users.map((d) => {
                                        return(
                                            <tr key={d._id}>
                                                <td>{d.name}</td>
                                                <td>{d.email}</td>
                                                <td>
                                                    <button className="btn btn-primary mr-1" onClick={() => c.togglePopup(d._id, true)} type="button">Edit</button>
                                                    <button className="btn btn-danger" type="button" onClick={() => c.removeProduct(d._id)} >Remove</button>
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
                                c.isPopup
                                ?
                                    <Popup text="Edit User" closePopup={() => c.togglePopup(c.userId, true)} userId={c.userId} />
                                :
                                    null
                            }
                        </div>
                    )
                }
            }
            </UserConsumer>        
        );
    }
}


class Popup extends Component {
    removeItem() {
        this.props.closePopup()
    }
    
    render() {
        return(
            <UserConsumer>
            {
                (c) => {
                    return(
                        <div className='popup'>
                            <div className='popup_inner'>
                                <div className="popup_header">
                                    <h1>{c.isUpdate ? "Edit User": "Add New User"}</h1>
                                    <span onClick={this.props.closePopup}><i className="fa fa-close fa-2x"></i></span>
                                </div>
                                <form onSubmit={c.isUpdate ? c.handleUpdate : c.handleCreate}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nameUser">User Name</label>
                                            <input type="text" className="form-control" id="nameUser" name="nameUser" placeholder="User Name" onChange={c.handleChange} value={c.nameUser} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="emailUser">Email</label>
                                            <input type="text" className="form-control" id="emailUser" name="emailUser" placeholder="Email" onChange={c.handleChange} value={c.emailUser} />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={c.handleChange} required />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">{c.isUpdate ? "Update": "Add"}</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            }
            </UserConsumer>
        )
    }
}




export default User_Table;