import _ from "lodash"
import styled from "styled-components"
import React, { useState, useCallback, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { Button, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX ,faEllipsis} from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil'
import { options } from '../../../../reducer/items/newItems'

import { SortableHandle, SortableContainer, SortableElement } from "react-sortable-hoc"
import arrayMove from "../../../../components/arrayMove"

const mock_options = [
    {id: 0, name: 'size', option: ['S','M','L']},
    {id: 1, name: 'color', option: ['Red','Green','Blue']},
    {id: 2, name: 'sex', option: ['Male','Female']}
]

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
        width: 700px;
    }
  }
`
const RowHandler = SortableHandle((props) => <div className="flex justify-center items-center w-10 handle">
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
    return <TrWrapper>
            <td className="w-full">
                <div className="flex flex-row items-center p-2 mt-1 rounded bg-gray-100">
                    <RowHandler/>
                    <div className="w-full pl-2">
                        {/* <Input className="bg-gray-50" label="option" value={first}/> */}
                        <input className="w-full rounded-lg px-3 py-2 focus:outline-blue-400" placeholder="Add option" defaultValue={value}/>
                    </div>
                    <div className="">
                        <Button className='p-1 ml-2 hover:bg-transparent' variant="text" size="sm" onClick={()=>{props.removeItem(value)}}>
                            <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                        </Button>
                    </div>
                </div>
            </td>
        </TrWrapper>
})

const noderef = React.createRef(null)
const selectOption = React.createRef(null)
const newItem = React.createRef(null)
const addOptionsModal = (props) => {
    const [optionsAtom, setOptionsAtom] = useRecoilState(options)
    const [optionsSet, setOptionsSet] = useState([])
    const [optionName, setOptionName] = useState()
    const [optionList, setOptionList] = useState([])

    const toggleModal = () => props.handle(!props.open)

    useEffect(() => {
        if(props.open) {
            const { name, option } = props.backupOptionsData
            if(name !== undefined && option!== undefined) {
                setOptionName(name)
                setOptionList(option)
            }
        } else {
            setOptionName()
            setOptionList([])
        }
    }, [props.open])

    useEffect(() => {
        let obj = {}
        let arr = _.cloneDeep([...optionsAtom])
        obj = arr.find(x => x.name === optionName)
        setOptionList(obj !== undefined ? obj.option : [])
    }, [optionName])

    useEffect(() => {
        let output = []
        let arr = _.cloneDeep([...optionsAtom])
        arr.map((item,idx) => {output.push({value: item.name, label: item.name})})
        setOptionsSet(output)
    }, [optionsAtom])
    
    // Table Draggable Rows
    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setOptionList(oldItems => arrayMove(oldItems, oldIndex, newIndex))
    }, [])
    // Table Draggable Rows

    const addNewItems = (element) => {
        const { value } = element
        let arr = _.cloneDeep([...optionList])
        arr.push(value)
        setOptionList(arr)
        newItem.clearValue()
    } 

    const removeItem = (value) => {
        let arr = _.cloneDeep([...optionList])
        const index = arr.indexOf(value)
        if (index > -1) arr.splice(index, 1)
        setOptionList(arr)
    }

    return <>
        <Dialog className="overflow-visible" open={props.open} handler={()=>toggleModal()}>
            <DialogHeader className='flex justify-between'>
                <div>
                    <Button className='bg-gray-200' variant="text" onClick={()=>toggleModal()}>
                        <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                    </Button>
                </div>
                <div>Add options</div>
                <div className="w-16"/>
            </DialogHeader>
            <DialogBody className="overflow-scroll" style={{maxHeight: '75vh'}} divider>
                <div className="px-2">
                    <div className="text-gray-800">Create option sets to group options. For example, a set called “Primary Color” may contain Black and White options.</div>
                    <div className={`flex flex-row items-center border-y-2 p-3 bg-gray-200 ${optionName ? 'mt-2 rounded-t-lg' : 'my-2 rounded'}`}>
                        <div className="grow-0 w-40">
                            <div className="grow-0 pl-2 text-gray-700 font-bold">Option set name</div>
                        </div>
                        <div className="grow">
                            <CreatableSelect ref={selectOption} placeholder="Search" options={optionsSet} onChange={e=>setOptionName(e.value)} value={{value: optionName, label: optionName}}/>
                        </div>
                    </div>
                    {
                        optionName && (
                            <div>
                                <div className="flex flex-row items-center border-y-2 p-3 mb-2 rounded-b-lg bg-gray-200">
                                    <div className="grow-0 w-40">
                                        <div className="grow-0 pl-2 text-gray-700 font-bold">Display name</div>
                                    </div>
                                    <div className="grow">
                                        <Input className="bg-gray-50 disabled:bg-gray-50" placeholder="Display" defaultValue={optionName} onChange={()=>{}} disabled/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="bg-gray-200 rounded overflow-visible p-2">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <div className={`flex items-center rounded bg-gray-100 pl-5 mb-1 h-12 text-gray-600 text-left ${optionName ? 'px-2' : 'pr-2'}`}>
                                            {optionName} option
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <SortableCont
                                onSortEnd={onSortEnd}
                                axis="y"
                                lockAxis="y"
                                lockToContainerEdges={true}
                                lockOffset={["30%", "50%"]}
                                helperClass="helperContainerClass"
                                useDragHandle={true}
                            >
                                {optionList.map((item, index) => (
                                    <SortableItem
                                        key={`item-${index}`}
                                        index={index}
                                        value={item}
                                        removeItem={removeItem}
                                    />
                                ))}
                                <tr>
                                    <td>
                                        <div className="flex flex-row p-2 mt-2 rounded bg-gray-100">
                                            <RowHandler iconDisabled={true}/>
                                            <div className="w-full pl-2" disabled>
                                                {/* <Input className="bg-gray-50" value={''} label="Add option" disabled={optionName ? false : true}/> */}
                                                <CreatableSelect ref={newItem} placeholder="Add option" onChange={e=>addNewItems(e)} isDisabled={optionName ? false : true}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </SortableCont>
                        </table>
                    </div>
                    <div className="m-2 opacity-0">dummy</div>
                </div>
            </DialogBody>
            <DialogFooter>
                <div className="text-right">
                    <Button className="" disabled={optionName && optionList.length > 0 ? false : true} onClick={()=>props.callback({name: optionName, option: optionList})}>
                        Next
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>
    </>
}

export default addOptionsModal