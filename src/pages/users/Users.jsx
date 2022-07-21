/* eslint-disable react-hooks/exhaustive-deps */
 import styles from './users.module.css'
 import headingStyles from '../../styles/headings.module.css'
 import tableStyles from '../../styles/table.module.css'
 import { useEffect, useState } from 'react';
 import { getAllUsers } from '../../utils/services/usersService';
 import Table from '../../components/table/Table';
 import UserDetailsLinkBtn from '../../components/button/UserDetailsLinkBtn';
 import {DATA_PER_PAGE} from '../../utils/constants'

import Pagination from '../../components/pagination/Pagination';
import SearchBar from '../../components/searchbar/SearchBar';

 function Users(){
    const dataCountPerPage = DATA_PER_PAGE;
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [searchParams, setSearchParams] = useState('');
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(1);

    useEffect(() => {
        getAllUsers(searchParams, currentPage, dataCountPerPage)
        .then(response => {
           setUsers(response.data.users);
           setTotalUsers(response.data.pagesCount)
        });
    }, [currentPage, searchParams]);

    const tableColumnsInfo = [{
        title: 'ID',
        field: 'id',
        type: 'cell',//cell/button (options),
        width: '500px'//(some size -> px, %, rem...),
       },{
        title: 'Email',
        field: 'email',
        type: 'cell',//cell/button (options),
        width: '500px'//(some size -> px, %, rem...),
       },{
        title: 'Action',
        field: 'action',
        dataField: 'id', //since we need user id for this action we add one extra property
        action: 'createUserDetailsBtn', //this property will help when creating the button
        type: 'button',//cell/button (options),
        width: '500px'//(some size -> px, %, rem...),
       }];
       const actions = {
        createUserDetailsBtn: (userId) => 
        <UserDetailsLinkBtn url={`/users/${userId}`} content='Go to'/>
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
    return(
        <div className={styles['users-page']}>
            <div className='d-flex align-items-center justify-content-between'>
            <h4 className={headingStyles['page-title']}>Users</h4>
            <SearchBar 
            placeholder={'Find User'}
            setEnteredSearchParams={setEnteredSearchParams} 
            handleSearchParams={handleSearchParams}/>
            </div>
           <div className={tableStyles.scrollable}>
                <Table data={users} columns={tableColumnsInfo} actions={actions}/>
           </div>
           <Pagination
            dataPerPage={10}
            totalData={totalUsers}
            paginate={paginate}
            refresh={refresh}
      />
        </div>
    )
}
export default Users;