import React, { Component } from 'react';
import ProductTable from './ProductTable'
import '../../../../css/Popup.scss'

class Product_Index extends Component {
    constructor(props){
        super(props)
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
                <h1 className="mt-4">Products Page</h1>
                <button className="btn btn-lg btn-success mb-2" onClick={this.togglePopup}>Add new product</button>
                <div className="row">
                    <div className="col-xs-6 col-md-12">
                        <ProductTable reload={reload => this.reloadChild = reload} />
                    </div>
                </div>
                {
                    this.state.isPopup
                    ?
                        <Popup text="Add New Product" closePopup={this.togglePopup} />
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
            namePro: "",
            pricePro: "",
            typePro: 0,
            descPro: "",
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
        fetch(`http://localhost:8080/products/create`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({
                "name": this.state.namePro,
                "price": this.state.pricePro,
                "type": this.state.typePro,
                "desc": this.state.descPro
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
                                <label htmlFor="namePro">Name Product</label>
                                <input type="text" className="form-control" id="namePro" name="namePro" placeholder="Name product" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="pricePro">Price</label>
                                <input type="number" className="form-control" id="pricePro" name="pricePro" placeholder="Price" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="descPro">Description</label>
                                <textarea className="form-control" name="descPro" id="descPro" onChange={this.handleChange} value={this.state.descPro}></textarea>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="typePro">Type</label>
                                <select id="typePro" name="typePro" value="0" className="form-control" onChange={this.handleChange} >
                                    <option value="0">Coofee</option>
                                    <option value="1">Tea</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Product_Index;