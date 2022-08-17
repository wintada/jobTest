import _ from "lodash"
import { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

// import { useRecoilState } from 'recoil';
// import { location } from '../../../../reducer/items/newItems'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const editModal = (props) => {
    const optionColor_row1 = ['gray-300','brown-600','orange-600','yellow-300','green-500']
    const optionColor_row2 = ['blue-400','indigo-700','purple-300','pink-300','red-500']
    // const [selectedImage, setselectedImage] = useState()
    const toggleModal = () => props.handle(!props.open)

    const handleChange = (element) => {
        const {id,name,value,files} = element.target
        let output = {type: null, value: ''}
        if(id === 'uploadImage') {
            output.type = 'image'
            output.value = files[0]
        } else if(name === 'colorSelector') {
            output.type = 'color'
            output.value = value
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
            </DialogHeader>
            <DialogBody divider>
                <div className="flex flex-col w-full">
                    <div className="ml-1 mb-3 font-bold text-gray-800">Image</div>
                    <div className="">
                        <header className="w-full border-dashed border border-gray-300 rounded py-3">
                            <label className="pl-3 text-sm">Drag image here, </label>
                            <label className="text-blue-700 cursor-pointer font-semibold text-sm" htmlFor="uploadImage"> upload </label>
                            <input className="no-underline hidden" id="uploadImage" type="file" accept="image/*" name="image" onChange={e=>{handleChange(e)}}/>
                            <label className="text-sm"> or </label>
                            <label className="text-blue-700 cursor-pointer font-semibold text-sm" 
                            // onClick={()=>setImageToggle(!imageToggle)} 
                            >browse image library</label>
                            <input className="no-underline hidden" type="file"/>
                        </header>
                    </div>
                    <div className="mx-3 mb-3">
                        <div className="my-3 font-bold text-gray-800">Recommended colors</div>
                        <div className="flex w-max gap-4">
                            {
                                optionColor_row1.map((item, idx) => {
                                    return <div key={idx}>
                                        <Button className={"h-12 w-12 bg-" + item} value={item} name="colorSelector" onClick={(e)=>{handleChange(e)}}>{""}</Button>
                                    </div> 
                                })
                            }
                        </div>
                        <div className="flex w-max gap-4 pt-3">
                            {
                                optionColor_row2.map((item, idx) => {
                                    return <div key={idx}>
                                        <Button className={"h-12 w-12 bg-" + item} value={item} name="colorSelector" onClick={(e)=>{handleChange(e)}}>{""}</Button>
                                    </div> 
                                })
                            }
                        </div>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    </>
}

export default editModal