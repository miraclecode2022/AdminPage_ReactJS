import React, { Component } from 'react';
import { UserProvider, UserConsumer } from './contextUser'
import User_Table from './User_Table'
import '../../../../css/Popup.scss'

class User_Index extends Component {
    render() {
        return (
            <UserProvider>
                <UserConsumer>
                {
                    (c) => {
                        return(
                            <div className="container-fluid">
                                <h1 className="mt-4">Users Page</h1>
                                <button className="btn btn-lg btn-success mb-2" onClick={() => c.togglePopup(null, false)}>Add New User</button>
                                <div className="row">
                                    <div className="col-xs-6 col-md-12">
                                        <User_Table />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                </UserConsumer>
            </UserProvider>
            
        );
    }
}

export default User_Index;