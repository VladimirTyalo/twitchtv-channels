export const initialState = {
  channels: {
    0: { _id: 0, display_name: "freecodecamp", logo: "http://placehold.it/50x50", url: "http://placehold.it/20x20" },
    1: { _id: 1, display_name: "freecodecamp", logo: "http://placehold.it/50x50", url: "http://placehold.it/20x20" },
  },

  streams: [
    {_id: 0, display_name: "freecodecamp", channel: {_id: 1}}
  ],

  frontend: {
    filter: "all", // online, offline
    isFetching: false,
    error: null,
    channels: [0, 1],
    search: ""
  }
};
