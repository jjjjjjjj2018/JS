import React from 'react';
import './App.css';
import { removeFromList, moveToMyList } from '../redux/actions';
import { connect } from 'react-redux';

class App extends React.Component {
  removeFromList = (id) => {
    this.props.removeFromList(id);
  }
  moveToMyList = (id) => {
    this.props.moveToMyList(id);
  }
  render() {
    const { props: { myList, recommendations } } = this;
    const myListElements = myList.map(item => {
      return (
        <li className='myList-item' key={item.id} >
          <font color='white'>{item.title}</font>
          <img src={item.img} alt={item.title}></img>
          <button className='button' onClick={() => this.removeFromList(item.id)} color='white'>Remove</button>
        </li>
      )
    });
    const recommendationsElements = recommendations.map(item => {
      return (
        <li className='recommendations-item' key={item.id} >
          <font color='white'>{item.title}</font>
          <img src={item.img} alt={item.title}></img>
          <button className='button' onClick={() => this.moveToMyList(item.id)}>Add to MyList</button>
        </li>

      )
    });
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

        <div className='list-container'>
          {myList.length !== 0 &&
            <div className='myList'>
              <font color="white">My List</font>
              <ul>{myListElements}</ul>
            </div>
          }
          {recommendations.length !== 0 &&
            <div className='recommendations'>
              <font color='white'>Recommendations</font>
              <ul>{recommendationsElements}</ul>
            </div>
          }
          <div className='myList-items'>
            <ul>{myListTitles}</ul>
          </div>
        </div>
      </div>
    );
  }
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
