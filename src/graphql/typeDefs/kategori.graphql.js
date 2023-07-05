import { gql } from "@apollo/client";

export const AddKategori = gql`
  mutation AddKategori($nama_kategori: String) {
    insert_kategori_one(
      object: { nama_kategori: $nama_kategori }
      on_conflict: { constraint: kategori_pkey }
    ) {
      nama_kategori
    }
  }
`;

export const SubscriptionKategori = gql`
  subscription SubscriptionKategori(
    $searchTerm: String!
    $limit: Int!
    $offset: Int!
  ) {
    kategori_aggregate(
      where: { nama_kategori: { _ilike: $searchTerm } }
      limit: $limit
      offset: $offset
      order_by: { nama_kategori: asc }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        nama_kategori
      }
    }
  }
`;

export const SubscriptionKategoriCreate = gql ` subscription SubscriptionKategori(
    $searchTerm: String!
  ) {
    kategori_aggregate(
      where: { nama_kategori: { _ilike: $searchTerm } }
      order_by: { nama_kategori: asc }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        nama_kategori
      }
    }
  }`
  
export const TotalKategori = gql `subscription TotalKategori{
    kategori_aggregate {
      aggregate {
        count
      }
      nodes {
        id
      }
    }
  }`

  
export const EditKategori = gql`
mutation EditKategori(
  $id: Int!
  $nama_kategori: String!
) {
  update_kategori_by_pk(
    pk_columns: { id: $id }
    _set: { nama_kategori: $nama_kategori }
  ) {
    id
    nama_kategori
  }
}
`;

export const DeleteKategori = gql`
  mutation DeleteKategori($id: Int!) {
    delete_kategori_by_pk(id: $id) {
      nama_kategori
      id
    }
  }
`;