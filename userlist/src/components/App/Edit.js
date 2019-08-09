import React from "react";
import { withRouter } from 'react-router-dom';

const toHome = props => {
    return (
        <button
            onClick={() => {
                props.history.push('/');
            }}>
            Done
      </button>
    );
};

const WithHomeButton = withRouter(toHome);

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <h2>Save</h2>
                <WithHomeButton />
            </div>
        );
    }
}


export default Edit;