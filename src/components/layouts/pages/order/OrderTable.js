import React, { Component } from 'react';
import '../../../../css/Popup.scss'
import './Order.scss'
import { OrderConsumer } from './contextOrder'

class OrderTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            isPopup: false,
            orderId: ""
        }
    }
    render() {
        return (
            <OrderConsumer>
            {
                (c) => {
                    return(
                        <div className="table-responsive">
                            <table className="table table-sm table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    c.orders ? c.orders.map((d) => {
                                        return(
                                            <tr key={d._id}>
                                                <td className={`status ${d.status ? 'done' : 'not-yet'}`}>{c.typeOrder(d.status)}</td>
                                                <td>{c.timeSince(d.date)}</td>
                                                <td>
                                                    <button className="btn btn-primary mr-1" name="btnDetail" onClick={() => c.togglePopup(d._id, true, d.products)} type="button" >Detail</button>
                                                    {/* <button className="btn btn-danger" name="btnRemove" type="button" onClick={() => c.removeProduct(d._id)} >Remove</button> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={5}>
                                            <h5 className="text-center text-danger">No Orders</h5>
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                            {
                                c.isPopup
                                ?
                                    <Popup closePopup={() => c.togglePopup(c.orderId, null)} orderId={c.orderId} />
                                :
                                    null
                            }
                        </div>
                    )
                }
            }
            </OrderConsumer>
        );
    }
}
class Popup extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state = {
            order: []
        }
    }

    removeItem() {
        this.props.closePopup()
    }
    
    render() {
        return(
            <OrderConsumer>
            {
                (c) => {
                    return(
                        <div className='popup'>
                            <div className='popup_inner'>
                                <div className="popup_header">
                                    <h2>{c.typePopup ? "Order Detail" : "Add New Product"}</h2>
                                    <span onClick={this.props.closePopup}><i className="fa fa-close fa-2x"></i></span>
                                </div>
                                <form onSubmit={c.typePopup ? c.handleUpdate : c.handleCreateProduct}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="namePro">Customer Name : </label>
                                            <span> { c.firstname + " " + c.lastname  } </span>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="pricePro">Address : </label>
                                            <span> { c.address } </span>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="descPro">District : </label>
                                            <span> { c.district } </span>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="typePro">City : </label>
                                            <span> { c.city } </span>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="typePro">Phone : </label>
                                            <span> { c.phone } </span>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="typePro">Email : </label>
                                            <span> { c.email } </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            c.order.products ? c.order.products.map(d => {
                                                return (
                                                    <div key={d._id}>
                                                        <span> {d.count} </span>
                                                        <span> {d.total} </span>
                                                        {
                                                            c.products && c.products.filter(x => x._id === d._id).map(d => {
                                                                    console.log(d)
                                                                    return(
                                                                        <React.Fragment key={d._id}>
                                                                            <img src={d.image} className="product-thumbnail" alt={d.name} />
                                                                            <span>{d.name}</span>
                                                                        </React.Fragment>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className="form-group col-md-12">
                                            <label> Not Found Product </label>
                                        </div>
                                        }
                                    </div>
                                    {/* <button type="submit" className="btn btn-primary">{c.typePopup ? "Update" : "Add"}</button> */}
                                </form>
                            </div>
                        </div>
                    )
                }
            }
            </OrderConsumer>
        )
    }
}
export default OrderTable;