import { useState, useEffect } from 'react'
import { Button, Checkbox } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faX } from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil';
import { options,variations,newPageCollections } from '../../../../reducer/items/newItems'

const variationsComponent = (props) => {
    const [collections, setCollections] = useRecoilState(newPageCollections)
    const [variations_headerColumn, setVariations_headerColumn] = useState([
        {id: 0,name: 'Variation'},
        {id: 1,name: 'SKU'},
        {id: 6,name: 'Price'},
        {id: 5,name: 'Stock'},
    ])
    const [variationsItems, setVariationsItems] = useState([])
    const [variationsCheckedAll, setVariationsCheckedAll] = useState(false)
    const [optionsItems, setOptionItems] = useRecoilState(options)

    useEffect(() => {
        initialData()
        // crossCheckOptions()
    }, [collections.variations])

    // const generateingVariations = () => {
    //     const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
    //     let output = []
    //     let mainArray = []
    //     if(optionsItems.length > 0) {
    //         optionsItems.map(item => {
    //             mainArray.push(item.option)
    //         })
    
    //         cartesian(...mainArray).map((item, idx)=> {
    //             output.push({id: idx,variant: item, sku: '', price: '', location: '',variationsCheckedItem: false,openPriceCol: false})
    //         })
    //     }
    //     setVariationsItems(output)
    // }

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

    return <>
        <div className="">
            <div className='border-b-2 pb-2 font-bold text-gray-800 text-lg'>Variations</div>
            {
                variationsItems.length > 0 ?
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
                :
                    <></>
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
    </>
}

export default variationsComponent