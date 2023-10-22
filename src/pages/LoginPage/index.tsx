import axios from "axios";
import { ChangeEvent, useState } from "react";



export function UserLoginPage() {


    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const [apiError, setApiError] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [token, setToken] = useState('');
    const [userAuthenticated, setUserAuthenticated] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((previusState) => {
            return {
                ...previusState,
                [name]: value,
            }
        })
        setErrors((previusState) => {
            return {
                ...previusState,
                [name]: undefined,
            }
        })

    }

    const onClickLogin = () => {
        //console.log(form)

        axios.post("http://localhost:8025/login", form)
            .then((response) => {
                setUserAuthenticated(response.data.token);
                setApiError("")
            })
            .catch((responseError) => {
                if (responseError.response.data) {
                    setApiError(responseError.response.data.message);
                    console.log({apiError})
                    setUserAuthenticated("");
                }
            })
            .finally(() => {
                //console.log("Sempre executa")
                setPendingApiCall(false)
            })
    }

    return (
        <>
            <main className="container">

                <form action="">
                    <div className="text-center ">
                        <h1 className="h3 mb-3 fw-normal">User Login Page</h1>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="Informe seu username"
                            name="username"
                            className={errors.username ? "form-control is-invalid" : "form-control"}
                            type="text"
                            onChange={onChange}
                        />
                        <label htmlFor="username">Informe seu nome de usuário</label>
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            placeholder="Informe seu password"
                            name="password"
                            className={errors.password ? "form-control is-invalid" : "form-control"}
                            type="password"
                            onChange={onChange}
                        />
                        <label htmlFor="password">Informe seu password</label>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div>
                        <button
                            className="w-100 btn btn-lg btn-primary mb-3"
                            type="button"
                            onClick={onClickLogin}
                        >
                            {pendingApiCall && (
                                <div className="spinner-border text-light-spinner spinner-border-sm mr-sm-1" role="status">
                                    <span className="visually-hidden">Aguarde...</span>
                                </div>
                            )}
                            Login
                        </button>
                        {userAuthenticated && (
                            <div className="col-12 mb-3">
                                <div className="alert alert-success">
                                    {userAuthenticated}
                                </div>
                            </div>
                        )}
                        {apiError && (
                            <div className="col-12 mb-3">
                                <div className="alert alert-danger">
                                    {apiError}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </main>
        </>
    )
}