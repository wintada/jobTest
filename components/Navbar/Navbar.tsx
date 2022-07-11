import Link from "next/link";
import React from "react";

interface transparent {
  transparent: boolean
}

const Navbar = (props: transparent) => {

  console.log(props)

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/login">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                React + Nextjs Typescript
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar