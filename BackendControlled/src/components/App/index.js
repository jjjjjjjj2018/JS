import React from "react";
import { connect } from "react-redux";
import { deleteSoldier, getSortPage, getOne, getDirectChildren, searchAll } from "../../redux/action-creators";
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
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroller';


const headRows = [

    // { id: 'img', numeric: false, label: 'Avatar' },
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'sex', numeric: false, label: 'Sex' },
    { id: 'rank', numeric: true, label: 'Rank' },
    // { id: 'phone', numeric: true, lable: 'Phone' },
    { id: 'email', numeric: false, label: 'Email' },
    //{ id: 'startDate', numeric: true, label: 'Start Date' },


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
                    <TableCell align='center'>Edit</TableCell>
                    <TableCell align='center'>Delete</TableCell>
                    <TableCell align='center'>Avatar</TableCell>
                    {headRows.map(row => (
                        <TableCell
                            key={row.id}
                            align={'center'}
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
                    <TableCell align='center'>Superior</TableCell>
                    <TableCell align='center'># of D.S.</TableCell>

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
        this.props.getSortPage(this.state.order, this.state.orderBy, this.state.page);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.order !== prevState.order || this.state.orderBy !== prevState.orderBy)
            this.props.getSortPage(this.state.order, this.state.orderBy, 0);
    }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            order: 'desc',
            orderBy: '_id',
            page: 0,
            item: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleRequestSort = (event, property) => {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setState({ order: isDesc ? 'asc' : 'desc' });
        this.setState({ orderBy: property });
    }
    // handleChangePage = (event, newPage) => {
    //     this.setState({ page: newPage });
    // }
    handleSearch(event) {
        this.setState({
            item: event.target.value,
        });
        setTimeout(() => {
            this.props.searchAllSoldiers(this.state.item);
        }, 700);
    }


    handleDelete = (id) => {
        this.props.deleteSoldier(id);
    }
    showParent = (parentId) => {
        //this.props.searchAllSoldiers(parentId);
        this.props.getOneSoldier(parentId);
        // if (!this.props.soldierList.isLoading) {
        //     const { props: { soldierList: { soldier } } } = this;
        //     console.log(soldier);
        //     this.props.soldierList.list = soldier;

        // }
        // this.props.soldierList.list = 
    }
    showChildren = (id) => {
        this.props.getChildren(id);
    }
    loadPage = () => {
        this.props.getSortPage(this.state.order, this.state.orderBy, this.state.page + 1);
        this.setState({ page: +1 });
    }
    render() {
        let {
            state: {
                item
            },
            props: {
                soldierList: { list, isLoading, error }, classes,
            }
        } = this;
        if (!Array.isArray(list)) {
            list = [list];
        }

        return (
            <div className={classes.root}>
                <Typography variant="h4" id="tableTitle">US Amary Personal Registry</Typography>
                <br />
                <TextField right='10' type='text' value={item} onChange={this.handleSearch} placeholder='search' />
                <IconButton onClick={() => this.componentDidMount()}><RefreshIcon /></IconButton>
                <IconButton><WithCreateButton /></IconButton>
                {isLoading && <div>Loading ...</div>}
                {!isLoading &&
                    <div> {error && <div style={{ color: "red" }}>Oops...</div>}
                        <Paper className={classes.paper}>
                            <div className={classes.tableWrapper}>
                                <InfiniteScroll
                                    pageStart={1}
                                    loadMore={() => this.loadPage}
                                    hasMore={true}
                                >
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

                                            {list.map(row => {
                                                return (
                                                    <TableRow key={row._id} hover tabIndex={-1}>
                                                        <TableCell align='center'>
                                                            <IconButton aria-label="edit"><WithEditButton
                                                                soldier={row}
                                                            /></IconButton>

                                                        </TableCell>
                                                        <TableCell align='center'><IconButton aria-label="delete"
                                                            onClick={() => this.handleDelete(row._id)}>
                                                            <DeleteIcon /></IconButton></TableCell>
                                                        {!row.avatar && <TableCell />}
                                                        {row.avatar &&
                                                            <TableCell align="center"><img width='20' height='20' src={process.env.PUBLIC_URL + row.avatar} alt='avatar' /></TableCell>
                                                        }
                                                        <TableCell align="center">{row.name}</TableCell>
                                                        <TableCell align="center">{row.sex}</TableCell>
                                                        <TableCell align="center">{row.rank}</TableCell>
                                                        <TableCell align='center'><Button onClick={() => window.location.href = `mailto:${row.email}`}> {row.email}</Button></TableCell>
                                                        {!row.parentId && <TableCell align="center" />}
                                                        {row.parentId &&
                                                            <TableCell align="center" ><Button onClick={() => this.showParent(row.parentId._id)}>
                                                                {row.parentId.name}</Button></TableCell>
                                                        }
                                                        {row.numOfChildren === 0 && <TableCell align="center" />}
                                                        {row.numOfChildren !== 0 &&
                                                            <TableCell align="center"> <Button onClick={() => this.showChildren(row._id)}>{row.numOfChildren} </Button></TableCell>
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
                                    </Table>
                                </InfiniteScroll>
                            </div>
                        </Paper>

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
        getSortPage: (order, orderBy, page) => {
            dispatch(getSortPage(order, orderBy, page));
        },
        deleteSoldier: (id) => {
            dispatch(deleteSoldier(id));
        },
        getChildren: (id) => {
            dispatch(getDirectChildren(id))
        },
        getOneSoldier: (id) => {
            dispatch(getOne(id))
        },
        searchAllSoldiers: (search) => {
            dispatch(searchAll(search))
        }
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
