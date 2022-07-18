 import styles from './users.module.css'
 import headingStyles from '../../styles/headings.module.css'
 import tableStyles from '../../styles/table.module.css'
 import { useEffect, useState } from 'react';
 import { getAllUsers } from '../../utils/services/usersService';
 import { Link } from 'react-router-dom';
 function Users(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log('change')
        getAllUsers().then(response => {
           setUsers(response.data);
        });
    }, []);
    return(
        <div className={styles['users-page']}>
            <h4 className={headingStyles['page-title']}>Users</h4>
           <div className={tableStyles.scrollable}>
                <table className={styles['users-table']}>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th className={styles['th-border']}>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return (<tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td><Link to={`/users/${user.id}`} className={styles['table-btn']}>Go to</Link></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
           </div>
        </div>
    )
}
export default Users;