// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../config/axios";

// const token = () => localStorage.getItem("token");

// // ADD RATING
// export const addRating = createAsyncThunk(
//   "rating/add",
//   async (data, thunkAPI) => {
//     try {
//       const res = await axios.post("/rating/add", data, {
//         headers: {
//           Authorization: `Bearer ${token()}`
//         }
//       });
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Rating failed"
//       );
//     }
//   }
// );

// // GET MY RATINGS
// export const fetchMyRatings = createAsyncThunk(
//   "rating/my",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get("/user/getown/rating", {
//         headers: {
//           Authorization: `Bearer ${token()}`
//         }
//       });
//       return res.data;
//     } catch (err) {
//         console.log(err);
//       return thunkAPI.rejectWithValue("Failed to load ratings");
//     }
//   }
// );

// const ratingSlice = createSlice({
//   name: "rating",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addRating.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addRating.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addRating.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchMyRatings.fulfilled, (state, action) => {
//         state.items = action.payload;
//       });
//   }
// });

// export default ratingSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const addRating = createAsyncThunk(
  "rating/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      console.log("📡 API call /rating/add", data);

      const res = await axios.post(
        "/rating/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data;
    } catch (err) {
      console.error("❌ API ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Rating failed"
      );
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    resetRating: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRating.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetRating } = ratingSlice.actions;
export default ratingSlice.reducer;
