import React from "react";
import { connect } from "react-redux";
import { getAll, deleteUser } from "../../redux/action-creators";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
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
    { id: 'firstName', numeric: false, label: 'First Name' },
    { id: 'lastName', numeric: false, label: 'Last Name' },
    { id: 'gender', numeric: false, label: 'Sex' },
    { id: 'age', numeric: true, label: 'Age' },
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
    props.history.push({ pathname: '/edit', state: { user: props.user } });
}} />;


const WithEditButton = withRouter(toEdit);
const WithCreateButton = withRouter(toCreate);


class App extends React.Component {
    componentDidMount() {
        this.props.getAllUsers();
    }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            order: 'asc',
            orderBy: '_id',
            page: 0,
            rowsPerPage: 5,
            item: '',
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleRequestSort = (event, property) => {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setState({ order: isDesc ? 'asc' : 'desc' });
        this.setState({ orderBy: property });
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: (+event.target.value) });
        this.setState({ page: 0 });
    }
    handleSearch(event) {
        this.setState({ item: event.target.value });
    }
    handleDelete = (id) => {
        this.props.deleteUser(id);
        this.props.userList.list = deleteOne(this.props.userList.list, id);
    }

    render() {
        const {
            state: {
                item,
            },
            props: {
                userList: {
                    list, isLoading, error
                },
                classes,
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
                                    Users
                                    </Typography>
                                <TextField type='text' value={item} onChange={this.handleSearch} placeholder='search' />
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
                                        <TableBody>
                                            {stableSort(list, getSorting(this.state.order, this.state.orderBy))
                                                .filter(searchingFor(item))
                                                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                                .map(row => {
                                                    return (
                                                        <TableRow key={row._id} hover tabIndex={-1}>
                                                            <TableCell>
                                                                <IconButton aria-label="edit"><WithEditButton
                                                                    user={row}
                                                                /></IconButton>

                                                            </TableCell>
                                                            <TableCell><IconButton aria-label="delete"
                                                                onClick={() => this.handleDelete(row._id)}>
                                                                <DeleteIcon /></IconButton></TableCell>
                                                            <TableCell align="left">{row.firstName}</TableCell>
                                                            <TableCell align="left">{row.lastName}</TableCell>
                                                            <TableCell align="left">{row.gender}</TableCell>
                                                            <TableCell align="left">{row.age}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}

                                        </TableBody>
                                    </Table>
                                </div>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={list.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
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
        userList: state.userList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => {
            dispatch(getAll());
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id));
        }
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
