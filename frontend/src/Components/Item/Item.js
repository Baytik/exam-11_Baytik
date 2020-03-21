import React, {Component} from 'react';
import './Item.css';
import {connect} from "react-redux";
import {apiURL} from "../../apiURL";
import {deleteItem, fetchItem} from "../../store/actions/itemsAction/itemsAction";
import {NavLink} from "react-router-dom";

class Posts extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchItem(id);
    }

    deleteItemHandler = async () => {
      const id = this.props.match.params.id;
       await this.props.deleteItem(id)
    };

    render() {
        return (
            <div className="Item">
                <h4>Товар № {this.props.match.params.id}</h4>
                {this.props.item.map(product => (
                    <div className="product-block" key={product._id}>
                        <h5>Seller: {product.user.displayName}</h5>
                        <img src={apiURL + '/uploads/' + product.image} alt=""/>
                        <p>Title: {product.title}</p>
                        <p>Description: {product.description}</p>
                        <h4>Price: {product.price}$</h4>
                        <button disabled={true}>Phone Number: {product.user.phoneNumber}</button>
                        {this.props.user ? this.props.user._id === product.user._id && (
                            <div className="delete-block">
                            <button onClick={this.deleteItemHandler}>Sales</button>
                            </div>
                        ) : (
                            <div>
                            <NavLink to="/">Back</NavLink>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.items.item,
    user: state.user.user,
    message: state.items.message
});

const mapDispatchToProps = dispatch => ({
    fetchItem: (id) => dispatch(fetchItem(id)),
    deleteItem: (id) => dispatch(deleteItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);