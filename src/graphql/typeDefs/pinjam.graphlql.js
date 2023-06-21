import { gql } from "@apollo/client";

export const AddPinjam = gql`
  mutation AddPinjam(
    $id_buku: Int
    $id_users: String
    $jumlah_pinjam: numeric
    $nama_buku: String
    $nama_user: String
    $status: String
    $tanggal_peminjaman: date
    $tanggal_pengembalian: date
  ) {
    insert_peminjaman_one(
      object: {
        id_buku: $id_buku
        id_users: $id_users
        jumlah_pinjam: $jumlah_pinjam
        nama_buku: $nama_buku
        nama_user: $nama_user
        tanggal_peminjaman: $tanggal_peminjaman
        tanggal_pengembalian: $tanggal_pengembalian
      }
      on_conflict: { constraint: peminjaman_pkey }
    ) {
      id_buku
      id_users
      jumlah_pinjam
      nama_buku
      nama_user
      status
      tanggal_peminjaman
      tanggal_pengembalian
    }
  }
`;
export const SubcriptionPinjam = gql`
  subscription SubcriptionPinjam(
    $searchTerm: String!
    $limit: Int
    $offset: Int
  ) {
    peminjaman_aggregate(
      where: { nama_user: { _ilike: $searchTerm } }
      order_by: { tanggal_peminjaman: asc }
      offset: $offset
      limit: $limit
    ) {
      aggregate {
        count
      }
      nodes {
        id
        id_buku
        id_users
        jumlah_pinjam
        nama_buku
        nama_user
        status
        tanggal_peminjaman
        tanggal_pengembalian
      }
    }
  }
`;
export const SubcriptionPinjamId = gql`
  subscription SubcriptionPinjamId(
    $id_users: String!
    $searchTerm: String!
    $limit: Int
    $offset: Int
  ) {
    peminjaman_aggregate(
      where: {
        id_users: { _eq: $id_users }
        nama_buku: { _ilike: $searchTerm }
      }
      order_by: { tanggal_peminjaman: asc }
      offset: $offset
      limit: $limit
    ) {
      aggregate {
        count
      }
      nodes {
        id_buku
        id_users
        jumlah_pinjam
        nama_buku
        nama_user
        status
        tanggal_peminjaman
        tanggal_pengembalian
      }
    }
  }
`;
export const TotalPeminjaman = gql `subscription TotalPeminjaman {
    peminjaman_aggregate {
      aggregate {
        count
      }
      nodes {
        id
      }
    }
  }
  `
export const EditStatusPinjam = gql `mutation EditStatusPinjam($id: uuid!, $status: String!) {
    update_peminjaman_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
      status
    }
  }
  `