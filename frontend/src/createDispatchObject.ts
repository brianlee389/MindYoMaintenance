const createDispatchObject = (type, payload) => {
  return {
    type: type,
    payload: payload
  }
};

export default createDispatchObject;
