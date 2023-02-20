import _ from "lodash"
import { useEffect, useState } from "react";
import {Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Checkbox} from "@material-tailwind/react";

import { useRecoilState } from 'recoil';
import { location } from '../../../../reducer/items/newItems'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const locationModal = (props) => {
    const [itemLocation, setItemLocation] = useRecoilState(location)
    // const [locationAtom, setLocationAtom] = useRecoilState(location)
    
    const [locationCheckAll, setLocationCheckAll] = useState(false)
    const [locationSet, setLocationSet] = useState([])

    useEffect(()=> {
        if(props.open === true){
            let arr_selectItemsName = _.cloneDeep([...props.selectItems])
            let arr = _.cloneDeep([...itemLocation])
            arr.map(item => {
                item.checked = arr_selectItemsName.find(x => x.id === item.id) !== undefined ? true : false
            })
            //set checked all
            let arr_itemsChecked = arr.filter(x => x.checked === true)
            setLocationCheckAll((arr_itemsChecked.length === arr.length && arr.length > 0) ? true : false)
            setLocationSet(arr)
        }
    }, [props.open])

    const handleChange = (element, index) => {
        const {name,checked} = element.target
        let arr = _.cloneDeep([...locationSet])
        let objIndex = arr.findIndex(x => x.id === index)
        arr[objIndex].checked = checked

        //set checked all
        let arr_itemsChecked = arr.filter(x => x.checked === true)
        // console.log('handleChange: ', arr.filter(x => x.checked === true))
        setLocationCheckAll((arr_itemsChecked.length === arr.length && arr.length > 0) ? true : false)
        setLocationSet(arr)
    }

    const handleCheckAll = (element) => {
        const {checked} = element.target
        let arr = _.cloneDeep([...locationSet])
        arr.map(item => {item.checked = checked})
        setLocationSet(arr)
        setLocationCheckAll(checked)
    }

    const toggleModal = () => props.handle(!props.open)

    const prepareBeforeCallback = () => {
        let arr = _.cloneDeep([...locationSet]) || []
        let output = []
        if(arr.length > 0) {
            output = arr.filter(x => x.checked === true)
            output.map(item => {delete item.checked})
        }
        props.callback(output)
        toggleModal()
    }
    
    return <>
        <Dialog open={props.open} handler={()=>toggleModal()}>
            <DialogHeader className='flex justify-between'>
                <div>
                    <Button className='bg-gray-200' variant="text" onClick={()=>toggleModal()}>
                        <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                    </Button>
                </div>
                <div>Edit Locations</div>
                <div className='space-x-2'>
                    <Button onClick={()=>prepareBeforeCallback()}>Save</Button>
                </div>
            </DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col pl-8 pr-8">
                        <label htmlFor="search" className="sr-only ">Search</label>
                        <div className="w-[32rem] pt-3 pb-3">
                            <Input size="lg" label="Search" icon={
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                                </svg>
                            }/>
                        </div>
                        <div className="flex items-center border-b-2 py-2">
                            <Checkbox checked={locationCheckAll} onChange={e=>{handleCheckAll(e)}}/>
                            Location
                        </div>
                        {
                            locationSet.map((item, idx) => {
                                return <div className="flex items-center pt-3" key={idx}>
                                    <Checkbox checked={item.checked} onChange={e=>{handleChange(e, item.id)}}/>
                                    {item.value}
                                </div>
                            })
                        }
                    </div>
                </DialogBody>
        </Dialog>
    </>
}

export default locationModal