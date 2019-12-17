import React, { useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getAll, removeFromList, moveToMyList } from '../redux/actions';
import List from './List';
import './App.css';

const App = (props) => {
  useLayoutEffect(() => {
    props.getAll();
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, scollPosition);
  }, [props]);

  const [scollPosition, setScollPosition] = useState();
  const { list: { mylist, recommendations }, error, isLoading } = props;

  const removeFromList = (id) => {
    props.removeFromList(id);
    setScollPosition(window.pageYOffset);
  }
  const moveToMyList = (id) => {
    props.moveToMyList(id);
    setScollPosition(window.pageYOffset);
  }

  return (
    <div className="container" >
      <div className='title-bar-container'>
        <img className='title-img' alt='logo' src='https://assets.brand.microsites.netflix.io/assets/1ed15bca-b389-11e7-9274-06c476b5c346_cm_800w.png?v=21' />
      </div>
      {error && <div>Oopps</div>}
      {!error && !isLoading &&
        <div >
          {mylist &&
            <List
              name='My List'
              list={mylist}
              click={removeFromList}
              btnName='Remove' />
          }
          {recommendations &&
            <List
              name='Recommendations'
              list={recommendations}
              click={moveToMyList}
              btnName='Add to MyList' />
          }
          <div className='list-title-container'>
            {mylist &&
              <ul>{mylist.map(item => {
                return (
                  <li key={item.id} >
                    <font color='white'>{item.title}</font>
                  </li>
                )
              })}</ul>
            }
          </div>
        </div>
      }
    </div>
  );
}

const mapStateToProps = ({ list, error, isLoading }) => ({ list, error, isLoading })

const mapDispatchToProps = (dispatch) => {
  return {
    getAll: () => {
      dispatch(getAll());
    },
    removeFromList: (id) => {
      dispatch(removeFromList(id));
    },
    moveToMyList: (id) => {
      dispatch(moveToMyList(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
