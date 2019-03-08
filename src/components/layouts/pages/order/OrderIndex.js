import React, { Component } from 'react';
import OrderTable from './OrderTable'
import { OrderProvider, OrderConsumer } from './contextOrder'
import '../../../../css/Popup.scss'

class OrderIndex extends Component {
    render() {
        return (
            <OrderProvider>
                <OrderConsumer>
                {
                    (c) => {
                        return(
                            <div className="container-fluid">
                                <h1 className="mt-4">Orders Page</h1>
                                {/* <button className="btn btn-lg btn-success mb-2" name="btnAdd" onClick={() => c.togglePopup(null, false)}>Add new product</button> */}
                                <div className="row">
                                    <div className="col-xs-6 col-md-12">
                                        <OrderTable />
                                    </div>
                                </div>      
                            </div>
                        )
                    }
                }
                </OrderConsumer>
            </OrderProvider>
        );
    }
}

export default OrderIndex;