import React from "react";
import { connect } from "react-redux";
import { createSoldier, getAll } from "../../../redux/action-creators";
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

class Create extends React.Component {
    componentDidMount() {
        this.props.getAllSoldiers();
        //this.props.getAllSoldiers();

    }

    constructor(props) {
        super(props);
        this.state = {
            soldier: {
                name: '',
                sex: '',
                parentId: '',
                avatar: 'manimage.png',
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
        console.log(this.state.soldier.parentId);
    }

    onDrop = (picture) => {
        const { soldier } = this.state;
        soldier.avatar = picture[0].name;
        this.setState({ soldier });
        console.log(this.state.soldier.avatar);

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
        // for (let oneSoldier of list) {
        //     if (oneSoldier._id === soldier.id && soldier.parentId) {
        //         parent = soldier.parentId
        //     }
        //     else {
        //         parent = { name }
        //     }
        // }
        return (

            <div align='center'>
                <h2>Create New Soldier</h2>
                {isLoading && <div>Loading ...</div>}
                {!isLoading &&
                    <form > {error && <div style={{ color: "red" }}>Oops...</div>}
                        <div>
                            {soldier.avatar &&
                                <img width='200' height='200' alt='avatar' src={process.env.PUBLIC_URL + soldier.avatar} />
                            }
                            <ImageUploader
                                withIcon={false}
                                buttonText='Choose an image'
                                label={null}
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>
                        
                        <TextField
                            required
                            id='name'
                            label="Name"
                            margin="normal"
                            onChange={this.handleChange}
                        />
                        <br />
                        <TextField
                            required
                            id="sex"
                            label="Sex"
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
                        let newSoldier = soldier;

                        for (parent of list) {
                            if (newSoldier.parentId === parent.name) {
                                newSoldier.parentId = parent._id;
                            }
                        }
                        console.log(soldier);
                        this.props.createSoldier(newSoldier, this.props.history);

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
        createSoldier: (soldier, history) => {
            dispatch(createSoldier(soldier, history));
        },
        getAllSoldiers: () => {
            dispatch(getAll());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);