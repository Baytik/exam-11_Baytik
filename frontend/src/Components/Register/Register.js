import React, {Component} from 'react';
import './Register.css';
import {postRegister} from "../../store/actions/userLogAction/userLogAction";
import {connect} from "react-redux";

class Register extends Component {

    state = {
        username: '',
        password: '',
        passwordAgain: '',
        displayName: '',
        phoneNumber: ''
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};

    newUser = async () => {
        if (this.state.password === this.state.passwordAgain) {
            const User = {
                username: this.state.username,
                password: this.state.password,
                displayName: this.state.displayName,
                phoneNumber: this.state.phoneNumber
            };
            await this.props.postRegister(User);
        } else {
            alert('Passwords do not match')
        }
    };

    render() {
        return (
            <div className="register">
                <p>Register</p>
                <div>
                    <input type="text" placeholder="Write email" name="username" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write your phone number" name="phoneNumber" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write your Display name" name="displayName" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write password" name="password" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" placeholder="Write your password again"
                           name="passwordAgain"
                           onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <button onClick={this.newUser}>Register</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    postRegister: (user) => dispatch(postRegister(user)),
});

export default connect(null, mapDispatchToProps)(Register);