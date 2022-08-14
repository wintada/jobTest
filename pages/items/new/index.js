import Link from 'next/link'
import { useRouter } from 'next/router'

import VariationsComponent from "./components/variations";
import DetailsComponent from "./components/details";
import { Button, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

import { useRecoilState } from 'recoil';
import { variations,options,general } from '../../../reducer/items/newItems'

const newItems = (props) => {
    const mock_options = [{name: 'size', option: ['S','M','L']},{name: 'color', option: ['Red','Green','Blue']},{name: 'sex', option: ['Male','Female']}]

    const router = useRouter()
    const [generalItems, setGeneralItems] = useRecoilState(general)
    const [optionsItems, setOptionItems] = useRecoilState(options)
    const [variationsItems, setVariationsItems] = useRecoilState(variations)

    const submit = () => {
        router.push({pathname: '/items'}, undefined, { shallow: true })
        // console.log('submit', variationsItems)
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
                    <Button onClick={()=>setOptionItems(mock_options)}>Mock Variations</Button>
                    <Button onClick={()=>submit()}>Save</Button>
                </div>
            </DialogHeader>
            <DialogBody className='overflow-scroll'>
                <div className="container mx-auto border-b-5">
                    <DetailsComponent />
                    <VariationsComponent />
                </div>
            </DialogBody>
        </Dialog>
    </>
}

export default newItems
