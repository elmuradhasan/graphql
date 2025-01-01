import React from 'react'
import { HashLoader } from "react-spinners";

function FullPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <HashLoader/>
      <h1 className='mt-10 text-4xl'>Elmurad Həsənov</h1>
    </div>
  )
}

export default FullPage
