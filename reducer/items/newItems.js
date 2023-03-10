import { atom } from 'recoil'
import { v1 } from "uuid"

export const category = atom({
    key: `category/${v1()}`,
    default: [
        { value: "none", label: "none" }, 
        { value: "chicken", label: "chicken" }, 
        { value: "pork", label: "pork" }
    ],
})

export const location = atom({
    key: `location/${v1()}`,
    default: [
        { id: 0, value: "Snocko" }, 
        { id: 'all', value: "Available at all future locations" }, 
    ],
})

export const variations = atom({
    key: `variations/${v1()}`,
    default: [],
})

export const options = atom({
    key: `options/${v1()}`,
    default: [],
})

export const tempOption = atom({
    key: `tempOption/${v1()}`,
    default: [],
})

export const newPageCollections = atom({
    key: `newPageCollections/${v1()}`,
    default: {
        itemName: '',
        category: '',
        description: '',
        location: [],
        options: [],
        variations: [],
        modifier: [],
        attributes: []
    },
})