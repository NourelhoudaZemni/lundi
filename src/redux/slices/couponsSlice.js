import { createSlice} from "@reduxjs/toolkit";
import { queryApi} from "../../utils/queryApi";
let initialState = {
    coupons: [],
selectedBrand: {},
errors: "",
};

const couponsSlice = createSlice({
name: "coupons",
initialState,
reducers: {
populateBrands(state, action) {
state.coupons = action.payload;
},
selectBrand(state, action) {
state.selectedBrand = action.payload;
},
unselectBrand(state) {
state.selectedBrand = null;
},
deleteBrand: (state, action) => {
const payload = action.payload;
const index = state.coupons.findIndex((item) => item._id === payload);
if (index !== -1) {
state.coupons.splice(index, 1);
}
},
updateBrand: (state, action) => {
const payload = action.payload;
const index = state.coupons.findIndex(
(item) => item._id === payload._id
);
if (index !== -1) {
state.coupons[index] = payload;
}
},
addBrand: (state, action) => {
const payload = action.payload;
state.coupons.push(payload);
},
setErrors(state, action) {
state.errors = action.payload;
},
},

});
export const fetchBrands = () => async (dispatch) => {
const [res, error] = await queryApi("coupon/readCoupon");
if (error) {
dispatch(setErrors(error));
} else {
dispatch(populateBrands(res));
}
};
export const selectBrands = (state) => {
return [state.coupons.coupons, state.coupons.errors];
};
export const selectSelectedBrand = (state) => {
return state.coupons.selectedBrand;
};
export const {
populateBrands,
selectBrand,
unselectBrand,
setErrors,
deleteBrand,
updateBrand,
addBrand,
} = couponsSlice.actions;
export default couponsSlice.reducer;