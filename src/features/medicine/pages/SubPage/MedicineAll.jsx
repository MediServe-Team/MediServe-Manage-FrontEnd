import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MedicineItem } from '../../components';
import { Pagination } from '../../../../components';

const overlay = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
};

const modal = {
  hidden: {
    x: 600,
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
    },
  },
  exit: {
    x: 600,
    transition: {
      duration: 0.7,
    },
  },
};

function MedicineAll() {
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);

  const handleClickOutSide = (event) => {
    if (event.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg px-5 py-3 min-h-0 relative overflow-hidden">
      <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-10 pb-[60px] overflow-y-auto">
        <MedicineItem onclick={() => setIsOpen(!isOpen)} />
        <MedicineItem onclick={() => setIsOpen(!isOpen)} />
        <MedicineItem onclick={() => setIsOpen(!isOpen)} />
        <MedicineItem onclick={() => setIsOpen(!isOpen)} />
        <MedicineItem onclick={() => setIsOpen(!isOpen)} />
        <MedicineItem onclick={() => setIsOpen(!isOpen)} />
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center relative">
        <div className="absolute -top-[50px] bg-white p-2 rounded-lg shadow-[0px_2px_14px_3px_rgba(0,0,0,0.15)]">
          <Pagination pageLength={7} pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      </div>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            variants={overlay}
            initial={'hidden'}
            animate={'visible'}
            exit={'exit'}
            className="absolute w-full h-full top-0 left-0 bg-black/20 "
            onClick={handleClickOutSide}
            ref={overlayRef}
          >
            {/* modal section */}
            <motion.div
              key="modal"
              variants={modal}
              className="bg-white h-full w-2/3 absolute right-0 rounded-lg min-h-0"
            >
              <div className="h-2/5 relative flex justify-center">
                <img
                  src="https://intriphat.com/wp-content/uploads/2021/07/mau-hop-thuoc-dep-5.jpg"
                  alt=""
                  className="h-full object-contain"
                />
                <button onClick={() => setIsOpen(!isOpen)} className="absolute top-2 right-3">
                  Close
                </button>
              </div>

              <div className="px-5 py-3 flex flex-col gap-5 flex-1 min-h-0">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-h4 text-black font-bold">Levothyroxine (Viên)</h3>
                    <p className="text-h5 text-text_blur">hộp 4 vĩ x 20 viên</p>
                    <p className="text-text_primary">
                      Mã thuốc: <span className="font-medium text-black">MsWD36</span>
                    </p>
                  </div>
                  {/* mã vạch */}
                  {/* <img src="" alt="" /> */}
                  <div className="w-[120px] h-[50px] bg-black"></div>
                </div>
                {/* grid */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="grid grid-cols-3 grid-rows-3 gap-1">
                    <p className="text-text_primary">
                      Số đăng ký: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Mã hoạt chất: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Mã đường dùng: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Dạng bào chế: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Tên hoạt chất: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Tên đường dùng: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Hàm lượng: <span className="font-medium text-black">MsWD36</span>
                    </p>
                    <p className="text-text_primary">
                      Dạng bào chế: <span className="font-medium text-black">MsWD36</span>
                    </p>
                  </div>

                  <div className="min-h-0">
                    <h3 className="text-blue_dark font-bold text-h5">Chức năng</h3>
                    <ul className="pl-5">
                      <li>Hướng dẫn sử dụng thuốc</li>
                      <li>Hướng dẫn sử dụng thuốc</li>
                      <li>Hướng dẫn sử dụng thuốc</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MedicineAll;
