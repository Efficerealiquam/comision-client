import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { ADD_NEW_PRODUCTO } from "../graphql/getMutations";
import { useForm } from "../hooks/hookForm";
import "../styles/sesion.css";

function AddProducto(props) {
  const { onChange, onSubmit, values } = useForm(addPro, {
    nombre: "",
    precio: "",
    porcentaje: "",
  });

  values.precio = parseFloat(values.precio);
  values.porcentaje = parseFloat(values.porcentaje);

  const [addProducto] = useMutation(ADD_NEW_PRODUCTO, {
    update() {
      props.history.push("/productos");
    },
    onError(err) {
      console.log(err);
    },
    variables: values,
  });
  function addPro() {
    addProducto();
  }
  return (
    <section style={{ height: "90vh" }}>
      <div style={{ height: "700px" }} className="containerR">
        <div className="user singinBx">
          <div className="formBx " style={{ width: "100%" }}>
            <form style={{ textAlign: "center" }} onSubmit={onSubmit}>
              <h2>Nuevo Producto</h2>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={onChange}
              />

              <input
                type="text"
                name="precio"
                placeholder="Precio"
                onChange={onChange}
              />

              <input
                type="text"
                name="porcentaje"
                placeholder="Porcentaje"
                onChange={onChange}
              />
              <input className="btn1" type="submit" value="Añadir Producto" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AddProducto;
