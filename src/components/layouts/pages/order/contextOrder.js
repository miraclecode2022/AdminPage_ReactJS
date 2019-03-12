import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const OrderContext = React.createContext()

class OrderProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: [],
            isPopup: false,
            typePopup: false,
            orderId: "",
            products: [],
            tempProducts: [],
            cart: [],
            detailProduct: [],
            cartTotal: 0,
            cartSubtotal: 0,
            cartTax: 0,
            isLoading: true,
            firstname: "",
            lastname: "",
            address: "",
            city: "",
            district: "",
            phone: "",
            email: "",
            customer : [],
            status: "",
            date : ""
        }
    }

    componentDidMount(){
        this.getListOrder()
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
    getListOrder = () => {
        fetch(`https://coffee-code-6868.herokuapp.com/order`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result.count > 0){
                this.setState({ 
                    orders : result.orders
                })
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    typeOrder = (status) => {
        if(status === 0){
            return "Not Yet"
        }
        else if(status === 1){
            return "Done"
        }
    }

    timeSince = (time) => {
        time.replace(/T/, ' ').replace(/\..+/, '')
        const datum = Date.parse(time);
        const timeStamp =  datum/1000;
        var a = new Date(timeStamp * 1000);
        var months = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' - ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    togglePopup = (id, isEdit, products = []) => {
        this.setState({
            isPopup: !this.state.isPopup,
            orderId: id,
            typePopup: isEdit ? true : false,
            tempProducts: [],
            products: []
        })
        if(isEdit){
            this.getOrderByID(id)
            return products && products.map((d) => { 
                this.getProductByID(d._id)
            })
        }else{
            this.setState({
                status : "",
                date : "",
            })
        }
    }

    getOrderByID = (id) => {
        fetch(`https://coffee-code-6868.herokuapp.com/order/${id}` , {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {
            if(result){
                this.setState({
                    status: "",
                    order : result.order,
                    firstname: result.order.customer.firstname,
                    lastname: result.order.customer.lastname,
                    address: result.order.customer.address,
                    city: result.order.customer.city,
                    district: result.order.customer.district,
                    phone: result.order.customer.phone,
                    email: result.order.customer.email,
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    getProductByID = async(id) => {
        await fetch(`https://coffee-code-6868.herokuapp.com/products/${id}` , {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(result => result.json())
        .then(result => {  
            let products = this.state.tempProducts
            if(result){
                products.push(result.product)
                this.setState({
                    products: products
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <OrderContext.Provider value={{
                    ...this.state,
                    togglePopup: this.togglePopup,
                    typeOrder: this.typeOrder,
                    timeSince : this.timeSince,
                    getProductByID : this.getProductByID
                }}>
                { this.props.children }
            </OrderContext.Provider>
            </div>
        );
    }
}

const OrderConsumer = OrderContext.Consumer

export { OrderProvider, OrderConsumer };