
import { useEffect, useReducer ,useState} from "react";
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
  const [createdOrderId, setCreatedOrderId] = useState(null);
const [razorOrder, setRazorOrder] = useState(null);
const [receiptUrl, setReceiptUrl] = useState(null);



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
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("✅ Order created:", response.data);

    dispatch({ type: "ORDER_SUCCESS" });

    
    setCreatedOrderId(response.data.order._id);

    alert("🎉 Order confirmed! Now you can pay.");

  } catch (err) {
    console.error("❌ Order failed:", err.response?.data || err.message);

    dispatch({
      type: "ERROR",
      payload: err.response?.data?.error || "Order failed"
    });
  }
};


const createPayment = async () => {
  try {
    const { data } = await axios.post("/api/payment/create", {
      orderId: createdOrderId
    });

    console.log("💰 Payment init:", data);
    openRazorpay(data);

  } catch (err) {
    console.error("Payment init failed", err);
    alert("Unable to start payment");
  }
};



const openRazorpay = async (paymentData) => {
  try {
    const { data: keyData } = await axios.get("/api/payment/key");

    const options = {
      key: keyData.key,
      amount: paymentData.razorOrder.amount,
      currency: "INR",
      name: "Invicard Printo",
      description: "Order Payment",
      order_id: paymentData.razorOrder.id,

      handler: async function (response) {
        try {
          const verify = await axios.post("/api/payment/verify", {
            ...response,
            paymentId: paymentData.paymentId
          });

         
  
  if (verify.data.success) {
  alert("✅ Payment Successful!");

  const fullReceiptUrl = `http://localhost:3054${verify.data.receiptUrl}`;

  
  setReceiptUrl(fullReceiptUrl);
  // navigate("/customer/dashboard");




          } else {
            alert("❌ Payment verification failed");
          }

        } catch (err) {
          console.error("Verify error", err);
          alert("❌ Payment verification error");
        }
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
    console.error("Razorpay open failed", error);
    alert("Unable to open payment gateway");
  }
};





  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p style={{ color: "red" }}>{state.error}</p>;

  const d = state.design;

  return (
    <div className="details-container">
      <button
  onClick={() => window.history.back()}
  style={{
    marginBottom: "15px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  }}
>
  ← Back
</button>

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

        <button
  type="submit"
  className="btn"
  disabled={createdOrderId}
>
  Confirm Order
</button>


{createdOrderId && (
  <button
    type="button"
    onClick={createPayment}
    
    style={{
      marginLeft: "15px",
      backgroundColor: "green",
      color: "white",
      padding: "10px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    💳 Pay Now
  </button>
)}
{receiptUrl && (
  <button
    type="button"
    onClick={() => {
      const link = document.createElement("a");
      link.href = receiptUrl;
      link.download = "payment-receipt.pdf";
      link.click();
    }}
    style={{
      marginLeft: "15px",
      backgroundColor: "#0d6efd",
      color: "white",
      padding: "10px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    📄 Download Receipt
  </button>
)}



      </form>
    </div>
  );
}
