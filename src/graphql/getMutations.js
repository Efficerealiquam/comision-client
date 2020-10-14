import gql from "graphql-tag";

export const UPDATE_PRODUCT_LISTA = gql`
  mutation updateListaUpPro($proId: ID!, $idLista: ID!, $cantidad: Int!) {
    updateListaUpPro(proId: $proId, idLista: $idLista, cantidad: $cantidad) {
      id
      productos {
        id
        nombre
        precio
        porcentaje
        cantidad
      }
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation updateProducto($id: ID!, $precio: Float!, $porcentaje: Float!) {
    updateProducto(id: $id, precio: $precio, porcentaje: $porcentaje) {
      id
      nombre
      precio
      porcentaje
    }
  }
`;

export const ADD_NEW_PRODUCTO = gql`
  mutation createProducto(
    $nombre: String!
    $precio: Float!
    $porcentaje: Float!
  ) {
    createProducto(
      productoInput: {
        nombre: $nombre
        precio: $precio
        porcentaje: $porcentaje
      }
    ) {
      id
      nombre
      precio
      porcentaje
    }
  }
`;

export const ADD_PRODUCTO_LISTA = gql`
  mutation createListaAddPro($proId: ID!, $idLista: ID, $cantidad: Int) {
    createListaAddPro(proId: $proId, idLista: $idLista, cantidad: $cantidad) {
      id
      productos {
        id
        nombre
        precio
        porcentaje
        cantidad
      }
    }
  }
`;

export const DELETE_PRODUCT_LISTA = gql`
  mutation deleteListaDelPro($proId: ID!, $idLista: ID!) {
    deleteListaDelPro(proId: $proId, idLista: $idLista)
  }
`;

export const DELETE_PRODUCTO = gql`
  mutation deleteProducto($proId: ID!) {
    deleteProducto(proId: $proId)
  }
`;
