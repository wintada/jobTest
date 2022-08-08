import { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app.js'
import { Alert,Button,Card,CardHeader,CardBody,CardFooter,Typography,Input,IconButton,Dialog,DialogHeader,DialogBody,DialogFooter,Textarea,Select,Option } from "@material-tailwind/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import useWindowDimensions from '../function/useWindowDimensions'
import { size } from '@material-tailwind/react/types/components/avatar';

interface items {
  name: string;
}

let addNameItems: items

const tempArray = [{name: 'x1'},{name: 'x2'},{name: 'x3'},{name: 'x4'},{name: 'x5'},{name: 'x6'},
{name: 'x1'},{name: 'x1'},{name: 'x1'},{name: 'x1'},{name: 'x1'},
{name: 'x1'},{name: 'x1'},{name: 'x1'},{name: 'x1'},{name: 'x1'}
]

// const checkDimensions: useWindowDimensions = dynamic(
//   () => {
//     return import("../function/useWindowDimensions");
//   },
//   { ssr: false }
// );

// const useWindowDimensions = dynamic((): any => import('../function/useWindowDimensions').then((module) => console.log(module)), {ssr: false})

const Page: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');
  const [itemsInfo, setItemsInfo] = useState(addNameItems);

  const {width, height} = useWindowDimensions()
  // useEffect(() => {
  //   console.log('itemsInfo: ',itemsInfo)
  // }, [itemsInfo])

  useEffect(() => {
    console.log('screen: ', width, height)
  }, [width || height])
  
  const genItemsList: any = (data: object[]) => {
    return data.map((item: object, idx: number) => {
      return <Card className={`${idx === 0 ? 'mt-4 ml-4' : ''} w-32 h-32 overflow-hidden`} onClick={()=>handleOpenEditor(item ,idx.toString())} key={idx}>
          <div className="bg-gray-400 grow-[3]">

          </div>
          <div className="flex overflow-hidden justify-center items-center grow-[1]">
            {idx}
          </div>
        </Card>
    })
  } 

  const handleOpen = () => {setOpen(!open); clearInfo()};
  const handleOpenEditor = (data: object, idx: string) => {   
    setOpen(!open)

    let raw = {
      name: ''
    }

    raw.name = idx
    console.log('raw: ', raw)
    setItemsInfo(raw)

    //clear
    // clearInfo()
  }

  const clearInfo = () => {
    setItemsInfo(addNameItems)
  }

  const setDialogSize = (): size => {
    let size: number = width || 0

    if(size >= 1200) { 
      return "md"
    } else if(size >= 960) {
      return "lg"
    } else {
      return "xxl"
    }
  }

  return <>
    <div className="flex flex-col h-full p-5 bg-gray-50">
      <div className="w-full">
        <div className="grow-0">
          <Alert className="bg-gray-400 text-gray-800">Items</Alert>
        </div>
        <div className="flex items-center space-x-2 p-3">
            <div className="">
              <Input size="md" label="Search Items" />
            </div>
            <IconButton size="sm" onClick={() => handleOpen()}>
              <FontAwesomeIcon className="text-base text-white" icon={faPlus} />
            </IconButton>
        </div>
      </div>
      <div className="grow overflow-hidden scroll">
        <div className="h-full w-full bg-gray-200 overflow-scroll justify-around rounded-lg">
          <div className="flex flex-row flex-wrap flex-row content-start justify-start space-x-4 space-y-4 pr-4 pb-4">
            {genItemsList(tempArray)}
          </div>
        </div>
      </div>
    </div>

    {/* Dialog */}
    <Dialog open={open} handler={handleOpen} size={setDialogSize()}>
      <DialogHeader>
        <div>
          {typeof itemsInfo !== 'undefined' ? itemsInfo.name : 'Create New Item.'}
        </div>
      </DialogHeader>
        <DialogBody divider>
          <div className="w-full">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Detail</h1>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-row">
                <div className="space-y-3 pr-3 grow-[3]">
                  <Input label="item name" />
                  <Input label="Price" type="number"/>
                  <Select label="Select Version">
                    <Option>a1</Option>
                    <Option>b1</Option>
                    <Option>c1</Option>
                    <Option>d1</Option>
                    <Option>e1</Option>
                  </Select>
                </div>
                <div className="grow-[1]">
                  <div className="max-w-xl">
                    <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="font-medium text-gray-600">
                          Drop files to Attach, or
                          <span className="text-blue-600 underline">browse</span>
                        </span>
                      </span>
                      <input type="file" name="file_upload" className="hidden"/>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <Textarea label="Description" />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
          <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
    </Dialog>
  </>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{ page }</Layout>
  )
}

export default Page

// import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'

// const itemsPage: NextPage = () => {
//     return (
//         <div className="bg-indigo">
//              items Page
//         </div>
//     )
// }

// export default itemsPage