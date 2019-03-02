import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const ProductContext = React.createContext()

class ProductProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isPopup: false,
            typePopup: false,
            productId: "",
            namePro: "",
            pricePro: "",
            typePro: 0,
            descPro: "",
        }
    }

    componentDidMount(){
        this.getListProduct()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
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

    togglePopup = (id, isEdit) => {
        this.setState({
            isPopup: !this.state.isPopup,
            productId: id,
            typePopup: isEdit ? true : false
        })
        if(isEdit){
            this.getProductByID(id)
        }else{
            this.setState({
                namePro: "",
                pricePro: "",
                typePro: 0,
                descPro: "",
            })
        }
    }

    getProductByID = (id) => {
        fetch(`http://localhost:8080/products/${id}` , {
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

    handleCreateProduct = (e) => {
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
                this.setState({
                    isPopup: false
                }, () => this.getListProduct())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleUpdate = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/products/${this.state.productId}`, {
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
                this.setState({
                    isPopup: false
                }, () => this.getListProduct())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                togglePopup: this.togglePopup,
                typeProduct: this.typeProduct,
                removeProduct: this.removeProduct,
                handleChange: this.handleChange,
                handleCreateProduct: this.handleCreateProduct,
                handleUpdate: this.handleUpdate
            }}>
            { this.props.children }
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer };