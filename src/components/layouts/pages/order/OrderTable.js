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
                                                    <button className="btn btn-primary mr-1" name="btnUpdate" onClick={() => c.togglePopup(d._id, true)} type="button">Detail</button>
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
                            {/* {
                                c.isPopup
                                ?
                                    <Popup closePopup={() => c.togglePopup(c.orderId, null)} orderId={c.orderId} />
                                :
                                    null
                            } */}
                        </div>
                    )
                }
            }
            </OrderConsumer>
        );
    }
}

export default OrderTable;