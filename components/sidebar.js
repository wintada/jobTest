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
                        <Link href="/">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faChartLine} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Dashboard</a>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/items/">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/itemslibrary' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faDrumstickBite} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Items Library</a>
                            </div>
                        </Link>
                    </li>
                    <li>    
                        <Link href="/modifiers">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/modifiers' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Modifiers</a>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cetegories">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/cetegories' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Cetegories</a>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/discounts">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/discounts' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Discounts</a>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/options">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/options' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Options</a>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/units">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/units' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Units</a>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/customattributes">
                            <div className={`space-x-3 pl-4 p-2 rounded drop-shadow-lg ${ currentRoute === '/customattributes' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                                {/* <FontAwesomeIcon className="text-base text-white" icon={faBook} /> */}
                                <a className="self-center text-base whitespace-nowrap text-white">Custom Attributes</a>
                            </div>
                        </Link>
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