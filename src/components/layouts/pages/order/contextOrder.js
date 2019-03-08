import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const OrderContext = React.createContext()

class OrderProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isPopup: false,
            typePopup: false,
            orderId: "",
            products: [],
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
            console.log(result);
            if(result.count > 0){
                this.setState({ 
                    status: "",
                    orders : result.orders,
                    customer : result.customer
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
        const date =  datum/1000;
        var seconds = Math.floor(((new Date().getTime()/1000) - date)),
        interval = Math.floor(seconds / 31536000);
        console.log(seconds);
        if (interval > 1) return interval + "y";
    
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + "m";
    
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval + "d";
    
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + "h";
    
        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + "m ";
    
        return Math.floor(seconds) + "s";
    }

    togglePopup = (id, isEdit) => {
        this.setState({
            isPopup: !this.state.isPopup,
            orderId: id,
            typePopup: isEdit ? true : false
        })
        if(isEdit){
            this.getOrderByID(id)
        }else{
            this.setState({
                status : "",
                date : ""
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
            if(result.order){
                this.setState({
                    
                })
            }
            console.log(result.order);
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
                    timeSince : this.timeSince
                    
                }}>
                { this.props.children }
            </OrderContext.Provider>
            </div>
        );
    }
}

const OrderConsumer = OrderContext.Consumer

export { OrderProvider, OrderConsumer };