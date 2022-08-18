import { useState, useEffect } from 'react'
import { Button, Checkbox, Input, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faX } from '@fortawesome/free-solid-svg-icons'
import EditVariationModal from './editVariationModal';

import { useRecoilState } from 'recoil';
import { options,variations,location,newPageCollections } from '../../../../reducer/items/newItems'

const variationsComponent = (props) => {
    const [collections, setCollections] = useRecoilState(newPageCollections)
    const [locationSet, setLocationSet] = useRecoilState(location)
    const [variations_headerColumn, setVariations_headerColumn] = useState([
        {id: 0,name: 'Variation'},
        {id: 1,name: 'SKU'},
        {id: 6,name: 'Price'},
        {id: 5,name: 'Stock'},
    ])
    const [variationsItems, setVariationsItems] = useState([])
    const [variationsCheckedAll, setVariationsCheckedAll] = useState(false)
    const [optionsItems, setOptionItems] = useRecoilState(options)

    const [overrideToggle, setOverrideToggle] = useState(false)
    const [editVariationToggle, setEditVariationToggle] = useState(false)

    useEffect(() => {
        initialData()
        if(collections.variations.length > 0) setOverrideToggle(false)
    }, [collections.variations])


    useEffect(() => {
        if(overrideToggle === false) {
            //Clear Data Of Price Override
        }
    },[overrideToggle])

    const initialData = () => {
        let arr = _.cloneDeep({...collections})
        arr.variations.map(item => {
            item.checked = true
        })
        setVariationsItems(arr.variations)
    }
    
    const handleChange = (element,index) => {
        const {type,name,value,checked} = element.target
        
        //set item data
        let arr = _.cloneDeep([...variationsItems])
        let objIndex = arr.findIndex(x => x.id === index)
        let arr_itemsChecked = arr.filter(x => x.checked === true)
        
        if(name === 'price') {
            //check mutiple column
            if(arr_itemsChecked.length > 1) {
                arr[objIndex].checked === true ? arr.map(item => {arr_itemsChecked.map(subItem => {if(item.id === subItem.id) item.price = value})}) : arr[objIndex][name] = value
            } else {
                arr[objIndex][name] = value
            }
        } else {
            arr[objIndex][name] = type === 'checkbox' ? checked : value
        }
        
        //set checked all
        arr_itemsChecked = arr.filter(x => x.checked === true)
        setVariationsCheckedAll(arr_itemsChecked.length > 0 ? true : false)
        setVariationsItems(arr)

        let arrCol = _.cloneDeep({...collections})
        arrCol.variations = arr
        setCollections(arrCol)
    }

    const removeItem = (index) => {
        let arr = _.cloneDeep([...variationsItems])
        arr = arr.filter(x => x.id !== index)

        
        let arr_itemsChecked = arr.filter(x => x.checked === true)
        setVariationsCheckedAll(arr_itemsChecked.length > 0 ? true : false)
        setVariationsItems(arr)

        let arrCol = crossCheckOptions(arr)
        arrCol.variations = arr
        setCollections(arrCol)
    }

    const crossCheckOptions = (raw) => {
        let arr = _.cloneDeep({...collections})
        let tempKey = []
        let newOptions = []
        
        //Create key object
        raw.map(item => {
            item.variations.map(subItem => {
                if(!tempKey.includes(subItem.key)) tempKey.push(subItem.key)
            })
        })

        tempKey.map(item => newOptions.push({name: item,option: []}))

        //Merge value
        raw.map(item => {
            item.variations.map(subItem => {
                newOptions.map(newOp => {
                    if(subItem.key === newOp.name) {
                        if(!newOp.option.includes(subItem.value)) newOp.option.push(subItem.value)
                    }
                })
            })
        })

        arr.options = newOptions
        return arr
    }

    const handleCheckAll = (element) => {
        const {checked} = element.target
        let arr = _.cloneDeep([...variationsItems])
        arr.map(item => {item.checked = checked})
        setVariationsItems(arr)
        setVariationsCheckedAll(checked)
    }

    const callback_editVariationModal = () => {

    }

    return <>
        <div className="mb-7">
            <div className='flex flex-row border-b-2 pb-2 justify-between'>
                <div className='font-bold text-gray-800 text-lg'>Variations</div>
                <Button className='p-1' variant="text" onClick={()=>setEditVariationToggle(!editVariationToggle)}>Edit variation details</Button>
            </div>
            {
                variationsItems.length <= 0 ?
                    <div className='mt-5 space-y-5'>
                        <div>
                            <Input label="SKU"/>
                        </div>
                        <div className='flex flex-row'>
                            <div className='grow pr-2'>
                                <Select className="" label="Unit">
                                    <Option>Per Item</Option>
                                    <Option>Per Hour (Add Unit)</Option>
                                    <Option>Per Liter (Add Unit)</Option>
                                    <Option>Per Ounce (Add Unit)</Option>
                                    <Option>Per Pound (Add Unit)</Option>
                                    <Option>Per Yard (Add Unit)</Option>
                                </Select>
                            </div>
                            <div className='grow pl-2'>
                                <Input label="Price"/>
                            </div>
                        </div>
                        {
                            overrideToggle ?
                                <div className='flex flex-row'>
                                    <div className='grow pr-2'>
                                        <Input label="Price Override"/>
                                    </div>
                                    <div className='grow pl-2'>
                                        <Select className="" label="Location">
                                            {
                                                locationSet.map((item, idx) => {
                                                    return <Option key={idx}>{item.value}</Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                            :
                                <></>
                        }
                        <div className='flex items-center justify-end'>
                            <Button className='p-1' variant="text" onClick={()=>setOverrideToggle(!overrideToggle)}>{overrideToggle ? 'Close' : 'Add' } price override</Button> |
                            <Button className='p-1' variant="text" onClick={()=>setOverrideToggle(!overrideToggle)}>Manage stock</Button>
                        </div>
                    </div>
                :
                     <div className='flex flex-row text-gray-800 font-normal items-center border-b-2 py-1'>
                        <div className=''>
                            <Checkbox onChange={e=>{handleCheckAll(e)}} checked={variationsCheckedAll}/>
                        </div>
                        <div className='pt-1 pr-5'>
                            {
                                variationsCheckedAll ?
                                    variationsItems.filter(x => x.checked === true).length + " of " + variationsItems.length
                                :
                                    variationsItems.length + " Variations"
                            }
                        </div>
                        {
                            variationsCheckedAll ?
                                <div className='pt-1 text-blue-600'>
                                    Edit price
                                </div>
                            :
                                <></>
                        }
                    </div>
            }
            {
                collections.options.length > 0 ?
                    <>
                        <div>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr className='h-12'>
                                        <th className='w-0'/>
                                        {
                                            variations_headerColumn.map((item,idx) => {
                                                return (
                                                    <th className={`${item.id === 0 ? 'w-2/6' : ''} text-gray-800`} style={{textAlign: item.id === 0 ? 'left' : 'initial', paddingLeft: item.id === 0 ? 10 : 0}} key={idx}>{item.name}</th>
                                                )
                                            })
                                        }
                                        <th className='w-5'/>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        variationsItems.map((item, idx) => {
                                            return (
                                                <tr key={item.id} className='divide-y-2 cursor-pointer'>
                                                    <td className='w-0'/>
                                                    <td className='py-1 pl-2 border-r-2' onClick={()=>console.log('Click variations:', item.id)}>
                                                        <div className='flex flex-row'>
                                                            <div>
                                                                <Checkbox name="variationsCheckedItem" checked={item.checked} onChange={e=>handleChange(e,item.id)}/>
                                                            </div>
                                                            <div className='flex flex-row items-center pl-2 text-blue-800'>
                                                                <div className='flex bg-gray-100 w-10 h-10 rounded items-center justify-center mr-3 hover:bg-blue-300'>
                                                                    <FontAwesomeIcon className="text-base text-gray-300" icon={faImage} />
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                {item.variations.map((subItem, subId) => {
                                                                    return (subId !== 0 ? "," : "") + subItem.value
                                                                })}
                                                            </div>
                                                        </div>
                                                    </td> 
                                                    <td className='py-1 px-2 border-r-2'>
                                                        <input className='w-full focus:outline-none' placeholder="SKU" name='sku' value={item.sku} onChange={e=>handleChange(e,item.id)}/>
                                                    </td>
                                                    <td className='py-1 px-2 border-r-2'>
                                                        <input className='w-full text-right focus:outline-none' type="number" placeholder="$0.00" name='price' value={item.price} onChange={e=>handleChange(e,item.id)} disabled={item.openPriceCol}/>
                                                    </td>
                                                    <td className='py-1 px-2 text-right' onClick={()=>console.log('Click manage:', item.id)}>
                                                        <div className='text-blue-800'>
                                                            Manage
                                                        </div>
                                                    </td>
                                                    <td className='px-2 text-right' onClick={()=>{removeItem(item.id)}}>
                                                        <Button className='' variant="text">
                                                            <FontAwesomeIcon className="text-base text-gray-300" icon={faX} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> 
                        <div className='flex flex-row w-full p-2 mb-5'>
                            <div className='flex-1 p-2'>
                                <Button className='w-full bg-gray-200 border-gray-50 text-indigo-500' onClick={()=>console.log('Add variation')}>Add variation</Button>
                            </div>
                            <div className='flex-1 p-2'>
                                <Button className='w-full bg-gray-200 border-gray-50 text-indigo-500' onClick={()=>console.log('Manage stock')}>Manage stock</Button>
                            </div>
                            <div className='flex-1 p-2'>
                                <Button className='w-full bg-gray-200 border-gray-50 text-indigo-500' onClick={()=>console.log('Edit Stock Trcking')}>Edit Stock Trcking</Button>
                            </div>
                        </div>
                    </>
                :
                    <></>
            }
        </div>       

        <EditVariationModal open={editVariationToggle} handle={setEditVariationToggle} callback={callback_editVariationModal}/>     
    </>
}

export default variationsComponent