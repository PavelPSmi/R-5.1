
const initialState = {
  name: "Ally",
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "change_name":
      return { ...state, name: payload };

    default:
      return state;
  }
};
