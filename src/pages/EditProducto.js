import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCTO_ID } from "../graphql/getQuerys";
import { UPDATE_PRODUCT } from "../graphql/getMutations";
import "../styles/sesion.css";
import { useForm } from "../hooks/hookForm";
function EditProducto(props) {
  const { id } = useParams();

  const { onChange, onSubmit, values } = useForm(upProduc, {
    precio: "",
    porcentaje: "",
  });

  //UPDATE_PRODUCT
  let producto = "";
  const { data } = useQuery(GET_PRODUCTO_ID, {
    variables: { proId: id },
  });
  if (data) {
    producto = data.getProducto;
  }

  let upProducto = {};
  upProducto.id = id;
  if (values.precio === "") {
    upProducto.precio = producto.precio;
  } else {
    upProducto.precio = values.precio;
  }

  if (values.porcentaje === "") {
    upProducto.porcentaje = producto.porcentaje;
  } else {
    upProducto.porcentaje = values.porcentaje;
  }

  upProducto.precio = parseFloat(upProducto.precio);
  upProducto.porcentaje = parseFloat(upProducto.porcentaje);

  const [updateProducto] = useMutation(UPDATE_PRODUCT, {
    update() {
      props.history.push("/productos");
    },
    onError(err) {
      console.log(err);
    },
    variables: upProducto,
  });
  function upProduc() {
    updateProducto();
  }
  return (
    <section style={{ height: "90vh" }}>
      <div className="containerR">
        <div className="user singinBx">
          {producto !== "" && (
            <div className="formBx " style={{ width: "100%" }}>
              <form style={{ textAlign: "center" }} onSubmit={onSubmit}>
                <h2>Editar Perfil</h2>
                <input
                  type="text"
                  name="nombre"
                  placeholder="nombre"
                  defaultValue={producto.nombre}
                  disabled
                />

                <input
                  type="number"
                  step="any"
                  name="precio"
                  placeholder="Precio"
                  defaultValue={producto.precio}
                  onChange={onChange}
                />

                <input
                  type="number"
                  step="any"
                  name="porcentaje"
                  placeholder="Porcentaje"
                  defaultValue={producto.porcentaje}
                  onChange={onChange}
                />
                <input className="btn1" type="submit" value="Editar" />
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default EditProducto;
