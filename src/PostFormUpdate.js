import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {  withRouter } from 'react-router-dom'
import {  updatePost, fetchPost } from '../actions/postActions'
import '../App.css'

class PostFormUpdate extends Component {
  constructor(props){
    super(props)
    this.state = {
        id: '',
        title: '',
        body: ''
    }
    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }
  componentWillMount() {
    let id = this.props.match.params.postid
    this.props.fetchPost(id)
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.singlePost){
      this.setState(nextProps.singlePost)
      console.log("..willRecieveProps state: ",this.state)
      console.log("..willRecieveProps nextProps.singlePost: ",nextProps.singlePost)
    }
  }
  onChange(evt){
    this.setState({ [evt.target.name]: evt.target.value })
  }
  onSubmit(evt) {
    evt.preventDefault()
    const post = {
        id: this.state.id,
        title: this.state.title,
        body: this.state.body
    }
    this.props.updatePost(post)
    this.props.history.push("/");
  }

  render() {
      console.log("in render der state. ", this.state)
      return (
      <div className="App">
        <h1>Update Post</h1>
        <form onSubmit={this.onSubmit} >
            <div>
                <label>ID: </label><br />
                <input type="text" name="id"  value={this.state.id} readOnly />
            </div>
            <br />
            <div>
                <label>Title: </label><br />
                <input type="text" name="title" onChange={this.onChange} value={this.state.title} />
            </div>
            <br />
            <div>
                <label>Body: </label><br />
                <textarea name="body"
                  rows="5" cols= "40"
                  onChange={this.onChange}  value={this.state.body} />
            </div>
            <br />
            <button type="submit">Ã„nderung durchfÃ¼hren</button>
        </form>
      </div>
    )
  }
} // end class PostFormUpdate

const mapStateToProps = reduxState => {
  console.log("in mapStateToProps: ", reduxState.posts.item)
  return ({
    // posts ist der Reducer!
    // reduxState der Parameter der Arrow-Function
    singlePost: reduxState.posts.item
  })
}

export default withRouter ( connect (mapStateToProps, { fetchPost, updatePost }) (PostFormUpdate))
