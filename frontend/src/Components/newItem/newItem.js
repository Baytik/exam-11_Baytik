import React, {Component} from 'react';
import './newItem.css';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createItem} from "../../store/actions/itemsAction/itemsAction";
import {CATEGORIES} from "../../CATEGORIES";

class NewPost extends Component {

    state = {
        title: '',
        description: '',
        image: null,
        price: '',
        category: CATEGORIES[0]
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};
    fileChangeHandler = e => {this.setState({[e.target.name]: e.target.files[0]})};

    postNewItem = async () => {
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('image', this.state.image);
        formData.append('category', this.state.category);
        formData.append('price', this.state.price);
        await this.props.createItem(formData);
    };

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div className="new-item">
                <div className="new-item-block">
                    <span>Title</span>
                    <input
                        type="text"
                        className="input-1"
                        name="title"
                        value={this.state.title}
                        onChange={this.changeInputHandler}
                    />
                </div>
                <div className="new-item-block">
                    <span>Description</span>
                    <input
                        type="text"
                        className="input-2"
                        name="description"
                        value={this.state.description}
                        onChange={this.changeInputHandler}
                    />
                </div>
                <div className="new-item-block">
                    <span>Image</span>
                    <input
                        type="file"
                        className="input-3"
                        name="image"
                        onChange={this.fileChangeHandler}
                    />
                </div>
                <div className="new-item-block">
                    <span>Category</span>
                    <select className="input-4" value={this.state.category} name="category" onChange={this.changeInputHandler}>
                        {CATEGORIES.map(category => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="new-item-block">
                    <span>Price</span>
                    <input
                        type="number"
                        className="input-5"
                        name="price"
                        value={this.state.price}
                        onChange={this.changeInputHandler}
                    />
                </div>
                <div>
                    <button className="btn" onClick={this.postNewItem}>Create item</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    createItem: (item) => dispatch(createItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);