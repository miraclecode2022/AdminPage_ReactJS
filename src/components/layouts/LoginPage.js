import React, { Component } from 'react';
import '../../css/loginpage.scss';
import logo from '../../img/logo.png'
import { ReactConsumer } from '../../context'
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {
    // eslint-disable-next-line
    constructor(props, context) {
        super(props, context);   
    }
    
    render() {
        return (
            <ReactConsumer>
            {
                (value) => {
                    return(
                        value.isSignin
                        ?
                        <Redirect to="/dashboard"/> 
                        :
                        <React.Fragment>
                            <div className="wrapper">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto middle">
                                            <div className="card card-signin my-5">
                                                <div className="card-body">
                                                    <div className="logo card-title">
                                                        <img src={logo} alt="Logo" />
                                                    </div>
                                                    { value.messageRes ? <p className="text-center text-danger">{value.messageRes}</p> : null}
                                                    <form className="form-signin" onSubmit={value.handleSubmit}>
                                                        <div className="form-label-group">
                                                            <input type="email" id="email" name="email" className="form-control" onChange={value.handleChange} placeholder="Email address" required autoFocus />
                                                            <label htmlFor="email">Email</label>
                                                        </div>
                                                        <div className="form-label-group">
                                                            <input type="password" id="password" name="password" className="form-control" onChange={value.handleChange} placeholder="Password" required />
                                                            <label htmlFor="password">Password</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                            <label className="custom-control-label remem" htmlFor="customCheck1" >Remember Password</label>
                                                        </div>
                                                        <button className="btn btn-lg btn-block text-uppercase nutlogin" type="submit" disabled={value.isLoading ? true : false}>{value.isLoading ? <i className="fa fa-spinner fa-spin" style={{fontSize: 24}}></i> : "Login" }</button>
                                                        {/* <hr className="my-4" />
                                                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fa fa-google mr-2" /> Login with Google</button>
                                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fa fa-facebook-f mr-2" /> Login with Facebook</button> */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </React.Fragment>
                    )
                }
            }
            </ReactConsumer>
        );
    }
}

export default LoginPage;