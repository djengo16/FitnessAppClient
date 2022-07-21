import PrimarySmallBtn from '../../components/button/PrimarySmallBtn'
import tableStyles from '../../styles/table.module.css';
import headingStyles from '../../styles/headings.module.css'
import styles from './admin.module.css'
import Table from '../../components/table/Table';
import { Fragment, useEffect, useState } from 'react';
import { getAllExercises } from '../../utils/services/exerciseServices';
import {DATA_PER_PAGE, UNSAVED_CHANGES_MESSAGE} from '../../utils/constants'
import Pagination from '../../components/pagination/Pagination';
import SearchBar from '../../components/searchbar/SearchBar';
import { Modal } from '../../components/modal/Modal';
import { ConfirmModal } from '../../components/modal/ConfirmModal';

function Admin(){
    const [exercises, setExercises] = useState([]);
    const dataCountPerPage = DATA_PER_PAGE;
    const [refresh, setRefresh] = useState(0);
    const [searchParams, setSearchParams] = useState('');
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalExercises, setTotalExercises] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    

    useEffect(() => {
        console.log('exercise useeff')
        getAllExercises(searchParams, currentPage, dataCountPerPage)
        .then(response => {
           setExercises(response.data.exercises);
           setTotalExercises(response.data.pagesCount)
        });
    }, [currentPage, searchParams]);

    const openModal = () => {
        setShowModal(true);
    }
    const hideModal = () => {
        if(showConfirmModal){
            hideConfirmModal();
        }
        setShowModal(false);
    }
    const openConfirmModal = () => {
        setShowConfirmModal(true);
    }
    const hideConfirmModal = () => {
        setShowConfirmModal(false);
    }

    const tableColumnsInfo = [{
        title: 'ID',
        field: 'id',
        type: 'cell',
        width: '100px'
       },{
        title: 'Exercise Name',
        field: 'name',
        type: 'cell',
        width: '500px'
       },{
        title: 'Muscle group',
        field: 'muscleGroup',
        type: 'cell',
        width: '450px'
       },{
        title: 'Action',
        field: 'action',
        dataField: 'id',
        action: 'createEditExerciseBtn', 
        type: 'button',
        width: '450px'
       }];
       const actions = {
        createEditExerciseBtn: () => 
        <PrimarySmallBtn action={openModal} content='Edit'/>
       }
       const handleSearchParams = (e) => {
        e.preventDefault();
        if(enteredSearchParams.trim() !== ''){
            setCurrentPage(1);
            //this will trigger child's useffect and then will set curr page to 1
            setRefresh(prev => prev + 1);
            setSearchParams(enteredSearchParams);
        }
    }
       const paginate = pageNumber => setCurrentPage(pageNumber);
return (
    <Fragment>
        {showModal
         && 
        <Modal onConfirm={hideModal} onCancel={openConfirmModal} />}
        {showConfirmModal 
        && 
        <ConfirmModal onConfirm={hideModal} onCancel={hideConfirmModal} message={UNSAVED_CHANGES_MESSAGE}/>}
        <div className={styles['admin-page']}>
            <h4 className={`${headingStyles['page-title']} ${styles['admin-page-title']}`}>Admin Panel</h4>
            
            <nav className={styles['admin-page-nav']}>
                <div className='d-flex justify-content-between'>
                    <ul className={`${styles['admin-ul']} d-flex align-items-center`}>
                        <li>Exercises</li>
                        <li> Other</li>
                    </ul>
                    <SearchBar 
                    placeholder={'Find Exercise'}
                    setEnteredSearchParams={setEnteredSearchParams} 
                    handleSearchParams={handleSearchParams}/>
                </div>
                </nav>
                <div id="exercises">
                <div className={tableStyles.scrollable}>
                    <Table data={exercises} columns={tableColumnsInfo} actions={actions}/>
               </div>
               <Pagination
                dataPerPage={10}
                totalData={totalExercises}
                paginate={paginate}
                refresh={refresh}
          />
                </div>
        </div>
    </Fragment>
)
}
export default Admin;