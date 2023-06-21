import { gql } from "@apollo/client";

export const AddBuku = gql`
  mutation AddBuku($gambar_buku: String, $nama_buku: String, $stok: numeric) {
    insert_buku_one(
      object: { gambar_buku: $gambar_buku, nama_buku: $nama_buku, stok: $stok }
      on_conflict: { constraint: buku_pkey }
    ) {
      nama_buku
      stok
    }
  }
`;

export const SubscriptionBuku = gql`
  subscription SubscriptionBuku(
    $searchTerm: String!
    $limit: Int!
    $offset: Int!
  ) {
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
        stok
      }
    }
  }
`;

export const TotalBuku = gql `subscription TotalBuku{
  buku_aggregate {
    aggregate {
      count
    }
    nodes {
      id
    }
  }
}

`
export const EditBuku = gql`
  mutation EditBuku(
    $id: Int!
    $gambar_buku: String!
    $nama_buku: String!
    $stok: numeric!
  ) {
    update_buku_by_pk(
      pk_columns: { id: $id }
      _set: { gambar_buku: $gambar_buku, nama_buku: $nama_buku, stok: $stok }
    ) {
      gambar_buku
      id
      nama_buku
      stok
    }
  }
`;

export const EditStokBuku = gql `mutation EditStokBuku($id: Int!, $stok: numeric!) {
  update_buku_by_pk(pk_columns: {id: $id}, _set: {stok: $stok}) {
    id
    stok
  }
}
`

export const DeleteBuku = gql`
  mutation DeleteBuku($id: Int!) {
    delete_buku_by_pk(id: $id) {
      gambar_buku
      id
      nama_buku
    }
  }
`;
