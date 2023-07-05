import { gql } from "@apollo/client";

export const AddPengembalian = gql`
  mutation AddPengembalian(
    $id_buku: Int
    $id_peminjaman: uuid
    $id_users: String
    $jumlah_pinjam: numeric
    $status: String
    $tanggal_pengembalian: date
    $denda: numeric
  ) {
    insert_pengembalian_one(
      object: {
        id_buku: $id_buku
        id_peminjaman: $id_peminjaman
        id_users: $id_users
        jumlah_pinjam: $jumlah_pinjam
        tanggal_pengembalian: $tanggal_pengembalian
        denda: $denda
      }
      on_conflict: { constraint: pengembalian_pkey }
    ) {
      id_buku
      id_peminjaman
      id_users
      denda
      jumlah_pinjam
      status
      tanggal_pengembalian
    }
  }
`;

export const SubcriptionPengembalianId = gql`
  subscription SubcriptionPengembalianId(
    $id_users: String!
    $searchTerm: String!
    $limit: Int
    $offset: Int
  ) {
    pengembalian_aggregate(
      where: {
        id_users: { _eq: $id_users }
        pengembalian_buku: { nama_buku: { _ilike: $searchTerm } }
      }
      order_by: { tanggal_pengembalian: asc }
      offset: $offset
      limit: $limit
    ) {
      aggregate {
        count
      }
      nodes {
        id
        id_buku
        id_peminjaman
        id_users
        denda
        jumlah_pinjam
        status
        tanggal_pengembalian
        pengembalian_buku {
          nama_buku
          gambar_buku
        }
      }
    }
  }
`;

export const SubcriptionPengembalian = gql`
  subscription SubcriptionPengembalian(
    $searchTerm: String!
    $limit: Int
    $offset: Int
  ) {
    pengembalian_aggregate(
      where: { pengembalian_user: { nama: { _ilike: $searchTerm } } }
      order_by: { tanggal_pengembalian: asc }
      offset: $offset
      limit: $limit
    ) {
      aggregate {
        count
      }
      nodes {
        id
        id_buku
        id_peminjaman
        id_users
        denda
        jumlah_pinjam
        status
        tanggal_pengembalian
        pengembalian_buku {
          nama_buku
          gambar_buku
        }
        pengembalian_user {
          nama
        }
      }
    }
  }
`;
export const TotalPengembalian = gql`
  subscription TotalPengembalian {
    pengembalian_aggregate {
      aggregate {
        count
      }
      nodes {
        id
      }
    }
  }
`;

export const TotalPengembalianUser = gql `subscription TotalPengembalianUser($id_users: String!) {
  pengembalian_aggregate(where: { id_users: { _eq: $id_users } }) {
    aggregate {
      count
    }
  }
}
`

export const TotalDenda = gql`
  subscription TotalDenda {
    pengembalian_aggregate {
      aggregate {
        sum {
          denda
        }
      }
      nodes {
        id
      }
    }
  }
`;

export const TotalDendabyId = gql`
  subscription TotalDendabyId($id_users: String!) {
    pengembalian_aggregate(where: { id_users: { _eq: $id_users } }) {
      aggregate {
        sum {
          denda
        }
      }
    }
  }
`;

export const EditStatusPengembalian = gql`
  mutation EditStatusPengembalian($id: uuid!, $status: String!) {
    update_pengembalian_by_pk(
      pk_columns: { id: $id }
      _set: { status: $status }
    ) {
      id
      status
    }
  }
`;
export const DeletePengembalian = gql `mutation DeletePengembalian($id: uuid!) {
  delete_pengembalian_by_pk(id: $id) {
    denda
    id
    id_buku
    id_peminjaman
    id_users
    jumlah_pinjam
  }
}
`;
