import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { editSoldier, getOne } from "../../../redux/action-creators";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


const edit = props => {
    const { firstName, lastName, gender, age, password, repeatPassword } = props.soldier;
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
        <Button variant="contained" onClick={() => { props.history.push('/') }}> Cancel</Button>
    );
};

const WithHomeButton = withRouter(edit);
const WithCancelButton = withRouter(cancel);


class Edit extends React.Component {
    componentDidMount() {
        this.props.getOneSoldier(this.props.location.state.id);

    }
    constructor(props) {
        super(props);
        this.state = {
            soldier: {
                id: '',
                name: '',
                sex: '',
                parent: ''
            }
        }
    }
    handleChange = (event) => {
        const { soldier } = this.state;
        soldier[event.target.id] = event.target.value;
        this.setState({ soldier });
    }

    render() {
        const { props: { soldierList: { soldier } } } = this;
        return (
            <div align='center'>
                <h2>Edit Soldier</h2>

                <form >
                    <TextField
                        required
                        id="name"
                        label="Name"
                        defaultValue={soldier.name}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="sex"
                        label="Sex"
                        defaultValue={soldier.sex}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        required
                        id="parent"
                        label="Parent"
                        defaultValue={(soldier.parentId)
                        }
                        margin="normal"
                        onChange={this.handleChange}
                    />
                </form> <br />
                <div onClick={() => {
                    let newSoldier = soldier;
                    const id = soldier._id;
                    delete newSoldier._id;
                    this.props.editSoldier(id, soldier);
                }}>
                    <WithHomeButton soldier={soldier} />
                </div><br />
                <WithCancelButton />
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
        getOneSoldier: (id) => {
            dispatch(getOne(id));
        },
        editSoldier: (id, soldier) => {
            dispatch(editSoldier(id, soldier));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);