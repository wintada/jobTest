import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Button, Checkbox, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX ,faEllipsis} from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil';
import { options } from '../../../../reducer/items/newItems'

const chkref = React.createRef(null)
const createVariationsModal = (props) => {
    // const [itemsOptions, setItemsOptions] = useRecoilState(options)
    const toggleModal = () => props.handle(!props.open)

    const [variationsList, setVariationsList] = useState([])
    const [checkedAll, setCheckedAll] = useState(false)

    useEffect(() => {
        if(props.open) {
            setCheckedAll(true)
            generateingVariations(props.rawdata)
        }
    },[props.open])

    const generateingVariations = (raw) => {
        const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
        let output = []
        let mainArray = []
        if(raw.length > 0) {
            raw.map(item => {
                let temp_option = []
                item.option.map(subItem => temp_option.push(item.name+"_"+subItem))
                mainArray.push(temp_option)
            })
            cartesian(...mainArray).map((item, idx)=> {
                let arr = Array.isArray(item) ? item : [item] 
                let temp_sub = []
                arr.map(subItem => temp_sub.push({key: subItem.split('_')[0], value: subItem.split('_')[1]}))
                output.push({id: idx, variations: temp_sub, checked: true})
            })
        }
        setVariationsList(output)
    }

    const handleChange = (element, index) => {
        const {id,name,checked} = element.target
        // console.log('handleChange: ', index, checked)
        let arr = _.cloneDeep([...variationsList])
        let objIndex = arr.findIndex(x => x.id === index)
        arr[objIndex].checked = checked

        //set checked all
        let arr_itemsChecked = arr.filter(x => x.checked === true)
        setCheckedAll((arr_itemsChecked.length === arr.length && arr.length > 0) ? true : false)
        setVariationsList(arr)
    }

    const handleCheckAll = (element) => {
        const {checked} = element.target
        let arr = _.cloneDeep([...variationsList])
        arr.map(item => {item.checked = checked})
        setVariationsList(arr)
        setCheckedAll(checked)
    }
    
    const prepareDataBeforeCallback = () => {
        let arr = _.cloneDeep([...variationsList])
        arr.filter(x => x.checked === true)
        arr.map(item => {
            item.sku = '' 
            item.price = ''
            item.location = ''
            delete item.checked
        })
        props.callback(arr)
    }

    return <>
        <Dialog className="overflow-visible" open={props.open} handler={()=>toggleModal()}>
            <DialogHeader className='flex justify-between'>
                <div>
                    <Button className='bg-gray-200' variant="text" onClick={()=>props.backstep()}>
                        <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                    </Button>
                </div>
                <div>Create Variations</div>
                <div className="w-16"/>
            </DialogHeader>
            <DialogBody className="overflow-scroll" style={{maxHeight: '75vh'}} divider>
                <div className="w-full">
                    <div className="pb-3 mb-2 border-b-2 text-gray-700">
                        The variations below will be created from your options.
                    </div>
                    <div className='flex flex-row items-center border-b-2 mb-2'>
                        <div>
                            <Checkbox name="checkbox" checked={checkedAll} onChange={e=>handleCheckAll(e)}/>
                        </div>
                        <div className='flex items-center'>All variations</div>
                    </div>
                    <div className="">
                        <table className="table-auto w-full">
                            <tbody>
                                {
                                    variationsList.map((item, idx) => {
                                        return (
                                            <tr key={item.id} className='divide-y-2 cursor-pointer' onChange={()=>{chkref.onChange(); console.log('clicked')}}>
                                                <td className='py-1 pl-2'>
                                                    <div className='flex flex-row items-center'>
                                                        <div>
                                                            <Checkbox ref={chkref} name="checkbox" checked={item.checked} onChange={e=>handleChange(e, item.id)}/>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            {item.variations.map((subItem, subId) => {
                                                                return (subId !== 0 ? "," : "") + subItem.value
                                                            })}
                                                        </div>
                                                    </div>
                                                </td> 
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <div className="text-right">
                    <Button className="" onClick={()=>prepareDataBeforeCallback()} disabled={variationsList.filter(x => x.checked === true).length <= 0}>
                        Create {variationsList.filter(x => x.checked === true).length} Variations
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>
    </>
}

export default createVariationsModal