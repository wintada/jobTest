import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import DetailsComponent from "./components/details";
import OptionsComponent from './components/options';
import Modifier from './components/Modifier';
import VariationsComponent from "./components/variations";
import CustomAttributes from './components/customAttributes';
import { Button, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

import { useRecoilState, useResetRecoilState } from 'recoil';
import { variations,options,newPageCollections } from '../../../reducer/items/newItems'

const newItems = (props) => {
    const mock_options = [{name: 'size', option: ['S','M','L']},{name: 'color', option: ['Red','Green','Blue']},{name: 'sex', option: ['Male','Female']}]

    const router = useRouter()
    const resetCollections = useResetRecoilState(newPageCollections)
    const [collections, setCollections] = useRecoilState(newPageCollections)
    const [variationsItems, setVariationsItems] = useRecoilState(variations)
    // const [generalItems, setGeneralItems] = useRecoilState(general)
    const [optionsItems, setOptionItems] = useRecoilState(options)

    // const [variationsData, setVariationsData] = useState([])
    // const [optionData, setOptionData] = useState([])

    useEffect(() => {
        resetCollections()
    }, [])

    const submit = () => {
        console.log('submit', collections)
        router.push({pathname: '/items'}, undefined, { shallow: true })
    }

    return <>
        <Dialog open={true} size="xxl">
            <DialogHeader className='flex justify-between'>
                <div>
                    <Link href="/items">
                        <Button className='bg-gray-200' variant="text">
                            <FontAwesomeIcon className="text-base text-gray-500" icon={faX} />
                        </Button>
                    </Link>
                </div>
                <div>Create an Item</div>
                <div className='space-x-2'>
                    <Button onClick={()=>console.log(collections)}>Log</Button>
                    <Button onClick={()=>setOptionItems(mock_options)}>Mock Options</Button>
                    <Button onClick={()=>submit()}>Save</Button>
                </div>
            </DialogHeader>
            <DialogBody className='overflow-scroll'>
                <div className="container mx-auto border-b-5">
                    <DetailsComponent />
                    <OptionsComponent />
                    <VariationsComponent />
                    <Modifier />
                    <CustomAttributes />
                    <div className="m-2 opacity-0">dummy</div>
                </div>
            </DialogBody>
        </Dialog>
    </>
}

export default newItems
