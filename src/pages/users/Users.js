/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./users.module.css";
import pageStyles from "../../styles/page.module.css";
import tableStyles from "../../styles/table.module.css";
import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../../utils/services/usersService";
import Table from "../../components/table/Table";
import { DATA_PER_PAGE } from "../../utils/constants";

import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchbar/SearchBar";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";

function Users() {
  const initalPageable = {
    currentPage: 1,
    totalDataPerPage: 0,
    totalPages: 0,
  };
  const [pageable, setPageable] = useState(initalPageable);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParamsInputRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    getAllUsers(searchParams, pageable.currentPage, DATA_PER_PAGE).then(
      (response) => {
        setUsers(response.data.users);
        console.log(response.data);

        setPageable((prev) => ({
          ...prev,
          totalUsersPerPage: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / DATA_PER_PAGE),
        }));
        setIsLoading(false);
      }
    );
  }, [pageable.currentPage, searchParams]);

  const tableColumnsInfo = [
    {
      title: "ID",
      field: "id",
      type: "cell", //cell/button (options),
      width: "50vw", //(some size -> px, %, rem...),
    },
    {
      title: "Email",
      field: "email",
      type: "cell", //cell/button (options),
      width: "30vw", //(some size -> px, %, rem...),
    },
    {
      title: "Action",
      field: "action",
      dataField: "id", //since we need user id for this action we add one extra property
      action: "createUserDetailsBtn", //this property will help when creating the button
      type: "button", //cell/button (options),
      width: "20vw", //(some size -> px, %, rem...),
    },
  ];
  const actions = {
    createUserDetailsBtn: (userId) => (
      <Button
        type="button"
        isLink={true}
        to={`/users/${userId}`}
        buttonStyle="btn-primary"
        buttonSize="btn-small"
      >
        Go to
      </Button>
    ),
  };

  const handleSearchParams = (e) => {
    e.preventDefault();
    if (searchParamsInputRef.current.value.trim() !== "") {
      setPageable((prev) => ({
        ...prev,
        currentPage: 1,
      }));
      //this will trigger child's useffect and then will set curr page to 1
      setSearchParams(searchParamsInputRef.current.value);
    }
  };

  return (
    <div className={styles["users-page"]}>
      <h4 className={pageStyles["page-title"]}>Users</h4>
      <div className={styles["header-nav"]}>
        <SearchBar
          ref={searchParamsInputRef}
          placeholder={"Find User"}
          handleSearchParams={handleSearchParams}
        />
      </div>
      <div className={tableStyles.scrollable}>
        {isLoading && <Spinner />}
        {!isLoading && (
          <Table data={users} columns={tableColumnsInfo} actions={actions} />
        )}
      </div>
      <Pagination pageable={pageable} setPageable={setPageable} />
    </div>
  );
}
export default Users;
