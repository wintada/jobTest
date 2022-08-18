import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Button, Checkbox, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX ,faEllipsis} from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil';
import { options } from '../../../../reducer/items/newItems'

const addCustomAttributes = (props) => {
    const toggleModal = () => props.handle(!props.open)

    const prepareDataBeforeCallback = () => {

    }

    return <>
        <Dialog className="overflow-visible" open={props.open} handler={()=>toggleModal()}>
            <DialogHeader className='flex justify-between'>
                <div>
                    <Button className='bg-gray-200' variant="text" onClick={()=>toggleModal()}>
                        <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                    </Button>
                </div>
                <div>Add custom attribute</div>
                <div className="w-16"/>
            </DialogHeader>
            <DialogBody className="overflow-scroll" style={{maxHeight: '75vh'}} divider>
                <div className="w-full">
                    
                </div>
            </DialogBody>
            <DialogFooter>
                <div className="text-right">
                    <Button className="" onClick={()=>prepareDataBeforeCallback()} disabled={false}>
                        Add
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>
    </>
}

export default addCustomAttributes