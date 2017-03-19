import { type } from './actions';

export const reducer = (state = {}, action) => {
  switch (action.type) {

    case type.FETCH_START: {
      return { ...state, frontend: { ...state.frontend, isFetching: true } };
    }

    case type.FETCH_SUCCESS: {
      return {
        ...state,
        channels: action.channels,
        frontend: {
          ...state.frontend,
          isFetching: false,
          error: null
        }
      };
    }

    case type.FETCH_LIVE_SUCCESS: {

      const streams = action.streams.reduce((acc, el) => {
        const chId = el.channel._id;
        acc[chId] = el;
        return acc;
      }, {});

      return {
        ...state,
        streams: streams,
        frontend: {
          ...state.frontend,
          isFetching: false,
          error: null
        }
      };
    }

    case type.FETCH_ERROR: {
      const err = action.message;
      return {
        ...state, frontend: { ...state.frontend, isFetching: false, error: err }
      };
    }

    case type.SET_INPUT: {
      return { ...state, frontend: { ...state.frontend, search: action.value } };
    }

    case type.FILTER: {
      if(state.frontend.search.trim() === '') {
        return {
          ...state, frontend: {...state.frontend, channels: []}
        };
      }
      let displayedChannels = [];
      if (action.predicate.toLowerCase() === 'all') {
        displayedChannels = Object.keys(state.channels);
      } else if (action.predicate.toLowerCase() === 'offline') {
        displayedChannels = Object.keys(state.channels).filter(key => {
          const chId = state.channels[key]._id;
          return state.streams[chId] === undefined;
        });

      } else if (action.predicate.toLowerCase() === 'online') {
        displayedChannels = Object.keys(state.channels).filter(key => {
          const chId = state.channels[key]._id;
          return state.streams[chId] !== undefined;
        })
          .sort((a, b) => {
            const chIdA = state.channels[a]._id;
            const chIdB = state.channels[b]._id;
            const view1 = state.streams[chIdA].viewers;
            const view2 = state.streams[chIdB].viewers;

            return Number(view2) - Number(view1);
          });
      }

      return {
        ...state,
        frontend: {
          ...state.frontend,
          filter: action.predicate,
          isFetching: false,
          error: null,
          channels: displayedChannels
        }
      };
    }

    case type.RESET_CHANNELS: {
      return {
        channels: [],
        streams: {},
        frontend: {search: "", isFetching: false, error: null, channels: [], filter: "all" }
      };
    }

    default: return state;
  }
};
