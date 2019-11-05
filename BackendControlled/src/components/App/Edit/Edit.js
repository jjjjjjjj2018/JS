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
    { label: 'General', value: 'General', },
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
        if (this.props.location.state.soldier.parentId) {
            this.setState({
                soldier: {
                    _id: this.props.location.state.soldier._id,
                    name: this.props.location.state.soldier.name,
                    parentId: this.props.location.state.soldier.parentId.name,
                    sex: this.props.location.state.soldier.sex,
                    avatar: this.props.location.state.soldier.avatar,
                    rank: this.props.location.state.soldier.rank,
                    email: this.props.location.state.soldier.email
                }
            });
        } else
            this.setState({
                soldier: {
                    _id: this.props.location.state.soldier._id,
                    name: this.props.location.state.soldier.name,
                    sex: this.props.location.state.soldier.sex,
                    avatar: this.props.location.state.soldier.avatar,
                    rank: this.props.location.state.soldier.rank,
                    email: this.props.location.state.soldier.email
                }
            });
    }


    constructor(props) {
        super(props);
        this.state = {
            soldier: {
                _id: '',
                name: '',
                sex: '',
                parentId: {},
                avatar: '',
                rank: ''
            }

        }
    }
    handleChange = (event) => {
        const { soldier } = this.state;
        soldier[event.target.id] = event.target.value;
        this.setState({ soldier });
    }
    handleChangeRank = (event) => {
        const { soldier } = this.state;
        soldier.rank = event.target.value;
        this.setState({ soldier });
    }
    handleChangeParent = (event) => {
        const { soldier } = this.state;
        soldier.parentId = event.target.value;
        this.setState({ soldier });
    }

    onDrop = (picture) => {
        const { soldier } = this.state;
        soldier.avatar = picture[0].name;
        this.setState({ soldier });
    }

    render() {
        const { state: { soldier }, props: { soldierList: { list, isLoading, error } } } = this;
        let parentList = [];
        let parent = {};
        for (let i = 0; i < list.length; i++) {
            parent = {
                value: list[i].name,
                label: list[i].name
            }
            parentList.push(parent);
        }
        return (

            <div align='center'>
                <h2>Edit Soldier</h2>
                {isLoading && <div>Loading ...</div>}
                {!isLoading &&
                    <form > {error && <div style={{ color: "red" }}>Oops...</div>}

                        <img width='200' height='200' alt='avatar' src={process.env.PUBLIC_URL + soldier.avatar} />

                        <ImageUploader
                            withIcon={false}
                            buttonText='Choose an image'
                            label={null}
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                        
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
                            value={soldier.parentId}
                            margin="normal"
                            onChange={this.handleChangeParent}
                        >
                            {parentList.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </form>
                }<br />
                <Button disabled={(!soldier.name || !soldier.rank || !soldier.sex || !soldier.email)} variant="contained" color="primary"
                    onClick={() => {
                        let newSoldier = soldier
                        for (parent of list) {
                            if (newSoldier.parentId === parent.name) {
                                newSoldier.parentId = parent._id;
                            }
                        }
                        console.log(newSoldier);
                        this.props.editSoldier(newSoldier._id, newSoldier, this.props.history);

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
        getAvailableParent: (id) => {
            dispatch(getAvailableParent(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);