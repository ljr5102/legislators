import { fromJS } from 'immutable';

const congressAPILink = 'https://theunitedstates.io/congress-legislators/legislators-current.json';
const fusionAPILink = 'https://www.googleapis.com/fusiontables/v2/';

const fetchCongressAPI = () => (
  fetch(congressAPILink, { method: 'GET', 'Content-Type': 'application/json' })
);

const fetchCongressionalMapDataAPI = (code) => {
  const rowFetchSql = `SELECT ROWID, geometry from 1lnXJhKK1dX3dbzyq6S0gok4F44QpImPrqP4cd-Lk where Code = '${code}';`;
  const param = `query?sql=${rowFetchSql}`;
  const googApiKey = '&key=AIzaSyD8SMlcDgmqT3zUusiEpCZFKB4E0N9SiOk';
  return fetch(fusionAPILink + param + googApiKey, { method: 'GET', 'Content-Type': 'application/json' });
};

const fetchSenateMapDataAPI = (state) => {
  const rowFetchSql = `SELECT ROWID, Geometries from 1VIlPVQuZyyUaT4j5X_KqGEmuZysxMaW2kshvLZ4V where Name = '${state}';`;
  const param = `query?sql=${rowFetchSql}`;
  const googApiKey = '&key=AIzaSyD8SMlcDgmqT3zUusiEpCZFKB4E0N9SiOk';
  return fetch(fusionAPILink + param + googApiKey, { method: 'GET', 'Content-Type': 'application/json' });
};

const fetchCongress = () => fetchCongressAPI().then(
  resp => resp.json(),
  err => Promise.reject(err),
).then(json => fromJS(json));

const fetchCongressionalMapData = code => fetchCongressionalMapDataAPI(code).then(
  resp => resp.json(),
  err => Promise.reject(err),
).then(json => fromJS({ ...json, code }));

const fetchSenateMapData = state => fetchSenateMapDataAPI(state).then(
  resp => resp.json(),
  err => Promise.reject(err),
).then(json => fromJS({ ...json, state }));

export {
  fetchCongress,
  fetchCongressionalMapData,
  fetchSenateMapData,
};
