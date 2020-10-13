import gql from "graphql-tag";

export const GET_LISTA_QUERY = gql`
  query($idLista: ID!) {
    getListaActual(idLista: $idLista) {
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
export const GET_PRODUCTOS_QUERY = gql`
  {
    getProductos {
      id
      nombre
      precio
      porcentaje
    }
  }
`;

export const GET_PRODUCTO_ID = gql`
  query($proId: ID!) {
    getProducto(proId: $proId) {
      id
      nombre
      precio
      porcentaje
    }
  }
`;
