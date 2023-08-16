import React, { useEffect, useState } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from 'react-bootstrap';
import './StudentList.css'
import { PiPencilSimple } from "react-icons/pi";
import { SlTrash } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import StudentForm from '../StudentsForm/StudentsForm'
import swal from 'sweetalert';

const columns = [
    { id: 'image', label: '', align: 'center' },
    { id: 'fullName', label: 'Name', align: 'center' },
    { id: 'email', label: 'Email', align: 'center' },
    { id: 'phone', label: 'Phone', align: 'center' },
    { id: 'domain', label: 'Website', align: 'center' },
    { id: 'companyName', label: 'Company Name', align: 'center' },
    { id: 'edit', label: '', align: 'center' },
];
export default function StickyHeadTable() {
    const [users, setUsers] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(true);
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
    const [isVisibleUpdateRow, setIsVisibleUpdateRow] = useState('');


    useEffect(() => {
        fetchUserData()
    }, [])
    function deleteUser(e) {
        swal({
            title: "Are you sure?",
            text: "You want to delete this student?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    fetch('https://dummyjson.com/users/' + e.id, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then((res => {
                            swal({
                                title: "Done!",
                                text: "Student is deleted",
                                icon: "success",
                                timer: 1000,
                                button: false
                            })
                        }));
                    fetchUserData()
                }
            });
    }
    const fetchUserData = () => {
        fetch("https://dummyjson.com/users?limit=100&skip=0")
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data) {
                    for (let i = 0; i < data.users.length; i++) {
                        const companyName = data.users[i]?.company.name
                        data.users[i].companyName = companyName
                        data.users[i].fullName = data.users[i]?.firstName + ' ' + data.users[i]?.lastName
                    }
                }
                setUsers(data)
            })
    }
    const handleChange = e => {
        setSearchField(e.target.value);
        if (e.target.value === "") {
            setSearchShow(true);
            fetchUserData()
        }
        else {
            setSearchShow(false);
            users.users = users.users.filter(
                person => {
                    return (
                        person
                            .fullName
                            .toLowerCase()
                            .includes(searchField.toLowerCase()) ||
                        person
                            .email
                            .toLowerCase()
                            .includes(searchField.toLowerCase()) ||
                        person
                            .phone
                            .toLowerCase()
                            .includes(searchField.toLowerCase()) ||
                        person
                            .domain
                            .toLowerCase()
                            .includes(searchField.toLowerCase()) ||
                        person
                            .companyName
                            .toLowerCase()
                            .includes(searchField.toLowerCase())
                    );
                }
            );

        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const UpdateRow =(row) =>{
        setIsVisibleUpdateRow(row)
        setIsVisibleUpdate(true)
    }

    return (
        <div className="d-flex list " style={{ border: "none", boxShadow: "none", height: '100vh', backgroundColor: "#f8f8f8" }} >
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: "none", backgroundColor: "#f8f8f8" }}>
                <div className="header-list col-12">
                    <h3 className="title-list col-8">Student List</h3>
                    <div className="col-3 d-flex search-list align-items-center">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            className="form-control mt-1"
                            placeholder="Search... "
                            onChange={handleChange}

                        />
                        {searchShow &&
                            <BsSearch style={{ width: "14px", height: "14px", color: "#C4C4C4", marginLeft: "-25px" }} />
                        }
                    </div>
                    <div className="col-3 ">
                        <Button className="add-btn" onClick={() => setIsVisibleAdd(true)} >ADD NEW STUDENT</Button>
                        <StudentForm title="New Student" onClose={() => setIsVisibleAdd(false)} show={isVisibleAdd} >
                        </StudentForm>
                    </div>
                </div>

                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table stickyHeader aria-label="sticky table border-separate space-y-6">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-row">
                            {users.users
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id == "image"
                                                            ? <img src={value} alt={column.image} style={{ width: 50, height: 50, borderRadius: 65 }} />
                                                            : value}
                                                        {column.id == "edit"
                                                            ? <div style={{ display: "flex", justifyContent: "space-around", color: "#FEAF00", cursor: "pointer" }} ><PiPencilSimple onClick={() =>  UpdateRow(row) }  />
                                                                <SlTrash onClick={(e) => { deleteUser(row) }} /> </div>
                                                            : ""}

                                                    </TableCell>

                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                        <StudentForm title={isVisibleUpdateRow.firstName +' ' + isVisibleUpdateRow.lastName }  onClose={() => setIsVisibleUpdate(false)} show={isVisibleUpdate} value={isVisibleUpdateRow} >
                        </StudentForm>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={users.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>

    );
}