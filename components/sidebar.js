// import type { ReactElement } from 'react'
// import { Next } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDrumstickBite, faChartLine, faBook } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const [currentRoute, setCurrentRoute] = useState()
    const router = useRouter()

    useEffect(() => {
        setCurrentRoute(router.route)
    }, [router])
    
    return <>
        <aside className="w-60" aria-label="Sidebar">
            <div className="overflow-y-auto py-2 px-3 bg-gray-800 h-full shadow-xl">
                <ul className="space-y-3">
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faChartLine} /> */}
                            <Link href="/">
                                <a className="self-center text-base whitespace-nowrap text-white">Dashboard</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/itemslibrary' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faDrumstickBite} /> */}
                            <Link href="/itemslibrary">
                                <a className="self-center text-base whitespace-nowrap text-white">Items Library</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/modifiers' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                            <Link href="/modifiers">
                                <a className="self-center text-base whitespace-nowrap text-white">Modifiers</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/cetegories' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                            <Link href="/cetegories">
                                <a className="self-center text-base whitespace-nowrap text-white">Cetegories</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/discounts' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                            <Link href="/discounts">
                                <a className="self-center text-base whitespace-nowrap text-white">Discounts</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/options' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                            <Link href="/options">
                                <a className="self-center text-base whitespace-nowrap text-white">Options</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/units' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                            <Link href="/units">
                                <a className="self-center text-base whitespace-nowrap text-white">Units</a>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/customattributes' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                            {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                            <Link href="/customattributes">
                                <a className="self-center text-base whitespace-nowrap text-white">Custom Attributes</a>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    </>
}

export default Sidebar

// import { Button } from "@material-tailwind/react";
// import Link from 'next/link'

// const sidebar = () => {
//     return <>
//         <aside className="w-64" aria-label="Sidebar">
//             <div className="overflow-y-auto py-4 px-3 bg-gray-800 h-full">
//                 <ul className="space-y-2">
//                     <li>
//                         <Link href="/">
//                             <a className="self-center text-base whitespace-nowrap text-white">Dashboard</a>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/items">
//                             <a className="self-center text-base whitespace-nowrap text-white">Items</a>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/tables">
//                             <a className="self-center text-base whitespace-nowrap text-white">Tables</a>
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </aside>
//     </>
// }

// export default sidebar