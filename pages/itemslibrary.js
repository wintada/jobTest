import { useState, useEffect } from 'react'
import { Button, Checkbox, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faX } from '@fortawesome/free-solid-svg-icons'
import { isConstructorDeclaration } from 'typescript';

const itemslibrary = () => {
    const mock_data = [
        {id: 0,item: 'a',sku: 'a',cetegory: 'a',locations: 'a',soldby: 'a',stock: 'a',price: 'a'},
        {id: 1,item: 'b',sku: 'b',cetegory: 'b',locations: 'b',soldby: 'b',stock: 'b',price: 'b'},
        {id: 2,item: 'c',sku: 'c',cetegory: 'c',locations: 'c',soldby: 'c',stock: 'c',price: 'c'},
    ]
    const mock_options = [{name: 'size', option: ['S','M','L']},{name: 'color', option: ['Red','Green','Blue']},{name: 'sex', option: ['Male','Female']}]

    const [list_headerColumn, setList_headerColumn] = useState([
        {id: 0,name: 'Item',open: true},
        {id: 1,name: 'SKU',open: true},
        {id: 2,name: 'Cetegory',open: true},
        {id: 3,name: 'Locations',open: true},
        {id: 4,name: 'Sold by',open: true},
        {id: 5,name: 'Stock',open: true},
        {id: 6,name: 'Price',open: true},
    ])
    const [variations_headerColumn, setVariations_headerColumn] = useState([
        {id: 0,name: 'Variation'},
        {id: 1,name: 'SKU'},
        {id: 6,name: 'Price'},
        {id: 5,name: 'Stock'},
    ])
    const [createModalToggle, setCreateModalToggle] = useState(false)
    const [variationsItems, setVariationsItems] = useState([])
    const [variationsCheckedAll, setVariationsCheckedAll] = useState(false)

    useEffect(() => {
        // generateingVariations()
    }, [])
    
    const generateingVariations = () => {
        const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
        let output = []
        let mainArray = []
        mock_options.map(item => {
            mainArray.push(item.option)
        })

        //Prepair Information
        cartesian(...mainArray).map((item, idx)=> {
            output.push({id: idx,variant: item, sku: '', price: '', location: '',variationsCheckedItem: false,openPriceCol: false})
        })
        setVariationsItems(output)
    }

    const handleChange_Variations = (element,index) => {
        const {type,name,value,checked} = element.target
        
        //set item data
        let arr = [...variationsItems]
        let objIndex = arr.findIndex(x => x.id === index)
        let arr_itemsChecked = arr.filter(x => x.variationsCheckedItem === true)
        
        if(name === 'price') {
            //check mutiple column
            if(arr_itemsChecked.length > 1) {
                arr[objIndex].variationsCheckedItem === true ? arr.map(item => {arr_itemsChecked.map(subItem => {if(item.id === subItem.id) item.price = value})}) : arr[objIndex][name] = value
            } else {
                arr[objIndex][name] = value
            }
        } else {
            arr[objIndex][name] = type === 'checkbox' ? checked : value
        }
        
        console.log('test: ', variationsItems)
        //set checked all
        arr_itemsChecked = arr.filter(x => x.variationsCheckedItem === true)
        setVariationsCheckedAll(arr_itemsChecked.length > 0 ? true : false)
        setVariationsItems(arr)
    }

    const handleRemove_Variations = (index) => {
        let arr = [...variationsItems]
        arr = arr.filter(x => x.id !== index)

        let arr_itemsChecked = arr.filter(x => x.variationsCheckedItem === true)
        setVariationsCheckedAll(arr_itemsChecked.length > 0 ? true : false)
        setVariationsItems(arr)
    }

    const handleOpenCreateModal = () => {
        setCreateModalToggle(!createModalToggle)
    }

    const handleCheckAll_Variations = (element) => {
        const {checked} = element.target
        let arr = [...variationsItems]
        arr.map(item => {item.variationsCheckedItem = checked})
        setVariationsItems(arr)
        setVariationsCheckedAll(checked)
    }

    return <>
        <div className='flex flex-col w-full h-full'>
            <div className='flex flex-row items-center p-2 grow-0'>
                <div className="grow">
                    <div className='w-72'>
                        <Input size="lg" label="Search" />
                    </div>
                </div>
                <div className="grow-0 space-x-2">
                    <Button onClick={()=>generateingVariations()}>Mock Data</Button>
                    <Button onClick={()=>handleOpenCreateModal()}>Create an Item</Button>
                </div>
            </div>
            <div className="grow px-2 overflow-scroll">
                <table className="table-auto w-full border-collapse">
                    <thead style={{position: 'sticky',top: -1,zIndex: 1, backgroundColor: 'white'}}>
                        <tr className='h-10' style={{borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: '#a5a5a5'}}>
                            <th className='w-0'/>
                            {
                                list_headerColumn.map((item,idx) => {
                                    return (
                                        item.open ?
                                            <th className={`${item.id === 0 ? 'w-2/6' : ''} text-gray-800`} style={{textAlign: item.id === 0 ? 'left' : 'initial', paddingLeft: item.id === 0 ? 20 : 0}} key={idx}>{item.name}</th>
                                        :
                                            <></>
                                    )
                                    
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mock_data.map((item, idx) => {
                                return (
                                    <tr key={idx} className='divide-y-2 hover:bg-blue-100 cursor-pointer' onClick={()=>console.log('Click: row', idx)}>
                                        <td className='w-0'/>
                                        {
                                            list_headerColumn[0].open 
                                            ? 
                                                <td className='py-1 pl-2'>
                                                    <div className='flex flex-row items-center pl-8 text-blue-800'>
                                                        <div className='flex bg-gray-100 w-10 h-10 rounded items-center justify-center mr-3 hover:bg-blue-300'>
                                                            <FontAwesomeIcon className="text-base text-gray-300" icon={faImage} />
                                                        </div>
                                                        {item.item}
                                                    </div>
                                                </td> 
                                            : 
                                                <></>
                                        }
                                        {list_headerColumn[1].open ? <td>{item.sku}</td> : <></>}
                                        {list_headerColumn[2].open ? <td>{item.cetegory}</td> : <></>}
                                        {list_headerColumn[3].open ? <td>{item.locations}</td> : <></>}
                                        {list_headerColumn[4].open ? <td>{item.soldby}</td> : <></>}
                                        {list_headerColumn[5].open ? <td>{item.stock}</td> : <></>}
                                        {list_headerColumn[6].open ? <td>{item.price}</td> : <></>}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

        {/* Modal Create Item */}
        <Dialog open={createModalToggle} handler={()=>setCreateModalToggle(!createModalToggle)} size="xxl">
            <DialogHeader className='flex justify-center '>
                <div>Create an Item</div>
            </DialogHeader>
            <DialogBody className='overflow-scroll'>
                {/* Variations Table */}
                    <div className="container mx-auto border-b-5">
                        <div className='border-b-2 pb-2 font-bold text-gray-800 text-lg'>Variations</div>
                        {
                            variationsItems.length > 0 ?
                                <div className='flex flex-row text-gray-800 font-normal items-center border-b-2 py-1'>
                                    <div className=''>
                                        <Checkbox onChange={e=>{handleCheckAll_Variations(e)}} checked={variationsCheckedAll}/>
                                    </div>
                                    <div className='pt-1 pr-5'>
                                        {
                                            variationsCheckedAll ?
                                                variationsItems.filter(x => x.variationsCheckedItem === true).length + " of " + variationsItems.length
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
                                                                <Checkbox name="variationsCheckedItem" checked={item.variationsCheckedItem} onChange={e=>handleChange_Variations(e,item.id)}/>
                                                            </div>
                                                            <div className='flex flex-row items-center pl-2 text-blue-800'>
                                                                <div className='flex bg-gray-100 w-10 h-10 rounded items-center justify-center mr-3 hover:bg-blue-300'>
                                                                    <FontAwesomeIcon className="text-base text-gray-300" icon={faImage} />
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                {item.variant.map((subItem, subId) => {
                                                                    return (subItem.length-1 !== subId ? "," : "") + subItem
                                                                })}
                                                            </div>
                                                        </div>
                                                    </td> 
                                                    <td className='py-1 px-2 border-r-2'>
                                                        <input className='w-full focus:outline-none' placeholder="SKU" name='sku' value={item.sku} onChange={e=>handleChange_Variations(e,item.id)}/>
                                                    </td>
                                                    <td className='py-1 px-2 border-r-2'>
                                                        <input className='w-full text-right focus:outline-none' type="number" placeholder="$0.00" name='price' value={item.price} onChange={e=>handleChange_Variations(e,item.id)} disabled={item.openPriceCol}/>
                                                    </td>
                                                    <td className='py-1 px-2 text-right' onClick={()=>console.log('Click manage:', item.id)}>
                                                        <div className='text-blue-800'>
                                                            Manage
                                                        </div>
                                                    </td>
                                                    <td className='px-2 text-right' onClick={()=>{handleRemove_Variations(item.id)}}>
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
                                <Button className='w-full' onClick={()=>console.log('Add variation')}>Add variation</Button>
                            </div>
                            <div className='flex-1 p-2'>
                                <Button className='w-full' onClick={()=>console.log('Manage stock')}>Manage stock</Button>
                            </div>
                            <div className='flex-1 p-2'>
                                <Button className='w-full' onClick={()=>console.log('Edit Stock Trcking')}>Edit Stock Trcking</Button>
                            </div>
                        </div>
                    </div>
                {/* Variations Table */}
            </DialogBody>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={()=>setCreateModalToggle(!createModalToggle)}
                className="mr-1"
            >
                <span>Close</span>
            </Button>
            <Button variant="gradient" color="green" onClick={()=>setCreateModalToggle(!createModalToggle)}>
                <span>Save</span>
            </Button>
            </DialogFooter>
        </Dialog>
    </>
  );
};

export default itemslibrary;
