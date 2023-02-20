import { useState, useEffect } from 'react'
import { Button, Checkbox, Input, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faX } from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil';
import { options,variations,location,newPageCollections } from '../../../../reducer/items/newItems'

const modifier = (props) => {
    return <>
        <div className='mb-7'>
            <div>
                <div className='border-b-2 pb-2 font-bold text-gray-800 text-lg'>Modifier Sets</div>
            </div>
            <div className="flex pt-5 justify-center">
                
            </div>
        </div>
    </>
}

export default modifier