export const type = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  FILTER: "FILTER",
  RESET_CHANNELS: "RESET_CHANNELS",
  SET_INPUT: "SET_INPUT",
  FETCH_LIVE_SUCCESS: "FETCH_LIVE_SUCCESS",
  FETCH_LIVE_BY_ID: "FETCH_LIVE_BY_ID"
};


export const create = {
  setInput: (value) => ({
    type: type.SET_INPUT,
    value
  }),
  fetchStart: () => ({
    type: type.FETCH_START,
    loading: true
  }),

  fetchSuccess: (channels) => ({
    type: type.FETCH_SUCCESS,
    channels
  }),

  fetchLiveSuccess: (streams) => ({
    type: type.FETCH_LIVE_SUCCESS,
    streams
  }),

  fetchError: (message) => ({
    type: type.FETCH_ERROR,
    message
  }),

  resetChannels: () => ({
    type: type.RESET_CHANNELS
  }),

  filter: (predicate) => ({
    type: type.FILTER,
    predicate
  })
};