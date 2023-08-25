import React from 'react'

// icons

import Icon from '@mdi/react'
import { mdiHeartOutline } from '@mdi/js'

function StarsReview() {
    return(
        <>
            <div id="rating-selector align-middle">
                <ul className='flex align-middle'>
                    <li>
                        <Icon path={mdiHeartOutline} size={1}/>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default StarsReview