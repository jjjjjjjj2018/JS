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
    console.log(myList);
    const myListElements = myList.map(item => {
      return (
        <li className='myList-item' key={item.id} >
          <button className='remove-btn' onClick={() => this.removeFromList(item.id)}>x</button>
          <img src={item.img} alt={item.title}></img>
          <font color='white'>{item.title}</font>
        </li>
      )
    });
    const recommendationsElements = recommendations.map(item => {
      return (
        <li className='recommendations-item' key={item.id} >
          <button className='move-btn' onClick={() => this.moveToMyList(item.id)}></button>
          <img src={item.img} alt={item.title}></img>
          <font color='white'>{item.title}</font>
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
          <div className='myList'>
            <font color="white">My List</font>
            <ul>{myListElements}</ul>
          </div>
          <font color='white'>Recommendations</font>
          <div className='recommendations'>
            <ul>{recommendationsElements}</ul>
          </div>
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
