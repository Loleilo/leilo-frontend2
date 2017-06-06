import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

const LoginForm = ({
                       onSubmit,
                       errors,
                       onChange,
                       credentials,
                   }) => (
    <Card className="container">
        <form onSubmit={onSubmit}>
            <h2 className="card-heading">Login</h2>

            <div className="field-line">
                <TextField
                    floatingLabelText="Username"
                    name="username"
                    errorText={errors.username}
                    onChange={onChange}
                    value={credentials.username}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Password"
                    name="password"
                    errorText={errors.password}
                    onChange={onChange}
                    value={credentials.password}
                />
            </div>

            {errors.general && <p className="error-message">{errors.general}</p>}

            <div className="button-line">
                <RaisedButton type="submit" label="Log in" primary/>
            </div>
        </form>
    </Card>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
};

export default LoginForm;