import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ADD_PRODUCTO_LISTA, DELETE_PRODUCTO } from "../graphql/getMutations";
import { GET_PRODUCTOS_QUERY } from "../graphql/getQuerys";
import "../styles/home.css";

function Productos() {
  const [idProducto, setIdProducto] = useState("");

  let idL = "";

  if (localStorage.getItem("idList")) {
    idL = localStorage.getItem("idList");
  }

  const [addProducto] = useMutation(ADD_PRODUCTO_LISTA, {
    update(_, data) {
      if (
        !localStorage.getItem("idList") ||
        localStorage.getItem("idList") === ""
      ) {
        localStorage.setItem("idList", data.data.createListaAddPro.id);
      }
    },
    variables: { proId: idProducto, idLista: idL, cantidad: 0 },
    onError(err) {
      // console.log(err);
    },
  });

  const { data } = useQuery(GET_PRODUCTOS_QUERY);

  let countPro;
  let listProductos;
  if (data) {
    listProductos = { data: data.getProductos };
    countPro = data.getProductos.length;
  }

  useEffect(() => {
    if (idProducto !== "") {
      addProducto();
    }
    // eslint-disable-next-line
  }, [idProducto]);
  //DELETE_PRODUCTO

  const [proId, setProId] = useState("");
  const [deleteProList] = useMutation(DELETE_PRODUCTO, {
    update(proxy) {
      let data = proxy.readQuery({
        query: GET_PRODUCTOS_QUERY,
      });

      data.getProductos = data.getProductos.filter((p) => p.id !== proId);

      proxy.writeQuery({ query: GET_PRODUCTOS_QUERY, data });
    },
    onError(err) {
      console.log(err);
    },
    variables: { proId: proId },
  });

  useEffect(() => {
    if (proId !== "") {
      deleteProList();
    }
    // eslint-disable-next-line
  }, [proId]);

  return (
    <div className="listHome">
      <h1>Lista de productos </h1>

      <section className="sectionAllMarcas">
        <ul
          className="ulLista"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {countPro > 0 ? (
            <>
              {listProductos.data &&
                listProductos.data.map((prod) => (
                  <li style={{ listStyle: "none" }} key={prod.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="formList">
                        <span className="numberItem" />
                        <span className="name">{prod.nombre} </span>
                        <span className="name">S/{prod.precio} </span>
                        <span className="name">%{prod.porcentaje} </span>
                        <Link
                          to={"/edit-producto/" + prod.id}
                          className="ui teal teal button"
                          type="submit"
                          style={{ marginLeft: "25px" }}
                        >
                          Editar
                        </Link>
                      </div>
                      <div className="formList">
                        <button
                          className="ui blue blue button"
                          onClick={() => setIdProducto(prod.id)}
                        >
                          Añadir
                        </button>
                      </div>
                      <div className="formList">
                        <button
                          className="ui red red button"
                          onClick={() => setProId(prod.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </>
          ) : (
            <>
              <div className="mx-auto">
                <div className="card-body">
                  <p className="lead">Aun no a creado ni un producto</p>
                  <Link to="/" className="btn btn-success btn-block">
                    Agrege un Item
                  </Link>
                </div>
              </div>
            </>
          )}
        </ul>
      </section>
    </div>
  );
}
export default Productos;
