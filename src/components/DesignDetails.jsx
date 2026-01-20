// import { useEffect, useReducer } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../config/axios";

// const initialState = {
//   design: null,
//   loading: true,
//   error: "",

//   eventType: "",
//   quantity: 2,
//   paperType: "matte",
//   size: "A4",
//   description: "",
//   EventDate: "",

//   success: false
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "FETCH_SUCCESS":
//       return { ...state, design: action.payload, loading: false };

//     case "SET_FIELD":
//       return { ...state, [action.field]: action.value };

//     case "ORDER_SUCCESS":
//       return { ...state, success: true };

//     case "ERROR":
//       return { ...state, error: action.payload };

//     default:
//       return state;
//   }
// }

// export default function DesignDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     axios
//       .get(`/getdesign/${id}`)
//       .then((res) => {
//         dispatch({ type: "FETCH_SUCCESS", payload: res.data });
//       })
//       .catch(() => {
//         dispatch({ type: "ERROR", payload: "Design not found" });
//       });
//   }, [id]);

//   const placeOrder = () => {
//     axios
//       .post("/api/create/order", {
//         designId: state.design._id,
//         eventType: state.eventType,
//         quantity: state.quantity,
//         paperType: state.paperType,
//         size: state.size,
//         description: state.description,
//         EventDate: state.EventDate
//       })
//       .then(() => {
//         dispatch({ type: "ORDER_SUCCESS" });
//         alert("🎉 Order placed successfully!");
        
//         navigate("/customer/dashboard");
//       })
//       .catch((err) => {
//         dispatch({
//           type: "ERROR",
//           payload: err.response?.data?.error || "Order failed"
//         });
//       });
//   };

//   if (state.loading) return <p>Loading...</p>;
//   if (state.error) return <p style={{ color: "red" }}>{state.error}</p>;

//   const d = state.design;

//   return (
//     <div className="details-container">

      
//       <img
//         src={d.image[0]}
//         alt={d.title}
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           height: "auto",
//           borderRadius: "10px",
//           marginBottom: "20px"
//         }}
//       />

//       <h2>{d.title}</h2>
//       <p>{d.editableText}</p>
//       <p><b>Price per card:</b> ₹ {d.prize}</p>

      
//       <form
//         className="order-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           placeOrder();
//         }}
//       >
//         <h3>Place Your Order</h3>

//         <input
//           type="text"
//           placeholder="Event Type (Wedding, Birthday, Engagement...)"
//           value={state.eventType}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "eventType",
//               value: e.target.value
//             })
//           }
//           required
//         />

//         <input
//           type="number"
//           placeholder="Quantity (minimum 2 cards)"
//           min="2"
//           value={state.quantity}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "quantity",
//               value: Number(e.target.value)
//             })
//           }
//           required
//         />

//         <select
//           value={state.paperType}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "paperType",
//               value: e.target.value
//             })
//           }
//         >
//           <option value="">Select Paper Type</option>
//           <option value="matte">Matte</option>
//           <option value="glossy">Glossy</option>
//           <option value="texture">Texture</option>
//           <option value="standard">Standard</option>
//         </select>

//         <select
//           value={state.size}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "size",
//               value: e.target.value
//             })
//           }
//         >
//           <option value="">Select Card Size</option>
//           <option value="A4">A4</option>
//           <option value="A5">A5</option>
//         </select>

//         <textarea
//           placeholder="Enter invitation text / custom message"
//           value={state.description}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "description",
//               value: e.target.value
//             })
//           }
//           required
//         />

//         <input
//           type="date"
//           value={state.EventDate}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "EventDate",
//               value: e.target.value
//             })
//           }
//           required
//         />

//         <p>
//           <b>Total Price:</b> ₹ {state.quantity * d.prize}
//         </p>

//         <button type="submit" className="btn">
//           Confirm Order
//         </button>
//       </form>
//     </div>
//   );
// }


// import { useEffect, useReducer } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../config/axios";

// const initialState = {
//   design: null,
//   loading: true,
//   error: "",

//   eventType: "",
//   quantity: 2,
//   paperType: "matte",
//   size: "A4",
//   description: "",
//   EventDate: "",

//   success: false
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "FETCH_SUCCESS":
//       return { ...state, design: action.payload, loading: false };

//     case "SET_FIELD":
//       return { ...state, [action.field]: action.value };

//     case "ORDER_SUCCESS":
//       return { ...state, success: true };

//     case "ERROR":
//       return { ...state, error: action.payload };

//     default:
//       return state;
//   }
// }

// export default function DesignDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // ✅ Fetch design
//   useEffect(() => {
//     axios
//       .get(`/getdesign/${id}`)
//       .then((res) => {
//         dispatch({ type: "FETCH_SUCCESS", payload: res.data });
//       })
//       .catch(() => {
//         dispatch({ type: "ERROR", payload: "Design not found" });
//       });
//   }, [id]);

//   // ✅ FIXED PLACE ORDER FUNCTION (TOKEN ADDED)
//   const placeOrder = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("❌ Please login first");
//       return;
//     }

//     await axios.post(
//       "/api/create/order",
//       {
//         designId: state.design._id,
//         eventType: state.eventType,
//         quantity: state.quantity,
//         paperType: state.paperType,
//         size: state.size,
//         description: state.description,
//         EventDate: state.EventDate
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`   // ✅ IMPORTANT FIX
//         }
//       }
//     );

//     dispatch({ type: "ORDER_SUCCESS" });
//     alert("🎉 Order placed successfully!");
//     navigate("/customer/dashboard");

//   } catch (err) {
//     console.error("❌ Order failed:", err.response?.data || err.message);
//     dispatch({
//       type: "ERROR",
//       payload: err.response?.data?.message || "Order failed"
//     });
//   }
// };

//   if (state.loading) return <p>Loading...</p>;
//   if (state.error) return <p style={{ color: "red" }}>{state.error}</p>;

//   const d = state.design;

//   return (
//     <div className="details-container">

//       {/* ✅ Design Image */}
//       <img
//         src={d.image[0]}
//         alt={d.title}
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           height: "auto",
//           borderRadius: "10px",
//           marginBottom: "20px"
//         }}
//       />

//       <h2>{d.title}</h2>
//       <p>{d.editableText}</p>
//       <p><b>Price per card:</b> ₹ {d.prize}</p>

//       {/* ✅ ORDER FORM */}
//       <form
//         className="order-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           placeOrder();
//         }}
//       >
//         <h3>Place Your Order</h3>

//         <input
//           type="text"
//           placeholder="Event Type (Wedding, Birthday, Engagement...)"
//           value={state.eventType}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "eventType",
//               value: e.target.value
//             })
//           }
//           required
//         />

//         <input
//           type="number"
//           placeholder="Quantity (minimum 2 cards)"
//           min="2"
//           value={state.quantity}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "quantity",
//               value: Number(e.target.value)
//             })
//           }
//           required
//         />

//         <select
//           value={state.paperType}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "paperType",
//               value: e.target.value
//             })
//           }
//         >
//           <option value="">Select Paper Type</option>
//           <option value="matte">Matte</option>
//           <option value="glossy">Glossy</option>
//           <option value="texture">Texture</option>
//           <option value="standard">Standard</option>
//         </select>

//         <select
//           value={state.size}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "size",
//               value: e.target.value
//             })
//           }
//         >
//           <option value="">Select Card Size</option>
//           <option value="A4">A4</option>
//           <option value="A5">A5</option>
//         </select>

//         <textarea
//           placeholder="Enter invitation text / custom message"
//           value={state.description}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "description",
//               value: e.target.value
//             })
//           }
//           required
//         />

//         <input
//           type="date"
//           value={state.EventDate}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_FIELD",
//               field: "EventDate",
//               value: e.target.value
//             })
//           }
//           required
//         />

//         <p>
//           <b>Total Price:</b> ₹ {state.quantity * d.prize}
//         </p>

//         <button type="submit" className="btn">
//           Confirm Order
//         </button>
//       </form>
//     </div>
//   );
// }


import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";

const initialState = {
  design: null,
  loading: true,
  error: "",
  eventType: "",
  quantity: 2,
  paperType: "matte",
  size: "A4",
  description: "",
  EventDate: "",
  success: false
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, design: action.payload, loading: false };

    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "ORDER_SUCCESS":
      return { ...state, success: true };

    case "ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export default function DesignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`/getdesign/${id}`)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch(() => {
        dispatch({ type: "ERROR", payload: "Design not found" });
      });
  }, [id]);

  // const placeOrder = async () => {
  //   try {
  //     if (!state.design?._id) {
  //       alert("Design not loaded yet");
  //       return;
  //     }

  //     const response = await axios.post("/api/create/order", {
  //       designId: state.design._id,
  //       eventType: state.eventType,
  //       quantity: state.quantity,
  //       paperType: state.paperType,
  //       size: state.size,
  //       description: state.description,
  //       EventDate: state.EventDate
  //     });

  //     console.log("✅ Order response:", response.data);

  //     dispatch({ type: "ORDER_SUCCESS" });
  //     alert("🎉 Order placed successfully!");
  //     navigate("/customer/dashboard");

  //   } catch (err) {
  //     console.error("❌ Order failed:", err.response?.data);

  //     dispatch({
  //       type: "ERROR",
  //       payload: err.response?.data?.message || "Order failed"
  //     });
  //   }
  // };
  const placeOrder = async () => {
  try {
    if (!state.design?._id) {
      alert("Design not loaded yet");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Please login first");
      return;
    }

    const response = await axios.post(
      "/api/create/order",
      {
        designId: state.design._id,
        eventType: state.eventType,
        quantity: state.quantity,
        paperType: state.paperType,
        size: state.size,
        description: state.description,
        EventDate: state.EventDate
      },
      {
        headers: {
          Authorization: `Bearer ${token}`   // ✅ VERY IMPORTANT
        }
      }
    );

    console.log("✅ Order response:", response.data);

    dispatch({ type: "ORDER_SUCCESS" });
    alert("🎉 Order placed successfully!");
    navigate("/customer/dashboard");

  } catch (err) {
    console.error("❌ Order failed:", err.response?.data || err.message);

    dispatch({
      type: "ERROR",
      payload: err.response?.data?.error || "Order failed"
    });
  }
};


  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p style={{ color: "red" }}>{state.error}</p>;

  const d = state.design;

  return (
    <div className="details-container">
      <img
        src={d.image?.[0]}
        alt={d.title}
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      />

      <h2>{d.title}</h2>
      <p>{d.editableText}</p>
      <p><b>Price per card:</b> ₹ {d.prize}</p>

      <form
        className="order-form"
        onSubmit={(e) => {
          e.preventDefault();
          placeOrder();
        }}
      >
        <h3>Place Your Order</h3>

        <input
          type="text"
          placeholder="Event Type"
          value={state.eventType}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "eventType", value: e.target.value })
          }
          required
        />

        <input
          type="number"
          min="2"
          value={state.quantity}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "quantity", value: Number(e.target.value) })
          }
          required
        />

        <select
          value={state.paperType}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "paperType", value: e.target.value })
          }
        >
          <option value="matte">Matte</option>
          <option value="glossy">Glossy</option>
          <option value="texture">Texture</option>
          <option value="standard">Standard</option>
        </select>

        <select
          value={state.size}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "size", value: e.target.value })
          }
        >
          <option value="A4">A4</option>
          <option value="A5">A5</option>
        </select>

        <textarea
          placeholder="Enter message"
          value={state.description}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={state.EventDate}
          onChange={(e) =>
            dispatch({ type: "SET_FIELD", field: "EventDate", value: e.target.value })
          }
          required
        />

        <p>
          <b>Total Price:</b> ₹ {state.quantity * d.prize}
        </p>

        <button type="submit" className="btn">
          Confirm Order
        </button>
      </form>
    </div>
  );
}
