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

export const AddUserAdmin = gql`
  mutation AddUserAdmin(
    $id: String
    $nama: String
    $email: String
    $password: String
    $nis: String
    $role: String
  ) {
    insert_users_one(
      object: {
        id: $id
        nama: $nama
        email: $email
        password: $password
        nis: $nis
        role: $role
      }
    ) {
      id
      nama
      email
      password
      role
      nis
    }
  }
`;

export const EditUser = gql`
  mutation EditUser(
    $id: String!
    $email: String!
    $nama: String!
    $password: String!
    $nis: String!
  ) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { email: $email, nama: $nama, password: $password, nis: $nis }
    ) {
      id
      email
      nama
      nis
      password
    }
  }
`;

export const GetUser = gql`
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      id
      nama
      role
      nis
    }
  }
`;

export const SubscriptionUser = gql`
  subscription SubscriptionUser(
    $searchTerm: String!
    $limit: Int
    $offset: Int
  ) {
    users_aggregate(
      where: {
        nama: { _ilike: $searchTerm }
        role: { _in: ["siswa"] }
      }
      limit: $limit
      offset: $offset
      order_by: { nama: asc }
    ) {
      aggregate {
        count
      }
      nodes {
        email
        id
        nama
        password
        role
        nis
      }
    }
  }
`;


export const SubscriptionStaff = gql`
  subscription SubscriptionStaff(
    $searchTerm: String!
    $limit: Int
    $offset: Int
  ) {
    users_aggregate(
      where: {
        nama: { _ilike: $searchTerm }
        role: { _in: ["pustakawan", "admin"] }
      }
      limit: $limit
      offset: $offset
      order_by: { nama: asc }
    ) {
      aggregate {
        count
      }
      nodes {
        email
        id
        nama
        password
        role
        nis
      }
    }
  }
`;

export const UserId = gql`
  subscription UserId($id: String!) {
    users_by_pk(id: $id) {
      email
      nama
      nis
      password
      role
    }
  }
`;

export const TotalSiswa = gql`
  subscription TotalSiswa {
    users_aggregate(
      order_by: { nama: asc }
      where: { role: { _in: "siswa" } }
    ) {
      aggregate {
        count
      }
      nodes {
        nama
        role
        id
      }
    }
  }
`;

export const DeleteUser = gql`
mutation DeleteUser($id: String!) {
  delete_users_by_pk(id: $id) {
    id
    nama
    nis
    email
    password
    role
  }
}
`;
