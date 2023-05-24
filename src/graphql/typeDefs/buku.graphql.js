import { gql } from "@apollo/client";

export const AddBuku = gql`
mutation AddBuku($nama_buku: String, $gambar_buku: String) {
    insert_buku_one(object: {gambar_buku: $gambar_buku, nama_buku: $nama_buku}, on_conflict: {constraint: buku_pkey}) {
      nama_buku
    }
  }
  `;
 
  export const SubscriptionBuku = gql`
  subscription SubscriptionBuku($searchTerm: String!, $limit: Int!, $offset: Int!) {
    buku_aggregate(
      where: { nama_buku: { _ilike: $searchTerm } }
      limit: $limit
      offset: $offset
      order_by: { nama_buku: asc }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        nama_buku
        gambar_buku
      }
    }
  }
`;

export const EditBuku = gql `mutation EditBuku($id: Int!, $gambar_buku: String!, $nama_buku: String!) {
  update_buku_by_pk(pk_columns: {id: $id}, _set: {gambar_buku: $gambar_buku, nama_buku: $nama_buku}) {
    gambar_buku
    id
    nama_buku
  }
}
`

export const DeleteBuku = gql `mutation DeleteBuku($id: Int!) {
  delete_buku_by_pk(id: $id) {
    gambar_buku
    id
    nama_buku
  }
}
`;