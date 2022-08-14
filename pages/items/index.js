import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const itemsList = (props) => {
    const mock_data = [
        {id: 0,item: 'a',sku: 'a',cetegory: 'a',locations: 'a',soldby: 'a',stock: 'a',price: 'a'},
        {id: 1,item: 'b',sku: 'b',cetegory: 'b',locations: 'b',soldby: 'b',stock: 'b',price: 'b'},
        {id: 2,item: 'c',sku: 'c',cetegory: 'c',locations: 'c',soldby: 'c',stock: 'c',price: 'c'},
    ]
    const [list_headerColumn, setList_headerColumn] = useState([
        {id: 0,name: 'Item',open: true},
        {id: 1,name: 'SKU',open: true},
        {id: 2,name: 'Cetegory',open: true},
        {id: 3,name: 'Locations',open: true},
        {id: 4,name: 'Sold by',open: true},
        {id: 5,name: 'Stock',open: true},
        {id: 6,name: 'Price',open: true},
    ])

    return <>
        <div className='flex flex-col w-full h-full'>
            <div className='flex flex-row items-center p-2 grow-0'>
                <div className="grow">
                    <div className='w-72'>
                        <Input size="lg" label="Search" />
                    </div>
                </div>
                <div className="grow-0 space-x-2">
                    <Link href="/items/new"><Button>Create an Item</Button></Link>
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
    </>
}

export default itemsList
