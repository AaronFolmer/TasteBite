// firebase

import { Link } from 'react-router-dom'

// mdiicons

import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';


function Return() {


    return(
        <>
             <Link to="/">
                <Icon 
                    path={mdiArrowLeft} 
                    size={2.5} 
                    className='align-baseline inline m-10'
                />
            </Link>
        </>
    )
}

export default Return