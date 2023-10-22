import axios from "axios";
import { ChangeEvent, useState } from "react"

export function UserSignupPage() {

    const [form, setForm] = useState({
        displayName: "",
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        displayName: "",
        username: "",
        password: ""
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [userSaved, setuserSaved] = useState('');
    const [apiError, setApiError] = useState('');



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
    const onClickSignup = () => {
        //console.log(form)
        setPendingApiCall(true)
        axios.post("http://localhost:8025/users", form)
            .then((response) => {
                //console.log("Usuário salvo com sucesso")
            })
            .catch((responseError) => {
                if (responseError.response.data.validationErrors) {
                    setErrors(responseError.response.data.validationErrors)

                    setApiError(responseError.response.data.message)
                    setuserSaved('')
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
                        <h1 className="h3 mb-3 fw-normal">User Signup Page</h1>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            placeholder="Informe seu nome"
                            name="displayName"
                            className={errors.displayName ? "form-control is-invalid" : "form-control"}
                            type="text"
                            onChange={onChange}
                        />
                        <label htmlFor="displayName">Informe seu nome</label>
                        {errors.displayName && <div className="invalid-feedback">{errors.displayName}</div>}
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
                            onClick={onClickSignup}
                        >
                            {pendingApiCall && (
                                <div className="spinner-border text-light-spinner spinner-border-sm mr-sm-1" role="status">
                                    <span className="visually-hidden">Aguarde...</span>
                                </div>
                            )}
                            Cadastrar
                        </button>
                        {userSaved && (
                            <div className="col-12 mb-3">
                                <div className="alert alert-success">
                                    {userSaved}
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