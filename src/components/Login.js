import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";
import { useMutation, gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!,
    $password: String!,
    $name: String!
  ){
    signup(
      email: $email,
      passowrd: $password,
      name: $name
    ){
      token
    }
  }
`

const LOGIN_MUTATION = gql`
mutation LoginMutation(
  $email: String!,
  $password: String!
){
  login(email: $email, password: $password){
    token
  }
}
`

const Login = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: ""
  })

  const [login] = useMutation(LOGIN_MUTATION, {
    varibles: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token)
      navigate("/")
    }
  })

  const [signup] = useMutation(SIGNUP_MUTATION, {
    varibles: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token)
      navigate("/")
    }
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
          <button className="pointer mr2 button" onClick={formState.login ? login : signup}>
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