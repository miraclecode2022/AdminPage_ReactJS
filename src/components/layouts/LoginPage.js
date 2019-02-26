import React, { Component } from 'react';
import '../../css/loginpage.scss';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'

class LoginPage extends Component {
    // eslint-disable-next-line
    constructor(props, context) {
        super(props, context);   
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                        <div className="card-body">
                            <div className="logo card-title">
                                <img src={logo} alt="Logo" />
                            </div>
                            <form className="form-signin">
                            <div className="form-label-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                <label htmlFor="inputEmail">Username</label>
                            </div>
                            <div className="form-label-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label remem" htmlFor="customCheck1" >Remember Password</label>
                            </div>
                            <Link className="btn btn-lg btn-block text-uppercase nutlogin" to="/AdminPage">Login</Link>
                            <hr className="my-4" />
                            <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fa fa-google mr-2" /> Login with Google</button>
                            <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fa fa-facebook-f mr-2" /> Login with Facebook</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div> 
            </React.Fragment>
        );
    }
}

export default LoginPage;