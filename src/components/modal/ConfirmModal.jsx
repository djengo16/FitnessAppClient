import { Fragment } from 'react';
import DangerBtn from '../button/DangerBtn';
import PrimaryBtn from '../button/PrimaryBtn';
import CloseBtn from '../close/CloseBtn';
import styles from './modal.module.css'


function ConfirmBackdrop (props) {
    return <div className={`${styles.backdrop} ${styles['modal-confirm-backdrop']}`} onClick={props.onConfirm} />;
};

function ConfirmModal(props){
return (
<Fragment>
    <ConfirmBackdrop onConfirm={props.onConfirm}/>
    <div className={styles['confirm-modal']}>
        <header className='d-flex justify-content-between'>
            <label className={`${styles['modal-exiting-label']} align-self-start`}>Exiting!</label>
            <CloseBtn onClick={props.onCancel}/>
          </header>
          <main className={styles['modal-confirm-main']}>
            <p className={styles['modal-message']}>{props.message}</p>
          </main>
          <footer className='d-flex justify-content-between align-items-end' >
            <PrimaryBtn action={props.onConfirm} content='Yes'/>
            <DangerBtn action={props.onCancel} content='No'/>
          </footer>
    </div>
</Fragment>
)
}
export {ConfirmModal};