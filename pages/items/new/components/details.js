import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Button, Input, Textarea } from "@material-tailwind/react";

import { useRecoilState } from 'recoil';
import { category,newPageCollections } from '../../../../reducer/items/newItems'
import LocationModal from "./LocationModal";
import EditModal from "./editModal";

const detailsComponent = (props) => {
    // const mock_category = [{ value: "none", label: "none" }, { value: "chicken", label: "chicken" }, { value: "pork", label: "pork" }]
    // const mock_location = [{ value: "example", label: "Example" }, { value: "example1", label: "Example1" }, { value: "example2", label: "Example2" }]
    
    const [collections, setCollections] = useRecoilState(newPageCollections)
    const [categorySet, setCategorySet] = useRecoilState(category)
    const [selectedImage, setselectedImage] = useState() // BG Image
    const [selectedBG, setSelectedBG] = useState() // BG Color
    const [itemLocationLable, setItemLocationLable] = useState('')
    const [itemLocation, setItemLocation] = useState('')
    const [itemName, setItemName] = useState('')
    const [locationToggle, setLocationToggle] = useState(false)
    const [imageToggle, setImageToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)

    const removeSelectedImage = () => setselectedImage()

    const callback_editModal = (response) => {
        if(response.type === 'image') {
            setselectedImage(response.value)
        } else if(response.type === 'color') {
            setSelectedBG(response.value)
        }
    }

    const callback_locationModal = (response) => {
        let string = []
        response.map((item,idx) => {
            string += (idx !== 0 ? ' / ' : '') + item.value
        })
        setCollections({...collections, location: response})
        setItemLocation(response)
        setItemLocationLable(string)
    }

    return <>
        <div className="mb-7">
            <div className="mb-7">
                <div className='border-b-2 pb-2 font-bold text-gray-800 text-lg'>Detail</div>
            </div>
            <div className="flex flex-row">
                <div className="grow space-y-6 px-3">
                    <div>
                        {/* <Input editdialog="lg" label="item name" onChange={e=>setItemName(e.target.value)}/> */}
                        <Input label="item name" onChange={e=>setCollections({...collections, itemName: e.target.value})}/>
                    </div>
                    <div>
                        {/* <CreatableSelect placeholder="Category" options={categorySet} onChange={setItemLocation}/> */}
                        <CreatableSelect placeholder="Category" options={categorySet} onChange={obj=>setCollections({...collections, category: obj.value})}/>
                    </div>
                    <div>
                    {/* <Textarea label="Description" onChange={e=>setDescription(e.target.value)}/> */}
                        <Textarea label="Description" onChange={e=>setCollections({...collections, description: e.target.value})}/>
                    </div>
                    <div className="">
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
                    <div className="">
                        <Input size="lg" label="Locations" value={itemLocationLable} onClick={()=>setLocationToggle(!locationToggle)}/>
                    </div>
                </div>
                <div className="grow-0 px-5">
                    <div className="object-fill h-48 w-60 bg-gray-300 float-right">
                        {
                            !selectedImage
                            ?
                                <input className={`text-white text-5xl font-semibold object-fill h-48 w-60 float-right pl-8 pr-8 text-center .hidden ${selectedBG ? 'bg-'+selectedBG : ' bg-gray-300'}`} onChange={(e)=>setItemName(e.target.value)} value={itemName}/>
                            :
                                <div>
                                    <img src={URL.createObjectURL(selectedImage)} alt="Thumb" className="object-fill w-full h-auto float-right"/>
                                </div>
                        }
                        <div className="pt-48">
                            <Button editdialog="md" className="w-full rounded-t-none rounded-b-sm bg-gray-400 " onClick={()=>setEditToggle(!editToggle)}>Edit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <LocationModal open={locationToggle} handle={setLocationToggle} callback={callback_locationModal} selectItems={itemLocation}/>
        <EditModal open={editToggle} handle={setEditToggle} callback={callback_editModal}/>
    </>
}

export default detailsComponent