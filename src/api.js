import throttle from 'lodash/throttle';
import $ from 'jquery';

import { config } from './configs';
import { create } from './actions';


export const fetchStreams = (query) => {
  const url = `https://api.twitch.tv/kraken/search/channels?q=${query}&limit=30&client_id=${config.client_id}&callback=?`;

  return Promise.resolve(
    $.getJSON(url,
      {
        headers: { Accept: "application/vnd.twitchtv.v3+json" }
      })
  );
};

export const fetchLiveStream = (query) => {
  const url = `https://api.twitch.tv/kraken/search/streams/?q=${query}&limit=100&client_id=${config.client_id}&callback=?`;

  return Promise.resolve(
    $.getJSON(url,
      {
        headers: { Accept: "application/vnd.twitchtv.v3+json" }
      })
  );
};

const throttledFetch = throttle(fetchStreams, 700, { trailing: true });
const throttleFetchStreams = throttle(fetchLiveStream, 700, { trailing: true });

export const getChannels = (query) => (dispatch) =>
  throttledFetch(query)
    .then(data => Promise.all([
      dispatch(create.fetchStart()),
      dispatch(create.fetchSuccess(data.channels)),
    ]))
    .catch(err => dispatch(create.fetchError(err.message))
    );

export const handleSearch = (inputRef, predicate) => (dispatch) => {
  if (inputRef.value.trim() === "") {
    return dispatch(create.resetChannels());
  }
  return Promise.all([
    dispatch(getChannels(inputRef.value)),
    dispatch(create.setInput(inputRef.value)),
    throttleFetchStreams(inputRef.value)
      .then(stream =>
        dispatch(create.fetchLiveSuccess(stream.streams))
      )
  ])
    .then(() => {
      dispatch(create.filter(predicate));
    })
    .catch(err => dispatch(create.fetchError(err.message)));
};
