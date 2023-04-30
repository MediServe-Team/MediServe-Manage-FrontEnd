import Header from '../components/Header.jsx';
import SiderBar from '../components/SideBar.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import SliderCarousel from '../components/SliderCarousel.jsx';
import { SLIDER_CONTENT } from '../../constants/sliderContent.js';

function DefaultLayout({ children }) {
  return (
    <div className="flex gap-5 p-5 bg-gradient-to-tl from-[#CED9D9] via-[#75ABD2] to-[#CED9D9] w-[100vw] h-[100vh]">
      <SiderBar />

      <div className="flex-1 min-w-0">
        <Header />
        <div className="my-2 flex gap-3">
          <Breadcrumb listTab={['Home', 'Medicine']} />
          <SliderCarousel contents={SLIDER_CONTENT} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
