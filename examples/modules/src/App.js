import React, { Component, PropTypes } from 'react';
import EventList from './EventList';

class App extends Component {

  static propTypes = {
    gw: PropTypes.object.isRequired
  }

  state = {
    events: {
      meta: {},
      results: []
    }
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents() {
    const { gw } = this.props;

    gw.events.list()
      .then(response => {
        this.setState({
          events: response.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        Groundwork.js version {this.props.gw.version}

        <EventList
          events={this.state.events}
        />
      </div>
    );
  }
}

export default App;
