import React from "react";
import { withRouter } from 'react-router-dom';


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

export default Create;