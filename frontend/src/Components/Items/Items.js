import React, {Component} from 'react';
import './Items.css';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchItems} from "../../store/actions/itemsAction/itemsAction";
import {CATEGORIES} from "../../CATEGORIES";
import {apiURL} from "../../apiURL";

class Posts extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        if (id === undefined) {
            this.props.fetchItems('/');
        }
        this.props.fetchItems(id);
    }

    componentDidUpdate(prevProps) {
        const id = this.props.match.params.id;
        if (prevProps.match.params.id !== id) {
            if (id === undefined) {
                return this.props.fetchItems('/');
            }
            return this.props.fetchItems(id);
        }
    }

    render() {
        return (
            <div className="Items">
                <div className="categories-block">
                    <li><NavLink to="/">All items</NavLink></li>
                    {CATEGORIES.map(category => (
                        <li key={category}>
                        <NavLink to={`/items/${category}`}>{category}</NavLink>
                        </li>
                    ))}
                </div>
                <div className="items-block">
                    {this.props.match.params.id ? (
                      <h3>{this.props.match.params.id}</h3>
                    ) : (
                        <h3>all items</h3>
                    )}
                    {this.props.items.map(item => (
                        <div className="item-flex" key={item._id}>
                            <img src={apiURL + '/uploads/' + item.image} alt=""/>
                            <p>{item.title}</p>
                            <p>{item.price + '$'}</p>
                            <NavLink to="/item">View Product</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items.items,
});

const mapDispatchToProps = dispatch => ({
    fetchItems: (id) => dispatch(fetchItems(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);