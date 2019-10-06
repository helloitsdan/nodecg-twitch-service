import createReplicants, { createReplicant } from '../common/replicants'

import { TwitchieListenFunction, TwitchieReplicants } from '../types'
import getBadge from './utils/getBadge'
import getBadgeFromCurrentSets from './utils/getBadgeFromCurrentSets'
import getEmote from './utils/getEmote'
import listenFor from './utils/listenFor'

export { createReplicant, listenFor, getEmote, getBadge, getBadgeFromCurrentSets }

export * from '../types'

type TwitchieClient = TwitchieReplicants & {
  on: TwitchieListenFunction
}

const replicants = createReplicants(nodecg)

const client: TwitchieClient = {
  ...replicants,
  on: listenFor,
}

export default client
