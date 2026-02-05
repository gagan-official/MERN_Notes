let state = {
  post: 0,
  name: "Gagandeep Singh",
  age: 26,
};

function reducer(state, action) {
  if (action.type === "post/incrementBy")
    return { ...state, post: state.post + action.payload };
  return state;
}

console.log(state);
state = reducer(state, { type: "post/incrementBy", payload: 10 });
console.log(state);
