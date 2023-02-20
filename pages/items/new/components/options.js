import styled from "styled-components"
import React, { useState, useCallback } from "react";
import CreatableSelect from "react-select/creatable";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX ,faEllipsis} from '@fortawesome/free-solid-svg-icons'


import { useRecoilState } from 'recoil';
import { options, newPageCollections } from '../../../../reducer/items/newItems'

import OptionsModal from "./optionModal";
import CreateVariationsModal from "./createVariationsModal";

import { SortableHandle, SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from "../../../../components/arrayMove"

const TrWrapper = styled.tr`
  cursor: default;

  &.helperContainerClass {
    z-index: 9999;
    width: 1000px !important;
    // border: 1px solid #efefef;
    // box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
    // background-color: rgba(255, 255, 255, 0.9);
    // border-radius: 3px;

    &:active {
      cursor: grabbing;
    }

    & > td {
        width: 100vw;
    }
  }
`

const RowHandler = SortableHandle((props) => <div className="flex justify-center grow-0 w-20 items-center handle">
        {
            props.iconDisabled
            ? <></>
            : <FontAwesomeIcon className="text-center text-gray-500" icon={faEllipsis}/>
        }
    </div>
)

const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>
})
const SortableItem = SortableElement(props => {
    const { index,value } = props
    return <>
        <TrWrapper>
            <td className="w-full">
                <div className="flex flex-row items-center p-2 border-b-2 hover:bg-light-blue-50">
                    <RowHandler />
                    <div className="flex grow pl-2 text-left">
                        <div className="w-1/3">{value.name}</div>
                        <div>
                            {
                                value.option.map((item,idx) => {
                                    return (idx !== 0 ? '/' : '') + item
                                })
                            }
                        </div>
                    </div>
                    <div className="grow-0 w-20 text-blue-300" onClick={()=>props.editToggle()}>
                        Edit
                    </div>
                    <div className="grow-0 w-10">
                        <Button className='p-1 ml-2 hover:bg-transparent' variant="text" size="sm" onClick={()=>{props.removeItem(value)}}>
                            <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                        </Button>
                    </div>
                </div>
            </td>
        </TrWrapper>
    </>
})

const optionsComponent = (props) => {
    const [collections, setCollections] = useRecoilState(newPageCollections)
    const [optionsAtom, setOptionsAtom] = useRecoilState(options)
    
    const [createVariationsToggle, setCreateVariationsToggle] = useState(false)
    
    const [optionsToggle, setOptionsToggle] = useState(false)
    const [optionsModalMode, setOptionsModalMode] = useState('Add')
    
    const [backupOptionsData, setBackupOptionsData] = useState({})
    const [option_rawdata, setOption_rawdata] = useState([])
    // const [recentlyOption, setRecentlyOption] = useState()

    const callback_optionModal = (response) => {
        let updated = false
        let arr = _.cloneDeep({...collections})
        arr.options.map(item => {
            if(item.name === response.name) {
                item.option = response.option
                updated = true
            }
        })
        if(!updated) arr.options.push({name: response.name, option: response.option})

        console.log("callback_optionModal", arr.options)
        setOption_rawdata(arr.options)
        setBackupOptionsData(response)
        setOptionsToggle(!optionsToggle)
        setCreateVariationsToggle(!createVariationsToggle)
    }

    const callback_createVariationsModal = (response) => {
        let arr = _.cloneDeep({...collections})
        arr.options = option_rawdata
        arr.variations = response
        setCollections(arr)
        setCreateVariationsToggle(!createVariationsToggle)
    }

    const backstep = () => {
        setCreateVariationsToggle(!createVariationsToggle)
        setOptionsToggle(!optionsToggle)
    }

    const editToggle = () => {
        setOptionsModalMode('Edit')
        setOptionsToggle(!optionsToggle)
    }

    const removeItem = () => {

    }

    // Table Draggable Rows
    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setOptionList(oldItems => arrayMove(oldItems, oldIndex, newIndex))
    }, [])
    // Table Draggable Rows

    return <>
        {console.log('options page', collections.options)}
        <div className="mb-7">
            <div className="mb-7">
                <div className='border-b-2 pb-2 font-bold text-gray-800 text-lg'>Options</div>
                <div className="p-2">
                    <div className="text-lg text-gray-800">
                        add a custom set of options to an item to create variations. For
                        example, a size option set can create<br></br>
                        variations small, medium, and large.
                    </div>
                    {
                        collections.options.length > 0 
                        ?
                            <table className="w-full">
                                <SortableCont
                                    onSortEnd={onSortEnd}
                                    axis="y"
                                    lockAxis="y"
                                    lockToContainerEdges={true}
                                    lockOffset={["30%", "50%"]}
                                    helperClass="helperContainerClass"
                                    useDragHandle={true}
                                >
                                    {collections.options.map((item, index) => (
                                        <SortableItem
                                            key={`item-${index}`}
                                            index={index}
                                            value={item}
                                            removeItem={removeItem}
                                            editToggle={editToggle}
                                        />
                                    ))}
                                </SortableCont>
                            </table>
                        : 
                            <></>
                    }
                    <div className="flex pt-5 justify-center">
                        <Button className="w-5/6 bg-gray-200 border-gray-50 text-indigo-500" variant="outlined" onClick={()=>{
                            setBackupOptionsData({})
                            setOptionsModalMode('Add')
                            setOptionsToggle(!optionsToggle)
                        }}>
                            Add Options
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <OptionsModal open={optionsToggle} handle={setOptionsToggle} backupOptionsData={backupOptionsData} mode={optionsModalMode} callback={callback_optionModal}/>
        <CreateVariationsModal open={createVariationsToggle} handle={setCreateVariationsToggle} backstep={backstep} rawdata={option_rawdata} callback={callback_createVariationsModal}/>
    </>
}

export default optionsComponent