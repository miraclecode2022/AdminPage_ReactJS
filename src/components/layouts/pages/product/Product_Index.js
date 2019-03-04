import React, { Component } from 'react';
import ProductTable from './ProductTable'
import { ProductProvider, ProductConsumer } from './contextProduct'
import '../../../../css/Popup.scss'

class Product_Index extends Component {
    render() {
        return (
            <ProductProvider>
                <ProductConsumer>
                {
                    (c) => {
                        return(
                            <div className="container-fluid">
                                <h1 className="mt-4">Products Page</h1>
                                <button className="btn btn-lg btn-success mb-2" name="btnAdd" onClick={() => c.togglePopup(null, false)}>Add new product</button>
                                <div className="row">
                                    <div className="col-xs-6 col-md-12">
                                        <ProductTable />
                                    </div>
                                </div>      
                            </div>
                        )
                    }
                }
                </ProductConsumer>
            </ProductProvider>
        );
    }
}

export default Product_Index;