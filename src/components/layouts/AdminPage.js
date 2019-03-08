import React, { Component } from 'react';
import '../../css/Sidebar.scss';
import { ReactConsumer } from '../../context'
import { Redirect, Route, Switch } from 'react-router-dom'
import $ from 'jquery'

import Navbar from './Navbar';
import Footer from './Footer'
import MLeft from './MLeft'
import Index from './pages/Index'
import Product_Index from './pages/product/Product_Index'
import User_Index from './pages/user/User_Index'
import OrderIndex from './pages/order/OrderIndex';

class AdminPage extends Component {
    componentDidMount = async() => {
        setTimeout(() => {
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        }, 500)
    }

    render() {
        return (
            <ReactConsumer>
            {
                (c) => {
                return(
                    c.isSignin ?
                    <React.Fragment>
                        <div className="d-flex" id="wrapper">
                            <MLeft value={c} />
                            <div id="page-content-wrapper">
                                <Navbar/>
                                <Switch>
                                    <Route path='/dashboard' exact component={Index} />
                                    <Route path='/dashboard/product' component={Product_Index} />
                                    <Route path='/dashboard/user' component={User_Index} />
                                    <Route path='/dashboard/order' component={OrderIndex} />
                                </Switch>
                                <Footer/>
                            </div>
                        </div>
                    </React.Fragment>
                    : 
                    <Redirect to="/"/> 
                    )
                }
            }
            </ReactConsumer>
        );
    }
}

export default AdminPage;