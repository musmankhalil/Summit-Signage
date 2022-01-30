import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
class PostsList extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    console.log('-- PostList will mount--', this.props);
    console.log(this.props);
  if(! this.props.user.user){
browserHistory.push('/signin');

    return;
  }
    this.props.fetchPosts();
  }

  renderCategories(categories) {
     return categories.map((c) => {
        c = c.trim();
        return (
          <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
        );
     });
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post._id}>
          <Link style={{color:'black'}} to={"posts/" + post._id}>
            <h3 className="list-group-item-heading">{post.title}</h3>
          </Link>
            {this.renderCategories(post.categories)}
        </li>
      );
    });
  }

  render() {
    const { posts, loading, error} = this.props.postsList;

    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts(posts)}
        </ul>
      </div>
    );
  }
}


export default PostsList;
