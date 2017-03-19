# Twitch-tv Channels app (React, Redux, redux-thunk)

## <a href="https://vladimirtyalo.github.io/twitchtv-channels/" target="_blank">Live Demo Preview</a>

## About 
 - This application finds Twitch channels witch might be currently streaming or not.
 - It sends requests to a Twitch service each time you type in search field (with a little throttling)
 - It returns channels with "display_name" field approximately match the search value and if exact match exist,
   it will be highlighted.

## How to run
  `yarn install`
  then
  `npm run start`

## User stories
1. User can see whether Free Code Camp is currently streaming on Twitch.tv.
2. User can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
3. If a Twitch user is currently streaming, you can see additional details about what they are streaming.
4. User will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed).
   (If there is a channel which match the search string exactly, it will be highlighted)