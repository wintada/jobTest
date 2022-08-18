import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Button, Checkbox, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Select, Switch, Option } from "@material-tailwind/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX ,faEllipsis} from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil';
import { options, location } from '../../../../reducer/items/newItems'

const actionSet = [
    {value: 'received',action: 'Stock received',prefix1: 'Add stock',prefix2: 'Stock'},
    {value: 'recount',action: 'Inventory re-count',prefix1: 'Current stock',prefix2: 'Previous stock'},
    {value: 'damage',action: 'Damage',prefix1: 'Remove stock',prefix2: 'Stock'},
    {value: 'theft',action: 'Theft',prefix1: 'Remove stock',prefix2: 'Stock'},
    {value: 'loss',action: 'Loss',prefix1: 'Remove stock',prefix2: 'Stock'},
    {value: 'restock',action: 'Restock return',prefix1: 'Add stock',prefix2: 'Stock'},
]

const editVariationModal = (props) => {
    // location
    const [itemLocation, setItemLocation] = useRecoilState(location)
    const [stockAction, setStockAction] = useState('received')
    const [selectedImage, setselectedImage] = useState()
    const [checkedAll, setCheckedAll] = useState(false)

    const toggleModal = () => props.handle(!props.open)

    const removeSelectedImage =() => {
        
    }

    const prepareDataBeforeCallback = () => {
        toggleModal()
    }

    return <>
        <Dialog className="overflow-visible" open={props.open} handler={()=>toggleModal()}>
            <DialogHeader className='flex justify-between'>
                <div>
                    <Button className='bg-gray-200' variant="text" onClick={()=>toggleModal()}>
                        <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                    </Button>
                </div>
                <div>Edit variation</div>
                <div className="w-16"/>
            </DialogHeader>
            <DialogBody className="overflow-scroll" style={{maxHeight: '75vh'}} divider>
                <div className="w-full">
                    <div>
                        <Tabs value="details">
                            <TabsHeader>
                                <Tab value={"details"}>Details</Tab>
                                <Tab value={"managestock"}>Manage stock</Tab>
                                <Tab value={"customattributes"}>Custom attributes</Tab>
                            </TabsHeader>
                            <TabsBody className="overflow-visible">
                                {/* Details */}
                                    <TabPanel value={"details"}>
                                        <div className="space-y-5">
                                            <div className="px-3">
                                                <Input label="Variation name"/>
                                            </div>
                                            <div className="px-3">
                                                <div className="mb-2 text-gray-800 font-bold">Sales Information</div>
                                                <div className="bg-gray-100 rounded-lg border-2 p-2 space-y-3">
                                                    <Input className="bg-gray-50" label="SKU"/>
                                                    <Select className="bg-gray-50" label="Unit">
                                                        <Option>Per Item</Option>
                                                        <Option>Per Hour (Add Unit)</Option>
                                                        <Option>Per Liter (Add Unit)</Option>
                                                        <Option>Per Ounce (Add Unit)</Option>
                                                        <Option>Per Pound (Add Unit)</Option>
                                                        <Option>Per Yard (Add Unit)</Option>
                                                    </Select>
                                                    <Input className="bg-gray-50" label="Price"/>
                                                </div>
                                            </div>
                                            <div  className="px-3">
                                                <header className="w-full border-dashed border border-gray-300 rounded-sm py-3 ">
                                                    <label className="pl-3 text-sm">Drag image here, </label>
                                                    <label className="text-blue-700 cursor-pointer font-semibold text-sm" htmlFor="uploadImage"> upload </label>
                                                    <input className="no-underline hidden" id="uploadImage" type="file" accept="image/*" name="image" onChange={e=>{setselectedImage(e.target.files[0])}}/>
                                                    <label className="text-sm"> or </label>
                                                    <label className="text-blue-700 cursor-pointer font-semibold text-sm" onClick={()=>setImageToggle(!imageToggle)}>browse image library</label>
                                                    <input className="no-underline hidden" type="file"/>
                                                    {selectedImage && (
                                                        <div className="h-20 w-20 mx-2 mt-2 rounded-md border border-gray-300 hover:border-blue-600">
                                                            <img className="h-12 w-20 pl-2 pr-2 pt-2" alt="Thumb" src={URL.createObjectURL(selectedImage)}/>
                                                            <button className="pl-2.5 text-sm font-semibold" onClick={removeSelectedImage}>Remove</button>
                                                        </div>
                                                    )}
                                                </header>
                                            </div>
                                        </div>
                                    </TabPanel>
                                {/* Details */}
                                {/* Manage stock */}
                                    <TabPanel value={"managestock"}>
                                        <div>
                                            <div className="text-gray-800 font-bold border-b-2 pb-2 mb-1">Locations and stock</div>
                                            <div>
                                                <div className='flex flex-row items-center border-b-2 mb-5'>
                                                    <div>
                                                        <Checkbox name="checkbox" checked={checkedAll} onChange={e=>setCheckedAll(e)}/>
                                                    </div>
                                                    <div className='flex items-center'>Available at 1 of {itemLocation.length} locations</div>
                                                </div>
                                                <div className="">
                                                    <table className="table-auto w-full">
                                                        <tbody className="space-y-5">
                                                            {
                                                                itemLocation.map((item,idx) => {
                                                                    return <div key={idx} className="bg-gray-100 border-2 rounded">
                                                                        <div className='flex flex-row items-center border-b-2 mb-2'>
                                                                            <div>
                                                                                <Checkbox className="bg-gray-50" name="checkbox" checked={checkedAll} onChange={e=>setCheckedAll(e)}/>
                                                                            </div>
                                                                            <div className='flex items-center'>Available at {item.value}</div>
                                                                        </div>
                                                                        <div className="px-5">
                                                                            <Switch label="Tracking" />
                                                                        </div>
                                                                        <div className="p-2 mt-2 space-y-3">
                                                                            <Select className="bg-gray-50" label="Stock Action" onChange={e=>console.log(e)}>
                                                                                {
                                                                                    actionSet.map((item, idx) => {
                                                                                        return <Option key={idx}>{item.action}</Option>
                                                                                    })
                                                                                }
                                                                            </Select>
                                                                            {console.log(actionSet.find(x => x.action === stockAction))}
                                                                            <Input className="bg-gray-50" label={actionSet.find(x => x.action === stockAction)}/>
                                                                            <Input className="bg-gray-50" label="Stock"/>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                {/* Manage stock */}
                                {/* Custom attributes */}
                                    <TabPanel value={"customattributes"}>
                                        <div className="flex pt-5 justify-center">
                                            <Button className="w-5/6 bg-gray-200 border-gray-50 text-indigo-500" variant="outlined" onClick={()=>{setAddCustomAttributesToggle(!addCustomAttributesToggle)}}>
                                                Add Custom Attribute
                                            </Button>
                                        </div>
                                    </TabPanel>
                                {/* Custom attributes */}
                            </TabsBody>
                        </Tabs>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <div className="text-right">
                    <Button className="" onClick={()=>prepareDataBeforeCallback()} disabled={false}>Done</Button>
                </div>
            </DialogFooter>
        </Dialog>
    </>
}

export default editVariationModal