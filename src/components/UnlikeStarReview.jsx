import React from 'react'

// icons

import Icon from '@mdi/react'
import { mdiHeartBroken } from '@mdi/js'

function UnlikeStarReview() {
    return(
        <>
            <div id="rating-selector align-middle">
                <ul className='flex align-middle'>
                    <li>
                        <Icon path={mdiHeartBroken} size={1}/>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UnlikeStarReview