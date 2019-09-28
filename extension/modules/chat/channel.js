const { twitch, replicants } = require('../../context')
const getChatChannelFor = require('../../utils/getChatChannelFor')

const { channel, user } = replicants

const isUserInChannel = channelName => twitch.client.getChannels().includes(channelName)

// leave chat immediately when channel ID is changed;
// there might be a content reason we want to change ASAP
// so we shouldn't wait for user resolution...
channel.id.on('change', (newChannel, oldChannel) => {
  if (!oldChannel) {
    return
  }

  const channelToPart = getChatChannelFor(oldChannel)

  if (!isUserInChannel(channelToPart)) {
    return
  }

  twitch.client.part(channelToPart)
})

// only try and join a channel when we're sure the provided
// channel id actually resolves to a real user
// trying to join nonexistent channels on twitch irc can
// cause issues
user.id.on('change', newUserId => {
  if (!newUserId) {
    return
  }

  const channelToJoin = getChatChannelFor(channel.id.value)
  twitch.client.join(channelToJoin)
})
