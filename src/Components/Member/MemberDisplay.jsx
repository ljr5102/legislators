import React from 'react';
import { Map } from 'immutable';

const chamber = Map({
  rep: 'House of Representatives',
  sen: 'Senate',
});

class MemberDisplay extends React.Component {
  componentWillMount() {
    this.props.member || this.props.load();
  }

  render() {
    const { member } = this.props;
    return member ? (
      <div className="mem-disp">
        <div className="mem-top">
          {member.get('name')}
        </div>
        <div className="mem-mid">
          <div className="mem-mid-left">
            <div>
              <div className="header">
                Biographical Data:
              </div>
              <div className="data">
                <div>
                  DOB: {member.get('birthday')}
                </div>
                <div>
                  Religion: {member.get('religion') || 'N/A'}
                </div>
              </div>
            </div>
            <div>
              <div className="header">
                Congressional Data:
              </div>
              <div className="data">
                <div>
                  Chamber: {chamber.get(member.get('chamber'))}
                </div>
                <div>
                  State: {member.get('state')}
                </div>
                <div>
                  District: {member.get('district')}
                </div>
                <div>
                  Party: {member.get('party')}
                </div>
              </div>
            </div>
          </div>
          <div className="mem-mid-right">
            <img alt="text" src={`https://theunitedstates.io/images/congress/450x550/${member.get('id')}.jpg`} />
          </div>
        </div>
        <div className="mem-bot">
          <div className="header">Historical Term Data</div>
          <div className="data">
            <table>
              <tbody>
                <tr>
                  <th>Start</th>
                  <th>End</th>
                  <th>Type</th>
                  <th>Party</th>
                  <th>State</th>
                  <th>District</th>
                </tr>
                {member.get('terms').map((term, idx) => (
                  <tr key={idx}>
                    <td>{term.get('start')}</td>
                    <td>{term.get('end')}</td>
                    <td>{term.get('type').toUpperCase()}</td>
                    <td>{term.get('party')}</td>
                    <td>{term.get('state')}</td>
                    <td>{term.get('district')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default MemberDisplay;
