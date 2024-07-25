import React from 'react'
import StakedAmount from './StakedAmount'
import EarnedReward from './EarnedReward'
import RewardRate from './RewardRate'

const DisplayPannel = () => {
  return (
    <div>
        <StakedAmount/>
        <RewardRate/>
        <EarnedReward/>
      
    </div>
  )
}

export default DisplayPannel
