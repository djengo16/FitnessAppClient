 import styles from './users.module.css'
 import headingStyles from '../../styles/headings.module.css'
 import tableStyles from '../../styles/table.module.css'
 import { useEffect, useState } from 'react';
 import { getAllUsers } from '../../utils/services/usersService';
 import Table from '../../components/table/Table';
import UserDetailsButton from '../../components/button/UserDetailsButton';

 function Users(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers().then(response => {
           setUsers(response.data);
        });
    }, []);

    const tableColumnsInfo =[{
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

    return(
        <div className={styles['users-page']}>
            <h4 className={headingStyles['page-title']}>Users</h4>
           <div className={tableStyles.scrollable}>
                <Table data={users} columns={tableColumnsInfo} actions={actions}/>
           </div>
        </div>
    )
}
export default Users;