import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup, PageHeader} from "react-bootstrap";

import {registerUser} from "../../store/actions/users";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import FacebookLogin from "../../components/Auth/FacebookLogin/FacebookLogin";

class Register extends Component {
    state = {
        username: '',
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

    // fieldHasError = fieldName => {
    //   return this.props.error && this.props.error.errors[fieldName];
    // };

    render() {
        return (
            <Fragment>
                <PageHeader>Register new user</PageHeader>
                <Form horizontal onSubmit={this.submitFormHandler}>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <FacebookLogin />
                        </Col>
                    </FormGroup>

                    <FormElement
                        propertyName="username"
                        title="Username"
                        placeholder="Enter username"
                        autoComplete="new-username"
                        type="text"
                        value={this.state.username}
                        changeHandler={this.inputChangeHandler}
                        error={(this.props.error && this.props.error.errors.username) && this.props.error.errors.username.message}
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        placeholder="Enter password"
                        autoComplete="new-password"
                        type="text"
                        value={this.state.password}
                        changeHandler={this.inputChangeHandler}
                        error={(this.props.error && this.props.error.errors.password) && this.props.error.errors.password.message}
                    />

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button
                                bsStyle="primary"
                                type="submit"
                            >Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);