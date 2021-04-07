import *as React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { width } from '@material-ui/system';
import './Matrial.css';

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First name", width: 130 },
  { field: "last_name", headerName: "Last name", width: 130 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("first_name") || ""} ${
      params.getValue("last_name") || ""
      }`
  },
  {
    field: "avatar",
    headerName: "Avatar",
    type: "string",
    width: 200
  }


];

function loadServerRows(page) {
  return fetch(`https://reqres.in/api/users?page=${page + 1}&per_page=5`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}




const MaterialTable = () => {
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = React.useState({ data: [] });
  const [loading, setLoading] = React.useState(true);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newUsers = await loadServerRows(page);

      if (!active) {
        return;
      }

      setUsers(newUsers);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users.data}
        columns={columns}
        pagination
        pageSize={5}
        rowCount={users.total}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};
export default MaterialTable;