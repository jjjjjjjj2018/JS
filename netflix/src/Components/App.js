import React from 'react';
import { connect } from 'react-redux';
import { removeFromList, moveToMyList } from '../redux/actions';
import List from './List';
import './App.css';

const App = (props) => {
  const { mylist, recommendations } = props;

  const mylistTitles = mylist.map(item => {
    return (
      <li key={item.id} >
        <font color='white'>{item.title}</font>
      </li>
    )
  });

  return (
    <div className="container">
      <div className='title-bar-container'>
        <img className='title-img' alt='logo' src='https://assets.brand.microsites.netflix.io/assets/1ed15bca-b389-11e7-9274-06c476b5c346_cm_800w.png?v=21' />
      </div>
      <div >
        {mylist.length !== 0 &&
          <List
            name='My List'
            list={mylist}
            click={props.removeFromList}
            btnName='Remove' />
        }
        <List
          name='Recommendations'
          list={recommendations}
          click={props.moveToMyList}
          btnName='Add to MyList' />
        <div className='list-title-container'>
          <ul>{mylistTitles}</ul>
        </div>
      </div>
    </div>
  );

}

const mapStateToProps = ({ mylist, recommendations }) => ({ mylist, recommendations })

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromList: (id) => {
      dispatch(removeFromList(id));
    },
    moveToMyList: (id) => {
      dispatch(moveToMyList(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
