import Link from 'next/link'

const navbar = () => {
    return <>
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-900 shadow-xl">
            <div className="container flex flex-wrap justify-between items-center mx-2">
                <Link href="/">
                    <a className="self-center text-xl font-semibold whitespace-nowrap text-white">restanet</a>
                </Link>
            </div>
        </nav>
    </>
}

export default navbar