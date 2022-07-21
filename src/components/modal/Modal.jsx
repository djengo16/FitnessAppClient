import { Fragment } from 'react';
import DangerBtn from '../button/DangerBtn';
import PrimaryBtn from '../button/PrimaryBtn';
import CloseBtn from '../close/CloseBtn';
import styles from './modal.module.css'


function Backdrop (props) {
    return <div className={`${styles.backdrop} ${styles['modal-backdrop']}`} onClick={props.onConfirm} />;
};

function Modal(props){
return (
<Fragment>
    <Backdrop onConfirm={props.onConfirm}/>
    <div className={styles.modal}>
        <header>
            <h2>Some header</h2>
            <CloseBtn onClick={props.onConfirm}/>
          </header>
          <main className={styles['modal-main']}>
            <p>some content..</p>
          </main>
          <footer className='d-flex justify-content-between' >
            <PrimaryBtn action={props.onConfirm} content='Save'/>
            <DangerBtn action={props.onCancel} content='Cancel'/>
          </footer>
    </div>
</Fragment>
)
}
export {Modal};