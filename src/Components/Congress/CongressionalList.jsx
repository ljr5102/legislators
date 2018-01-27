import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { chunk } from '../../Utils';
import CongressionalTile from './CongressionalTile';

class CongressionalList extends React.Component {
  chunkMembers() {
    const list = this.props.congressmen.get('list');
    return chunk(list, 4);
  }

  renderChunks() {
    return this.chunkMembers().map((grp, idx) => (
      <div key={idx} className="cl-group">
        {grp.map(tile => (
          <CongressionalTile key={tile.get('id')} person={tile} />
        ))}
      </div>
    ));
  }

  render() {
    return this.renderChunks();
  }
}

CongressionalList.propTypes = {
  congressmen: ImmutablePropTypes.map,
};

CongressionalList.defaultProps = {
  congressmen: Map({}),
};

export default CongressionalList;