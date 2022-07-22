/* eslint-disable react-hooks/exhaustive-deps */
import PrimarySmallBtn from '../../components/button/PrimarySmallBtn'
import tableStyles from '../../styles/table.module.css';
import headingStyles from '../../styles/headings.module.css'
import styles from './admin.module.css'
import Table from '../../components/table/Table';
import { Fragment, useEffect, useState } from 'react';
import { getAllExercises } from '../../utils/services/exerciseServices';
import {DATA_PER_PAGE, HEALTHY_STATUS, UNSAVED_CHANGES_MESSAGE} from '../../utils/constants'
import Pagination from '../../components/pagination/Pagination';
import SearchBar from '../../components/searchbar/SearchBar';
import { Modal } from '../../components/modal/Modal';
import { ConfirmModal } from '../../components/modal/ConfirmModal';
import { getAppHelath } from '../../utils/services/apiService';
import DangerSamllBtn from '../../components/button/DangerSmallBtn';

function Admin(){
    const navItems = {
        exercises: 'exercises',
        other: 'other',
    }

    const [exercises, setExercises] = useState([]);
    const dataCountPerPage = DATA_PER_PAGE;
    const [refresh, setRefresh] = useState(0);
    const [searchParams, setSearchParams] = useState('');
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalExercises, setTotalExercises] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [apiStatus, setApiStatus] = useState('');
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [selectedNavItem, setSelectedNavItem] = useState('');

    /* First mounting of the component triggers api call to health check endpoint and
    gets info if the App is Healthy or not, after that it does the same check every 
    10 minutes and updates the current status.
    We have this first render check here because of setInteral, which
    code will execute after 10 minutes for the first time, but we
    need this status info at the moment we open admin page.
    */
    useEffect(() => {
        getAllExercises(searchParams, currentPage, dataCountPerPage)
        .then(response => {
           setExercises(response.data.exercises);
           setTotalExercises(response.data.pagesCount)
        });
        if(isFirstRender){
            setSelectedNavItem(navItems.exercises);
            checkApiStatus();
            setIsFirstRender(false);
        }
        /* 1000 miliseconds * 60 seconds * 10 min = 10 minutes*/
        const intervalTime = 1000 * 60 * 10; 
        const interval = setInterval(() => {
            checkApiStatus();
          }, intervalTime);

          return () => clearInterval(interval);
    }, [currentPage, searchParams]);

    const checkApiStatus = () => {
        getAppHelath()
            .then(response => {
                setApiStatus(response.data)
            });
    }

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
    const handleNavClick = (value) => {
        console.log(value)
        setSelectedNavItem(value)
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
        action: 'createEditAndDeleteBtn', 
        type: 'button',
        width: '450px'
       }];
       const actions = {
        createEditAndDeleteBtn: () => 
        <div className='d-flex justify-content-between'>
          <PrimarySmallBtn action={openModal} content='Edit'/>
          <DangerSamllBtn action={openConfirmModal} content='Delete'/>
        </div>
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
           <header >
                <h4 className={`${headingStyles['page-title']} ${styles['admin-page-title']}`}>Admin Panel</h4>
                <label className={styles['health-label']}>
                    Server status: 
                    <label title={apiStatus} 
                    className={`${styles['status-label']} ${apiStatus === HEALTHY_STATUS ? styles.healthy : styles.unhealthy}`}/></label>
           </header>
            <nav className={styles['admin-page-nav']}>
                <div className='d-flex justify-content-between'>
                    <ul className={`${styles['admin-ul']} d-flex align-items-end`}>
                        <li  className={selectedNavItem === navItems.exercises && `${styles['active-li']}`}
                             onClick={() => handleNavClick(navItems.exercises)}>Exercises</li>
                        <li  className={selectedNavItem === navItems.other && `${styles['active-li']}`} 
                             onClick={() => handleNavClick(navItems.other)}> Other</li>
                    </ul>
                    <SearchBar 
                    placeholder={'Find Exercise'}
                    setEnteredSearchParams={setEnteredSearchParams} 
                    handleSearchParams={handleSearchParams}/>
                </div>
                </nav>
                {
                selectedNavItem === navItems.exercises && 
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
                }
        </div>
    </Fragment>
)
}
export default Admin;