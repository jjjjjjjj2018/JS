import React from 'react';
import './App.css';
import { removeFromList, moveToMyList } from '../redux/actions';
import { connect } from 'react-redux';
import List from './List'

const App = (props) => {
  const { myList, recommendations } = props;

  const removeFromList = (id) => {
    props.removeFromList(id);
  }

  const moveToMyList = (id) => {
    props.moveToMyList(id);
  }

  const myListTitles = myList.map(item => {
    return (
      <li key={item.id} >
        <font color='white'>{item.title}</font>
      </li>
    )
  });

  return (
    <div className="container">
      <div className='title-bar-container'>
        <img className='title-img' alt='logo' src={'https://assets.brand.microsites.netflix.io/assets/1ed15bca-b389-11e7-9274-06c476b5c346_cm_800w.png?v=21'} />
      </div>
      <div >
        {myList.length !== 0 &&
          <List
            name='My List'
            list={myList}
            click={removeFromList}
            btnName='Remove' />
        }
        <List
          name='Recommendations'
          list={recommendations}
          click={moveToMyList}
          btnName='Add to MyList' />
        <div className='list-title-container'>
          <ul>{myListTitles}</ul>
        </div>
      </div>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    myList: state.mylist,
    recommendations: state.recommendations
  }
}

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
