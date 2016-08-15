import React, { Component, PropTypes } from 'react';

import {
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

class EventList extends Component {

  static propTypes = {
    events: PropTypes.shape({
      meta: PropTypes.object.isRequired,
      results: PropTypes.array.isRequired
    }).isRequired
  }

  render() {
    const {
      events: {
        meta,
        results
      }
    } = this.props;

    return (
      <div>
        <h4>
          Events Example
        </h4>

        <ListGroup>
          {results.map((event, key) => {
            const {
              title,
              addressCity,
              addressStateOrProvince
            } = event;

            return (
              <ListGroupItem key={key}>
                <h4>
                  {title} | {addressCity}, {addressStateOrProvince}
                </h4>
              </ListGroupItem>
            )
          })}
        </ListGroup>

        {meta.count} of {meta.totalPages} pages
      </div>
    );
  }
}

export default EventList;
