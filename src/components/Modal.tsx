import { Link, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import classes from './Modal.module.css';

export interface ModalProps {
  children?: React.ReactNode;
  withCloseButton?: boolean;
}

function Modal({ children, withCloseButton = true }: ModalProps) {
  const navigate = useNavigate();

  function close() {
    navigate('..');
  }

  return (
    <>
      <div className={classes.backdrop} onClick={close}></div>
      <dialog open className={classes.modal}>
        {withCloseButton && (
          <Link className={classes.close} to="..">
            <MdClose size={24} />
          </Link>
        )}
        {children}
      </dialog>
    </>
  );
}

export default Modal;
