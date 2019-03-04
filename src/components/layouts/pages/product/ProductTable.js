import React, { Component } from 'react'
import '../../../../css/Popup.scss'
import { ProductConsumer } from './contextProduct'

class ProductTable extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);
        this.state = {
            products: [],
            isPopup: false,
            productId: ""
        }
    }
    
    render() {
        return (
            <ProductConsumer>
            {
                (c) => {
                    return(
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
                                    c.products && c.products.length ? c.products.map((d) => {
                                        return(
                                            <tr key={d._id}>
                                                <td><img src={d.image} className="product-thumbnail" alt={d.name} /></td>
                                                <td>{d.name}</td>
                                                <td>{c.typeProduct(d.type)}</td>
                                                <td>${d.price}</td>
                                                <td>
                                                    <button className="btn btn-primary mr-1" name="btnUpdate" onClick={() => c.togglePopup(d._id, true)} type="button">Edit</button>
                                                    <button className="btn btn-danger" name="btnRemove" type="button" onClick={() => c.removeProduct(d._id)} >Remove</button>
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
                                c.isPopup
                                ?
                                    <Popup closePopup={() => c.togglePopup(c.productId, null)} productId={c.productId} />
                                :
                                    null
                            }
                        </div>
                    )
                }
            }
            </ProductConsumer>
        );
    }
}

class Popup extends Component {
    // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state = {
            product: []
        }
    }

    removeItem() {
        this.props.closePopup()
    }
    
    render() {
        return(
            <ProductConsumer>
            {
                (c) => {
                    return(
                        <div className='popup'>
                            <div className='popup_inner'>
                                <div className="popup_header">
                                    <h2>{c.typePopup ? "Edit Product" : "Add New Product"}</h2>
                                    <span onClick={this.props.closePopup}><i className="fa fa-close fa-2x"></i></span>
                                </div>
                                <form onSubmit={c.typePopup ? c.handleUpdate : c.handleCreateProduct}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="namePro">Name Product</label>
                                            <input type="text" className="form-control" id="namePro" name="namePro" placeholder="Name product" onChange={c.handleChange} value={c.namePro} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="pricePro">Price</label>
                                            <input type="number" className="form-control" id="pricePro" name="pricePro" placeholder="Price" onChange={c.handleChange} value={c.pricePro} />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="descPro">Description</label>
                                            <textarea className="form-control" name="descPro" id="descPro" onChange={c.handleChange} value={c.descPro}></textarea>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="typePro">Type</label>
                                            <select id="typePro" name="typePro" value={c.typePro} className="form-control" onChange={c.handleChange} >
                                                <option value="0">Coofee</option>
                                                <option value="1">Tea</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="imagePro">Image</label>
                                            <input type="file" name="imagePro" id="imagePro" onChange={c.handleSelectImage} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">{c.typePopup ? "Update" : "Add"}</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            }
            </ProductConsumer>
        )
    }
}

export default ProductTable;