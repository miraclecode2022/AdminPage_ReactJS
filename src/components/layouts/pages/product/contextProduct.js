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
            imagePro: null
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

    handleSelectImage = (e) => {
        this.setState({
            imagePro : e.target.files[0]
        })
    }

    getListProduct = () => {
        fetch(`https://coffee-code-6868.herokuapp.com/products`, {
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
        fetch(`https://coffee-code-6868.herokuapp.com/products/${id}` , {
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
                        fetch(`https://coffee-code-6868.herokuapp.com/products/${id}` , {
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
        const fd = new FormData()
        fd.append("name", this.state.namePro)
        fd.append("price", this.state.pricePro)
        fd.append("type", this.state.typePro)
        fd.append("desc", this.state.descPro)
        fd.append("image", this.state.imagePro)
        fetch(`https://coffee-code-6868.herokuapp.com/products/create`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            mimeType: "multipart/form-data" ,
            body: fd
        })
        .then(result => result.json())
        .then(result => {
            if(result.status){
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
        const fd = new FormData()
        fd.append("name", this.state.namePro)
        fd.append("price", this.state.pricePro)
        fd.append("type", this.state.typePro)
        fd.append("desc", this.state.descPro)
        fd.append("image", this.state.imagePro)
        fetch(`https://coffee-code-6868.herokuapp.com/products/${this.state.productId}`, {
            method: "PATCH",
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
            },
            body: fd
        })
        .then(result => result.json())
        .then(result => {
            if(result.message){
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
                handleUpdate: this.handleUpdate,
                handleSelectImage: this.handleSelectImage
            }}>
            { this.props.children }
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer };