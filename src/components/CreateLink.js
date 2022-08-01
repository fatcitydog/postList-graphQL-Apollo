import { useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const CREATE_LINK_MUTATION = gql`
mutation PostMutation(
  $description: String!
  $url: String!
) {
  post(description: $description, url: $url){
    id
    createdAt
    url
    description
  }
}
`

const CreateLink = () => {

  const [formState, setFormState] = useState({
    description: "",
    url: ""
  })
  const navigate = useNavigate()

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    },
    onCompleted: () => navigate("/")
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    createLink()
  }

  const handleDescriptionInput = (e) => {
    setFormState({
      ...formState,
      description: e.target.value
    })
  }

  const handleURLInput = (e) => {
    setFormState({
      ...formState,
      url: e.target.value
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={handleDescriptionInput}
            type="text"
            placeholder="The description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={handleURLInput}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div >
  )
}

export default CreateLink;
