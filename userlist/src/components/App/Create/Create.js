import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { createUser } from "../../../redux/action-creators";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';



const create = props => {
    const { firstName, lastName, gender, age, password, repeatPassword } = props.user;
    console.log(props.user);
    return (
        <Button disabled={!firstName || !lastName || !gender || !age || !password || !repeatPassword} variant="contained" color="primary" onClick={() => {
            createUser(props.user);
            console.log(props.user)
            props.history.push('/');
        }}>
            <SaveIcon /> Create
        </Button>
    );
};


const WithHomeButton = withRouter(create);

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                gender: '',
                age: 0,
                password: '',
                repeatPassword: ''
            }
        }
    }
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.id] = event.target.value;
        this.setState({ user });
    }
    changeAge = (event) => {
        const { user } = this.state;
        const age = parseInt(event.target.value);
        user[event.target.id] = age;
        this.setState({ user });
    }
    render() {
        const { state: { user } } = this;
        return (
            <div align='center'>
                <h2>Create User</h2>
                <form>
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="lastName"
                        label="Second Name"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="gender"
                        label="Sex"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="age"
                        label="Age"
                        margin="normal"
                        onChange={this.changeAge}
                    />
                    <br /><br />
                    < TextField
                        required
                        type='password'
                        id="password"
                        label="Password"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br /><br />
                    <TextField
                        required
                        error={user.password!==user.repeatPassword}
                        type='password'
                        id="repeatPassword"
                        label="Repeat Password"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                </form>
                <br /><br />
                <WithHomeButton user={user} />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => {
            dispatch(createUser(user));
        }
    };
};

export default connect(null, mapDispatchToProps)(Create);