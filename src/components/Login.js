import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: ""
  })

  const handleLoginState = () => {
    setFormState({
      ...formState,
      login: !formState.login
    })
  }

  const handleNameValue = (e) => {
    setFormState({
      ...formState,
      name: e.target.value
    })
  }

  const handleEmailValue = (e) => {
    setFormState({
      ...formState,
      email: e.target.value
    })
  }

  const handlePasswordValue = (e) => {
    setFormState({
      ...formState,
      password: e.target.value
    })
  }


  return (
    <div>
      <h4 className="mv3">
        {formState.login ? "Login" : "Sign Up"}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input value={formState.name} onChange={handleNameValue} type="text" placeholder="Your Name" />
        )}
        <input value={formState.email} onChange={handleEmailValue} type="text" placeholder="Your Email" />
        <input value={formState.password} onChange={handlePasswordValue} type="password" placeholder="Your Password" />
        <div className="flex mt3">
          <button className="pointer mr2 button">
            {formState.login ? "login" : "register"}
          </button>
          <button className="pointer button"
            onClick={handleLoginState}
          >
            {formState.login ? "need to create an account" : "already have an account?"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login;