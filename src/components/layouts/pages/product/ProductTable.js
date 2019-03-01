import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import '../../../../css/Popup.scss'

class ProductTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            isPopup: false,
            productId: ""
        }
    }
    
    componentDidMount(){
        this.getListProduct()
        this.props.reload(this.getListProduct);
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
        else if(type === 1){
            return "Tea"
        }
    }

    togglePopup = (id) => {
        this.setState({
            isPopup: !this.state.isPopup,
            productId: id
        }, () => this.getListProduct())
    }

    reloadProduct = (props) => {
        if(props){
            this.getListProduct()
        }
    }

    removeProduct = (id) => {
        confirmAlert({
            title: 'Remove product',
            message: 'Do you want this product ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`http://localhost:8080/products/${id}` , {
                            method: "DELETE",
                            headers: {
                                "Content-Type" : "application/json",
                                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
                            }
                        })
                        .then(result => result.json())
                        .then(result => {
                            if(result.msg){
                                this.getListProduct()
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
                                        <button className="btn btn-primary mr-1" onClick={() => this.togglePopup(d._id)} type="button">Edit</button>
                                        <button className="btn btn-danger" type="button" onClick={() => this.removeProduct(d._id)} >Remove</button>
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
                        <Popup text="Edit Product" closePopup={() => this.togglePopup(this.state.productId)} productId={this.state.productId} />
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
            product: []
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

    componentDidMount = () => {
        fetch(`http://localhost:8080/products/${this.props.productId}` , {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result.product){
                this.setState({
                    namePro: result.product.name,
                    pricePro: result.product.price,
                    typePro: result.product.type,
                    descPro: result.product.desc
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/products/${this.props.productId}`, {
            method: "PATCH",
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
                                <input type="text" className="form-control" id="namePro" name="namePro" placeholder="Name product" onChange={this.handleChange} value={this.state.namePro} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="pricePro">Price</label>
                                <input type="number" className="form-control" id="pricePro" name="pricePro" placeholder="Price" onChange={this.handleChange} value={this.state.pricePro} />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="descPro">Description</label>
                                <textarea className="form-control" name="descPro" id="descPro" onChange={this.handleChange} value={this.state.descPro}></textarea>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="typePro">Type</label>
                                <select id="typePro" name="typePro" value={this.state.typePro} className="form-control" onChange={this.handleChange} >
                                    <option value="0">Coofee</option>
                                    <option value="1">Tea</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Upadate</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProductTable;