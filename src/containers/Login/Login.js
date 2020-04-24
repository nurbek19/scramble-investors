import React, {Component} from 'react';
import {connect} from "react-redux";
import {registerUser} from "../../store/actions/users";

import './Login.css';

class Login extends Component {
    state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.registerUser(this.state);
    };

    render() {
        return (
            <div className="container">
              <header>
                <h4>scramble</h4>

                <div className="menu">
                  <a href="#">Portfolio</a>
                  <a href="#">Communities</a>
                  <a href="#">Profile</a>
                </div>
              </header>


              <div className="sign-up">
                <h1>Create your account</h1>

                <form action="#" onSubmit={this.submitFormHandler}>
                  <label htmlFor="firstName">
                    <input type="text" id="firstName" name="first_name" placeholder="First name" required value={this.state.firstName} onChange={this.inputChangeHandler} />
                  </label>

                  <label htmlFor="lastName">
                    <input type="text" id="lastName" name="last_name" placeholder="Last name" required value={this.state.lastName} onChange={this.inputChangeHandler} />
                  </label>

                  <label htmlFor="email">
                    <input type="email" id="email" name="email" placeholder="Email" required value={this.state.email} onChange={this.inputChangeHandler} />
                  </label>

                  <label htmlFor="password">
                    <input type="password" id="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.inputChangeHandler} />
                  </label>

                  <button type="submit">Register</button>
                </form>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
