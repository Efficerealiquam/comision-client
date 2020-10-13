import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  DELETE_PRODUCT_LISTA,
  UPDATE_PRODUCT_LISTA,
} from "../graphql/getMutations";
import { GET_LISTA_QUERY } from "../graphql/getQuerys";
import { useForm } from "../hooks/hookForm";

function Home() {
  const { values, onChange, onSubmit } = useForm(updateProductoLista, {
    proId: "",
    idLista: "",
    cantidad: "",
  });
  var idLista = "";
  if (localStorage.getItem("idList")) {
    idLista = localStorage.getItem("idList");
  }
  const { data } = useQuery(GET_LISTA_QUERY, {
    variables: { idLista },
    onError(err) {
      console.log(err);
    },
  });

  values.idLista = idLista;
  values.cantidad = parseInt(values.cantidad, 10);

  const [updateProList] = useMutation(UPDATE_PRODUCT_LISTA, {
    variables: values,
    onError(err) {
      console.log(err);
    },
  });

  function updateProductoLista() {
    updateProList();
  }
  let listaData;
  let countPro;

  if (data) {
    listaData = data.getListaActual;

    countPro = data.getListaActual.productos.length;
  }
  var Sum = 0;
  const onChange2 = (params) => {
    Sum = Sum + params;
  };

  //DELETE_PRODUCT_LISTA
  const [proId, setProId] = useState("");
  const [deleteProList] = useMutation(DELETE_PRODUCT_LISTA, {
    onError(err) {
      console.log(err);
    },
    variables: { proId: proId, idLista: localStorage.getItem("idList") },
  });

  useEffect(() => {
    if (proId !== "") {
      deleteProList();
    }
    // eslint-disable-next-line
  }, [proId]);

  return (
    <div className="listHome">
      <h1>Lista de productos para Comisionar</h1>

      <section className="sectionAllMarcas">
        <ul
          className="ulLista"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {countPro > 0 ? (
            <>
              {listaData.productos &&
                listaData.productos.map((prod) => (
                  <li style={{ listStyle: "none" }} key={prod.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <form className="formList" onSubmit={onSubmit}>
                        <span className="numberItem" />
                        <span className="name">{prod.nombre} </span>
                        <span className="name">S/{prod.precio} </span>
                        <span className="name">%{prod.porcentaje} </span>
                        Cantidad:
                        <input
                          className="form-control "
                          name="cantidad"
                          onChange={onChange}
                          type="number"
                          defaultValue={prod.cantidad}
                          placeholder="Cantidad"
                        />
                        <span
                          className="name"
                          onChange={onChange2(
                            (prod.precio * prod.cantidad * prod.porcentaje) /
                              100
                          )}
                        >
                          C:{" "}
                          {(prod.precio * prod.cantidad * prod.porcentaje) /
                            100}{" "}
                        </span>
                        <button
                          className="ui teal basic button"
                          type="submit"
                          style={{ marginLeft: "25px" }}
                          onClick={() => (values.proId = prod.id)}
                        >
                          Actualizar
                        </button>
                      </form>
                      <div className="formList" style={{ paddingLeft: 0 }}>
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
                  <p className="lead">Aun no a agregado ni un producto</p>
                  <Link to="/productos" className="btn btn-success btn-block">
                    Agrege un Item
                  </Link>
                </div>
              </div>
            </>
          )}
          {countPro > 0 && (
            <div>
              Total:
              <input
                style={{ marginLeft: "5px" }}
                className="form-control "
                name="cantidad"
                type="text"
                defaultValue={Sum}
                disabled
              />
              <button
                className="btn1"
                style={{ marginLeft: "10px" }}
                onClick={() => localStorage.setItem("idList", "")}
              >
                <span className="sp1" />
                <span className="sp2" />
                <span className="sp3" />
                <span className="sp4" /> Nueva Lista
              </button>
            </div>
          )}
        </ul>
      </section>
    </div>
  );
}
export default Home;
