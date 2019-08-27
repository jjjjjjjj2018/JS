import React from "react";
import { connect } from "react-redux";
import { getAll, deleteSoldier } from "../../redux/action-creators";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function searchingFor(item) {
    return function (x) {
        return x.firstName.includes(item) || x.lastName.includes(item) || x.gender.includes(item) || x.age.toString().includes(item) || !item;
    }
}

function deleteOne(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i]._id === id) {
            return list.splice(i, 1);
        }
    }
}

const headRows = [

    // { id: 'img', numeric: false, label: 'Avatar' },
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'sex', numeric: false, label: 'Sex' },
    { id: 'superior', numeric: false, label: 'Superior' },
    // { id: 'rank', numeric: false, label: 'Rank' },
    // { id: 'startDate', numeric: true, label: 'Start Date' },
    // { id: 'phone', numeric: false, label: 'Phone' },
    // { id: 'email', numeric: false, label: 'Email' },
    // { id: 'numOfChildren', numeric: false, label: '# of D.S.' }
];

class EnhancedTableHead extends React.Component {
    render() {
        const { order, orderBy, onRequestSort } = this.props;
        const createSortHandler = property => event => {
            onRequestSort(event, property);
        };
        return (
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Edit</TableCell>
                    <TableCell align='left'>Delete</TableCell>
                    {headRows.map(row => (
                        <TableCell
                            key={row.id}
                            align={'left'}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={createSortHandler(row.id)}
                            >
                                {row.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const styles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '0 0 auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    searchText: {
        flex: '0.8 0',
    }
}));

const toCreate = props => <AddIcon onClick={() => { props.history.push('/create') }} />;

const toEdit = props => <EditIcon onClick={() => {
    props.history.push({ pathname: '/edit', state: { soldier: props.soldier } });
}} />;


const WithEditButton = withRouter(toEdit);
const WithCreateButton = withRouter(toCreate);


class App extends React.Component {
    componentDidMount() {
        this.props.getAllSoldiers();
    }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            order: 'desc',
            orderBy: '_id',
            page: 0,
            rowsPerPage: 5,
            item: '',
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        this.setState({ item: event.target.value });
    }
    handleDelete = (id) => {
        this.props.deleteSoldier(id);
        this.props.soldierList.list = deleteOne(this.props.soldierList.list, id);
    }

    render() {
        const {
            state: {
                item,
            },
            props: {
                soldierList: { list, isLoading, error }, classes,
            }
        } = this;

        return (
            <div className={classes.root}>
                {isLoading && <div>Loading ...</div>}
                {!isLoading &&
                    <div> {error && <div style={{ color: "red" }}>Oops... Something went wrong!</div>}
                        {list.length > 0 &&
                            <Paper className={classes.paper}>
                                <Typography variant="h4" id="tableTitle">
                                    US Amary Personal Registry
                                    </Typography>
                                <br />
                                <TextField right='10' type='text' value={item} onChange={this.handleSearch} placeholder='search' />
                                <IconButton><WithCreateButton /></IconButton>
                                <div className={classes.tableWrapper}>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="tableTitle">
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={this.state.order}
                                            orderBy={this.state.orderBy}
                                            onRequestSort={this.handleRequestSort}
                                        />
                                        {/* <InfiniteScroll
                                            dataLength={list.length}
                                            next={this.fetchSoldiers}
                                            hasMore={true}
                                            loader={<h4>Loading...</h4>}
                                        > */}
                                        <TableBody>
                                            {stableSort(list, getSorting(this.state.order, this.state.orderBy))
                                                .map(row => {
                                                    return (
                                                        <TableRow key={row._id} hover tabIndex={-1}>
                                                            <TableCell>
                                                                <IconButton aria-label="edit"><WithEditButton
                                                                    soldier={row}
                                                                /></IconButton>

                                                            </TableCell>
                                                            <TableCell><IconButton aria-label="delete"
                                                                onClick={() => this.handleDelete(row._id)}>
                                                                <DeleteIcon /></IconButton></TableCell>
                                                            {/* <TableCell align="left">{row.img}</TableCell> */}
                                                            <TableCell align="left">{row.name}</TableCell>
                                                            <TableCell align="left">{row.sex}</TableCell>
                                                            {row.parentId.name &&
                                                                <TableCell align="left">{row.parentId.name}</TableCell>
                                                            }
                                                            {/* <TableCell align="left">{row.rank}</TableCell>
                                                                <TableCell align="left">{row.startDate}</TableCell>
                                                                <TableCell align="left">{row.phone}</TableCell>
                                                                <TableCell align="left">{row.email}</TableCell>
                                                               
                                                                <TableCell align="left">{row.numOfChildren}</TableCell> */}
                                                        </TableRow>
                                                    );
                                                })}

                                        </TableBody>
                                        {/* </InfiniteScroll> */}
                                    </Table>
                                </div>
                            </Paper>
                        }
                    </div>
                }
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
        getAllSoldiers: () => {
            dispatch(getAll());
        },
        deleteSoldier: (id) => {
            dispatch(deleteSoldier(id));
        }
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
