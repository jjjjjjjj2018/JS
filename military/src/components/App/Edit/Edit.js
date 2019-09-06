import React from "react";
import { connect } from "react-redux";
import { editSoldier, getAvailableParent } from "../../../redux/action-creators";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ImageUploader from 'react-images-upload';
import MenuItem from '@material-ui/core/MenuItem';



//(General, Colonel, Major, Captain, Lieutenant, Warrant Officer, Sergeant, Corporal,Specialist, Private)
const ranks = [
    { label: 'General', rank: 'General', },
    { label: 'Colonel', value: 'Colonel', },
    { label: 'Major', value: 'Major', },
    { label: 'Captain', value: 'Captain', },
    { label: 'Lieutenant', value: 'Lieutenant', },
    { label: 'Sergeant', value: 'Sergeant', },
    { label: 'Private', value: 'Private', }
];

class Edit extends React.Component {
    componentDidMount() {
        this.props.getAvailableParent(this.props.location.state.soldier._id);
        //this.props.getAllSoldiers();
        console.log(this.props.location.state.soldier._id);
        this.setState({
            soldier: this.props.location.state.soldier
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            soldier: {
                id: '',
                name: '',
                sex: '',
                parentId: '',
                avatar: '',
                rank: ''
            }

        }
    }
    handleChange = (event) => {
        const { soldier } = this.state;
        soldier[event.target.id] = event.target.value;
        this.setState({ soldier });
        console.log(soldier);
    }
    handleChangeRank = (event) => {
        const { soldier } = this.state;
        soldier.rank = event.target.value;
        this.setState({ soldier });
        console.log(this.state.soldier.rank);
    }
    handleChangeParent = (event) => {
        const { soldier } = this.state;
        soldier.parentId = event.target.value;
        this.setState({ soldier });
        console.log(event.target.value);
        console.log(soldier.parent);
    }

    onDrop = (picture) => {
        const { soldier } = this.state;
        soldier.avatar = picture[0].name;
        this.setState({ soldier });
        console.log(this.state.soldier.avatar)
    }

    render() {
        const { state: { soldier }, props: { soldierList: { list, isLoading, error } } } = this;

        let parent
        if (soldier.parentId) {
            parent = soldier.parentId
        } else {
            parent = { id: ' ', name: ' ' }
        }
        // for (let oneSoldier of list) {
        //     if (oneSoldier._id === soldier.id && soldier.parentId) {
        //         parent = soldier.parentId
        //     }
        //     else {
        //         parent = { name }
        //     }
        // }
        console.log(soldier);
        return (

            <div align='center'>
                <h2>Edit Soldier</h2>
                {isLoading && <div>Loading ...</div>}
                {!isLoading &&
                    <form > {error && <div style={{ color: "red" }}>Oops...</div>}

                        <img width='200' height='200' src={process.env.PUBLIC_URL + soldier.avatar} />

                        <ImageUploader
                            withIcon={false}
                            buttonText='Choose an image'
                            label={null}
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                        {/*
                        <input type = 'file' onChange = {this.onDrop}></input>
                        <br/>*/}
                        <TextField
                            required
                            id='name'
                            label="Name"
                            defaultValue={`${soldier.name}`}
                            margin="normal"
                            onChange={this.handleChange}
                        />
                        <br />
                        <TextField
                            required
                            id="sex"
                            label="Sex"
                            defaultValue={`${soldier.sex}`}
                            margin="normal"
                            onChange={this.handleChange}
                        />
                        <br />
                        <TextField
                            id="rank"
                            value={soldier.rank}
                            select
                            label="rank"
                            onChange={this.handleChangeRank}
                            margin="normal"
                        >
                            {ranks.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> <br />
                        <TextField
                            required
                            id="email"
                            label="Email"
                            defaultValue={soldier.email}
                            margin="normal"
                            onChange={this.handleChange}
                        /><br />
                        <TextField
                            select
                            id="parent"
                            label="Parent"
                            value={parent.name}
                            margin="normal"
                            onChange={this.handleChangeParent}
                        >
                            {list.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </form>
                }<br />
                <Button disabled={(!soldier.name || !soldier.rank || !soldier.sex || !soldier.email)} variant="contained" color="primary"
                    onClick={() => {

                        let newSoldier = soldier;
                        const id = soldier.id;
                        delete newSoldier.id;
                        this.props.editSoldier(soldier._id, newSoldier, this.props.history);
                        console.log(soldier._id);
                        console.log(soldier);
                    }}>
                    <SaveIcon /> Save
                        </Button>
                <br /> <br />
                <Button variant="contained" onClick={() => {
                    this.props.history.push('/')
                }}> Cancel</Button>

            </div >
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
        editSoldier: (id, soldier, history) => {
            dispatch(editSoldier(id, soldier, history));
        },
        getAvailableParent: () => {
            dispatch(getAvailableParent());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);