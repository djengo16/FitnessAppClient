/* eslint-disable react-hooks/exhaustive-deps */
import tableStyles from "../../styles/table.module.css";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/services/usersService";
import Table from "../../components/table/Table";
import { DATA_PER_PAGE } from "../../utils/constants";

import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";
import { buildUserColumnInAdminPanel } from "../../utils/builders/tableColumnsBuilder";
import { ADMIN_ROLE } from "../../utils/environment";
import { addToRole, removeFromRole } from "../../utils/services/authService";
import useToast from "../../hooks/useToast";
import Toast from "../../components/toast/Toast";
import { severityTypes, toastMessages } from "../../utils/messages/toast-info";

function UsersInAdmin({ searchParams: parrentseArchParams }) {
  const initalPageable = {
    currentPage: 1,
    totalDataPerPage: 0,
    totalPages: 0,
  };
  const [pageable, setPageable] = useState(initalPageable);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");

  //toast
  const {
    open,
    handleOpen: handleOpenToast,
    handleClose,
    toastConfig,
    setToastConfig,
  } = useToast();

  // need this because the searchbar is in the navbar component
  if (parrentseArchParams !== searchParams) {
    setPageable((prev) => ({
      ...prev,
      currentPage: 1,
    }));

    setSearchParams(parrentseArchParams);
  }

  useEffect(() => {
    setIsLoading(true);
    getAllUsers(searchParams, pageable.currentPage, DATA_PER_PAGE).then(
      (response) => {
        setUsers(response.data.users);
        setPageable((prev) => ({
          ...prev,
          totalUsersPerPage: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / DATA_PER_PAGE),
        }));
        setIsLoading(false);
      }
    );
  }, [pageable.currentPage, searchParams]);

  const tableColumnsInfo = buildUserColumnInAdminPanel();

  const actions = {
    createUserDetailsBtn: (userId) => (
      <Button
        type="button"
        isLink={true}
        to={`/users/${userId}/info`}
        buttonStyle="btn-primary"
        buttonSize="btn-small"
      >
        View
      </Button>
    ),
  };

  const handleChangeRole = async (role, user) => {
    if (role === ADMIN_ROLE) {
      addToRole({ userId: user.id, role }).then((res) => {
        setToastConfig({
          severity: severityTypes.success,
          message: toastMessages.updatedRole(user.email),
        });
      });
    } else {
      removeFromRole({ userId: user.id, role: ADMIN_ROLE }).then((res) => {
        setToastConfig({
          severity: severityTypes.success,
          message: toastMessages.updatedRole(user.email),
        });
      });
    }
    handleOpenToast();
  };

  return (
    <div>
      <div className={tableStyles.scrollable}>
        {isLoading && <Spinner />}
        {!isLoading && (
          <Table
            data={users}
            columns={tableColumnsInfo}
            actions={actions}
            handleSaveData={handleChangeRole}
          />
        )}
      </div>
      <Pagination pageable={pageable} setPageable={setPageable} />
      <Toast
        open={open}
        onClose={handleClose}
        severity={toastConfig.severity}
        message={toastConfig.message}
      />
    </div>
  );
}

export default UsersInAdmin;
