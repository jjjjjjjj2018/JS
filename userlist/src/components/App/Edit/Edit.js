import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { editUser } from "../../../redux/action-creators";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


const edit = props => {
    const { firstName, lastName, gender, age, password, repeatPassword } = props.user;
    return (
        <Button disabled={!firstName || !lastName || !gender || !age || !password || !repeatPassword} variant="contained" color="primary" onClick={() => {
            editUser(props.user.id, props.user);
            props.history.push('/');
        }}>
            <SaveIcon /> Save
        </Button>
    );
};

const WithHomeButton = withRouter(edit);


class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                firstName: '',
                lastName: '',
                gender: '',
                age: 0,
                password: '',
                repeatPassword: ''
            }
        }
    }

    componentWillMount() {
        this.setState({
            user: {
                ...this.state.user, id: this.props.location.state.user._id,
                firstName: this.props.location.state.user.firstName,
                lastName: this.props.location.state.user.lastName,
                gender: this.props.location.state.user.gender,
                age: this.props.location.state.user.age
            }
        });
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
                <h2>Edit User</h2>

                <form >
                    <TextField
                        required
                        id="standard-name"
                        label="First Name"
                        defaultValue={user.firstName}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="standard-uncontrolled"
                        label="Last Name"
                        defaultValue={user.lastName}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="standard-required"
                        label="Sex"
                        defaultValue={user.gender}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="standard-error"
                        label="Age"
                        defaultValue={user.age}
                        margin="normal"
                        onChange={this.changeAge}
                    />
                    <br />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        error={user.password !== user.repeatPassword}
                        id="repeatPassword"
                        label="Retype Your Password"
                        type="password"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                </form>
                <WithHomeButton user={this.state.user} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.userList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (id, user) => {
            dispatch(editUser(id, user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);