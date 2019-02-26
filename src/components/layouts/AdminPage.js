import React, { Component } from 'react';
import '../../css/grayscale.css';
import Navbar from './Navbar';


class AdminPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                  {/* Header */}
                  <header className="masthead">
                    <div className="container d-flex h-100 align-items-center">
                      <div className="mx-auto text-center">
                        <h1 className="mx-auto my-0 text-uppercase">COFFEE CODE</h1>
                        <h2 className="text-white mx-auto mt-2 mb-5">I TURN COFFE INTO CODES</h2>
                        <a href="#about" className="btn btn-primary js-scroll-trigger">Get Started</a>
                      </div>
                    </div>
                  </header>
                  {/* Footer */}
                  <footer className="bg-black small text-center text-white-50">
                    <div className="container">
                      Coppyright © Coffee Code 2019 <br/>
                      Design By GiaLong
                    </div>
                  </footer>
            </React.Fragment>
        );
    }
}

export default AdminPage;