 import styles from './users.module.css'
 import headingStyles from '../../styles/headings.module.css'
 import tableStyles from '../../styles/table.module.css'
 import { useEffect, useState } from 'react';
 import { getAllUsers } from '../../utils/services/usersService';
 import Table from '../../components/table/Table';
 import UserDetailsButton from '../../components/button/UserDetailsButton';
import Pagination from '../pagination/Pagination';

 function Users(){
    const dataCountPerPage = 10;
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(1);

    useEffect(() => {
        getAllUsers(searchParams, currentPage, dataCountPerPage).then(response => {
            console.log('Times')
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
        createUserDetailsBtn: (userId) => <UserDetailsButton id={userId} content='Go to'/>
       }

       const handleSearchParams = (e) => {
        e.preventDefault();
        if(enteredSearchParams.trim() !== ''){
            setSearchParams(enteredSearchParams);
        }
    }

       const paginate = pageNumber => setCurrentPage(pageNumber);
    return(
        <div className={styles['users-page']}>
            <div className='d-flex align-items-center justify-content-between'>
                <h4 className={headingStyles['page-title']}>Users</h4>
                <form class="row g-3">
                <div class="col-auto">
                    <label for="" class="visually-hidden">Find User</label>
                    <input onChange={(e) => {setEnteredSearchParams(e.target.value)}} type="text" class="form-control" id="inputPassword2" placeholder="Find User"/>
                </div>
                <div class="col-auto">
                    <button onClick={handleSearchParams} className={styles['search-btn']}>Search</button>
                </div>
                </form>
            </div>
           <div className={tableStyles.scrollable}>
                <Table data={users} columns={tableColumnsInfo} actions={actions}/>
           </div>
           <Pagination
            dataPerPage={10}
            totalData={totalUsers}
            paginate={paginate}
      />
        </div>
    )
}
export default Users;