import { motion, AnimatePresence } from 'framer-motion';

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
    y: -600,
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.8,
      bounce: 0.6,
    },
  },
  exit: {
    y: -600,
    transition: {
      duration: 0.4,
    },
  },
};

function Modal({ showModal, children }) {
  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-[1000]">
          {/* Overlay */}
          <motion.div
            variants={overlay}
            initial={'hidden'}
            animate={'visible'}
            exit={'exit'}
            className="w-full h-full bg-black/30 flex"
          >
            <motion.div variants={modal} className="bg-white rounded-lg p-5 m-auto min-w-[300px] shadow-lg">
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
