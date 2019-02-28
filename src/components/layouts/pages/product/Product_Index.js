import React, { Component } from 'react';
import ProductTable from './ProductTable'

class Product_Index extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4">Products Page</h1>
                <div className="row">
                    <div className="col-xs-6 col-md-12">
                        <ProductTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default Product_Index;