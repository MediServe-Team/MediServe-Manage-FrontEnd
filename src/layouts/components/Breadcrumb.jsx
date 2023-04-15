import {GoChevronRight} from 'react-icons/go'

function Breadcrumb ({listTab}) {
    return (
        <div className="flex gap-1">
            {
                listTab.map((tab, index) => {
                    return(
                        <div className='flex items-center' key={index}>
                            <div className="flex border-2 border-gray-400 bg-light_gray rounded-md px-2">
                                <span className='font-medium text-h6'>{tab}</span>
                            </div>
                            {!(index >= listTab.length - 1) && <GoChevronRight/> }
                        </div>
                    )
                }) 
            }
        </div>
    )
 }

 export default Breadcrumb;