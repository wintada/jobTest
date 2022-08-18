import { useState, useEffect } from 'react'
import { Button, Checkbox, Input, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faX } from '@fortawesome/free-solid-svg-icons'

import AddCustomAttributes from './addCustomAttributesModal';

import { useRecoilState } from 'recoil';
import { options,variations,location,newPageCollections } from '../../../../reducer/items/newItems'

const customAttributes = (props) => {
    const [addCustomAttributesToggle, setAddCustomAttributesToggle] = useState(false)

    const callback_addCustomAttributesModal = () => {

    }

    return <>
        <div className='mb-7'>
            <div>
                <div className='border-b-2 pb-2 font-bold text-gray-800 text-lg'>Custom Attributes</div>
            </div>
            <div className="flex pt-5 justify-center">
                <Button className="w-5/6 bg-gray-200 border-gray-50 text-indigo-500" variant="outlined" onClick={()=>{setAddCustomAttributesToggle(!addCustomAttributesToggle)}}>
                    Add Custom Attribute
                </Button>
            </div>
        </div>

        <AddCustomAttributes open={addCustomAttributesToggle} handle={setAddCustomAttributesToggle} callback={callback_addCustomAttributesModal}/>
    </>
}

export default customAttributes