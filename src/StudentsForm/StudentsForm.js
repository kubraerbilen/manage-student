import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./StudentsForm.css";
import swal from 'sweetalert';


const StudentsForm = props => {
    const [form, setForm] = useState({
        firstName: props?.value?.firstName,
        lastName: '',
        username: '',
        email: '',
        gender: '',
        weight: '',
        height: '',
        phone: '',
        domain: '',
        password: '',
        compName: '',
        compDepartment: '',
        compTitle: '',
        compAddress: '',
        compCity: '',
        compState: '',
        compPostalCode: ''
    });
    useEffect(() => {
            setForm({
                ...form,
                ["firstName"]: props?.value?.firstName,
                ["lastName"]: props?.value?.lastName,
                ["username"]: props?.value?.username,
                ["email"]: props?.value?.email,
                ["gender"]: props?.value?.gender,
                ["weight"]: props?.value?.weight,
                ["height"]: props?.value?.height,
                ["phone"]: props?.value?.phone,
                ["domain"]: props?.value?.domain,
                ["password"]: props?.value?.password,
                ["compName"]: props?.value?.company?.name,
                ["compDepartment"]: props?.value?.company?.department,
                ["compTitle"]: props?.value?.company?.title,
                ["compAddress"]: props?.value?.company?.address?.address,
                ["compCity"]: props?.value?.company?.address?.city,
                ["compState"]: props?.value?.company?.address.state,
                ["compPostalCode"]: props?.value?.company?.address?.postalCode,
            });
        
    }, [form]);
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };
    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);



    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ]

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };
    const handleChangeCompany = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!form.firstName && !form.lastName && !form.username && !form.email && !form.password) {
            swal("Failed", "Please fill in the required fields. ", {
                buttons: false,
                timer: 1000,
            })
            return;
        } else {
            if (props?.value?.id) { // update
                fetch('https://dummyjson.com/users/' + props?.value?.id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                })
                    .then(res => res.json())
                    .then(
                        swal({
                            title: "Success",
                            text: "Record updated.",
                            icon: "success",
                            timer: 1000,
                            button: false
                        })
                    );
            } else {   //post
                fetch('https://dummyjson.com/users/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                })
                    .then(res => res.json())
                    .then(
                        swal({
                            title: "Success",
                            text: "Record added",
                            icon: "success",
                            timer: 1000,
                            button: false
                        })
                    );
            }
            props.onClose();
        }


    };
    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title">{props.title}</h4>
                    </div>
                    <div className="modal-body p-4">
                        <form onSubmit={handleSubmit} >
                            <div class="form-group row ">
                                <div class="col-6">
                                    <label htmlFor="firstName"><b>First Name</b></label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={form.firstName}

                                        onChange={handleChange}
                                        className={`form-control ${form.firstName === "" || form.firstName === undefined ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    <div class="invalid-feedback">
                                        Please enter a name.
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label htmlFor="lastName"><b>Last Name</b></label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className={`form-control ${form.lastName === "" || form.lastName === undefined ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    <div class="invalid-feedback">
                                        Please enter a last name.
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row pt-1">
                                <div class="col-6">
                                    <label htmlFor="username"><b>Username</b></label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={form.username}
                                        onChange={handleChange}
                                        className={`form-control ${form.username === "" || form.username === undefined ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    <div class="invalid-feedback">
                                        Please enter a username.
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label htmlFor="gender"><b>Gender</b></label>
                                    <select value={form.gender} id="gender" onChange={handleChange} class="form-control" >
                                        <option value="male">Male</option>
                                        <option value="femal">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row pt-1">
                                <div class="col-6">
                                    <label htmlFor="email"><b>Email</b></label>
                                    <input
                                        id="email"
                                        type="text"
                                        value={form.email}
                                        onChange={handleChange}
                                        class={`form-control ${form.email === "" || form.email === undefined ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    <div class="invalid-feedback">
                                        Please enter a email.
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label htmlFor="phone"><b>Phone</b></label>
                                    <input
                                        class="form-control"
                                        id="phone"
                                        type="text"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div class="form-group row pt-1">
                                <div class="col-6">
                                    <label htmlFor="height"><b>Height</b></label>
                                    <input
                                        class="form-control"
                                        id="height"
                                        type="number"
                                        value={form.height}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div class="col-6">
                                    <label htmlFor="weight"><b>Weight</b></label>
                                    <input
                                        class="form-control"
                                        id="weight"
                                        type="number"
                                        value={form.weight}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div class="form-group row pt-1">
                                <div class="col-6">
                                    <label htmlFor="domain"><b>Website</b></label>
                                    <input
                                        class="form-control"
                                        id="domain"
                                        type="text"
                                        value={form.domain}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div class="col-6">
                                    <label htmlFor="password"><b>Password</b></label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className={`form-control ${form.password === "" || form.password === undefined ? 'is-invalid' : ''}`}

                                    />
                                    <div class="invalid-feedback">
                                        Please enter a password.
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row pt-1">
                                <div class="col-4">
                                    <label htmlFor="compName"><b>Company</b></label>
                                    <input
                                        class="form-control"
                                        id="compName"
                                        type="text"
                                        value={form.compName}
                                        placeholder="Name..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                                <div class="col-4">
                                    <label htmlFor="compDepartment"></label>
                                    <input
                                        class="form-control"
                                        id="compDepartment"
                                        type="text"
                                        value={form.compDepartment}
                                        placeholder="Department..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                                <div class="col-4">
                                    <label htmlFor="compTitle"></label>
                                    <input
                                        class="form-control"
                                        id="compTitle"
                                        type="text"
                                        value={form.compTitle}
                                        placeholder="Title..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                            </div>
                            <div class="form-group row ">
                                <div class="col-3">
                                    <label htmlFor="compAddress"></label>

                                    <input
                                        class="form-control"
                                        id="compAddress"
                                        type="text"
                                        value={form.compAddress}
                                        placeholder="Adress..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                                <div class="col-3">
                                    <label htmlFor="compCity"></label>
                                    <input
                                        class="form-control"
                                        id="compCity"
                                        type="text"
                                        value={form.compCity}
                                        placeholder="City..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                                <div class="col-3">
                                    <label htmlFor="compState"></label>
                                    <input
                                        class="form-control"
                                        id="compState"
                                        type="text"
                                        value={form.compState}
                                        placeholder="State..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                                <div class="col-3">
                                    <label htmlFor="compPostalCode"></label>
                                    <input
                                        class="form-control"
                                        id="compPostalCode"
                                        type="number"
                                        value={form.compPostalCode}
                                        placeholder="PostalCode..."
                                        onChange={handleChangeCompany}
                                    />
                                </div>
                            </div>
                        </form>


                    </div>
                    <div className="modal-footer">
                        <button onClick={props.onClose} className="btn btn-danger">
                            Close
                        </button>
                        <button onClick={handleSubmit} type="submit" className="btn btn-warning ">
                            {props?.value?.id ? 'Edit Student' : 'Add New Student'}
                        </button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default StudentsForm;
