import { gql } from "@apollo/client";

export const AddCart = gql `mutation AddCart($buku: String!, $id_buku: Int!, $id_user: String!) {
    insert_cart_one(object: {buku: $buku, id_buku: $id_buku, id_user: $id_user}) {
      buku
      id_buku
      id_user
    }
  }
  `
export const SubscriptionCart = gql `subscription CartSubscription($id_user: String!) {
    cart(where: { id_user: { _eq: $id_user } }) {
      buku
      id_buku
      id_user
    }
  }`