import { connect } from 'react-redux';
import Biographical from './Biographical';
import { getMemberCongressionalMapData, getMemberSenateMapData, clearMapData } from '../../Actions';

const mapStateToProps = ({ congressionalMap }) => ({
  lng: congressionalMap.get('lng'),
  lat: congressionalMap.get('lat'),
  zoom: congressionalMap.get('zoom'),
  isLoading: congressionalMap.get('isLoading'),
  shouldShowMap: congressionalMap.get('shouldShowMap'),
  code: congressionalMap.get('code'),
  state: congressionalMap.get('state'),
  geoJson: congressionalMap.get('geoJson'),
});

const mapDispatchToProps = (dispatch) => {
  const fetchCongressionalMap = (member) => {
    const district = member.get('district');
    const code = `${member.get('state')}-${district}`;
    return dispatch(getMemberCongressionalMapData(code));
  };
  const fetchSenateMap = (member) => {
    return dispatch(getMemberSenateMapData(member.get('state')));
  };
  return {
    load: (member) => {
      dispatch(clearMapData());
      const isSenator = member.get('chamber') === 'sen';
      const notState = ['AS', 'DC', 'GU', 'MP', 'PR', 'VI'].indexOf(member.get('state')) > -1;
      return isSenator || notState ? fetchSenateMap(member) : fetchCongressionalMap(member);
    },
    clearMapData: () => dispatch(clearMapData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Biographical);
