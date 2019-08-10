import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getAll, deleteUser, editUser, createUser, getOne } from "../../../redux/action-creators";

const toHome = props => {
    return (
        <button
            onClick={() => {
                props.history.push('/');
            }}>
            Create
      </button>
    );
};

const WithHomeButton = withRouter(toHome);

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <h2>Create New user</h2>
                <WithHomeButton />
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
        getAllUsers: () => {
            dispatch(getAll());
        },
        getOneUser: (id) => {
            dispatch(getOne(id));
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id));
        },
        createUser: () => {
            dispatch(createUser());
        },
        editUser: (id) => {
            dispatch(editUser(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);