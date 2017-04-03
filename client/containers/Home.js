import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';




class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.theStore = this.context.store;
  }

  render() {
    return (
      <div className="container">
         <h1>{this.props.message.welcomeMessage}</h1>
      </div>
    );
  }
}

Home.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}


export default connect(mapStateToProps)(Home);