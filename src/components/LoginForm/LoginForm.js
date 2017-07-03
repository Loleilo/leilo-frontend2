import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import {centerContent} from "../../styles";
import View from "react-flexbox";

const LoginForm = ({
                       onSubmit,
                       errors,
                       onChange,
                       credentials,
                       loading,
                   }) => (
    <View style={centerContent} className="container">
        <View row/>
        <View row auto style={centerContent}>
            <View column/>
            <View column auto style={centerContent}>
                <form onSubmit={onSubmit}>
                    <h1 className="card-heading">Leilo</h1>
                    <p>Please log into your account</p>
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Username"
                            name="username"
                            errorText={errors.username}
                            onChange={onChange}
                            value={credentials.username}
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    <div className="field-line">
                        <TextField
                            floatingLabelText="Password"
                            name="password"
                            type="password"
                            errorText={errors.password}
                            onChange={onChange}
                            value={credentials.password}
                            disabled={loading}
                        />
                    </div>

                    {errors.general && <p className="error-message">{errors.general}</p>}

                    {loading ?
                        <CircularProgress /> : <div className="button-line">
                            <RaisedButton
                                type="submit"
                                primary
                                label="Log in"
                                disabled={loading}/>

                        </div>}
                </form>
            </View>
            <View column/>
        </View>
        <View row/>
    </View>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

export default LoginForm;