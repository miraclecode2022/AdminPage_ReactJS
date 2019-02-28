import React, { Component } from 'react';
import '../../../../css/Popup.scss'

class Product_Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            isPopup: false
        }
    }

    componentDidMount(){
        this.getListProduct()
    }

    getListProduct = () => {
        fetch(`http://localhost:8080/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result.count > 0){
                this.setState({ products: result.products })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    typeProduct = (type) => {
        if(type === 0){
            return "Coffee"
        }
    }

    togglePopup = () => {
        this.setState({
            isPopup: !this.state.isPopup
        })
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-sm table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products && this.state.products.length ? this.state.products.map((d) => {
                            return(
                                <tr key={d._id}>
                                    <td>{d.image}</td>
                                    <td>{d.name}</td>
                                    <td>{this.typeProduct(d.type)}</td>
                                    <td>${d.price}</td>
                                    <td>
                                        <button className="btn btn-primary mr-1" onClick={this.togglePopup} type="button">Edit</button>
                                        <button className="btn btn-danger" type="button">Remove</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={5}>
                                <h5 className="text-center text-danger">No products</h5>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
                {
                    this.state.isPopup
                    ?
                        <Popup text="Edit Product" closePopup={this.togglePopup.bind(this)} />
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
    }
    
    render() {
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="popup_header">
                        <h1>{this.props.text}</h1>
                        <span onClick={this.props.closePopup}><i className="fa fa-close fa-2x"></i></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product_Table;