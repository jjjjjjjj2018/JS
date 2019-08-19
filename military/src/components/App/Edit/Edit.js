import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { editSoldier } from "../../../redux/action-creators";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


const edit = props => {
    const { firstName, lastName, gender, age, password, repeatPassword } = props.user;
    return (
        <Button disabled={!firstName || !lastName || !gender || !age || !password || !repeatPassword || (password !== repeatPassword)} variant="contained" color="primary"
            onClick={() => {
                props.history.push('/');
            }}>
            <SaveIcon /> Save
        </Button>
    );
};

const cancel = props => {
    return (
        <Button variant="contained"  onClick={() => { props.history.push('/') }}> Cancel</Button>
    );
};

const WithHomeButton = withRouter(edit);
const WithCancelButton = withRouter(cancel);


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
                        id="firstName"
                        label="First Name"
                        defaultValue={user.firstName}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        defaultValue={user.lastName}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="gender"
                        label="Sex"
                        defaultValue={user.gender}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="age"
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
                        label="Repeat Password"
                        type="password"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                </form> <br/>
                <div onClick={() => {
                    let newUser = user;
                    const id = user.id;
                    delete newUser.repeatPassword;
                    delete newUser.id;
                    console.log(id, newUser);
                    this.props.editUser(id, user);
                }}>
                    <WithHomeButton user={user} />
                </div><br/>
                <WithCancelButton/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        soldierList: state.soldierList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editSoldier: (id, soldier) => {
            dispatch(editSoldier(id, soldier));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);