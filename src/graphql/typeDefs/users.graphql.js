import { gql } from "@apollo/client";

export const AddUser = gql`
  mutation AddUser(
    $id: String
    $nama: String
    $email: String
    $password: String
  ) {
    insert_users_one(
      object: { id: $id, nama: $nama, email: $email, password: $password }
    ) {
      id
      nama
      email
      password
      role
    }
  }
`;

export const GetUser = gql`
 query GetUser($id: String!) {
  users_by_pk(id: $id) {
    id
    nama
    role
  }
}
`

