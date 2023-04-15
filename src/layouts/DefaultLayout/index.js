import Header from '../components/Header.jsx';
import SiderBar from '../components/SideBar.jsx';

function DefaultLayout ({children}) {
    return (
        <div className='flex gap-5 p-5 bg-gradient-to-tl from-[#CED9D9] via-[#75ABD2] to-[#CED9D9] w-[100vw] h-[100vh]'>
            <div className='w-1/5'>
                <SiderBar/>
            </div>
            <div className='w-4/5'>
                <Header/>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;