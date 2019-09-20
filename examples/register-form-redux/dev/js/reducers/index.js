const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  address: null,
  description: null,
  phone: null,
  about: null,
  currentStep: 1
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_RECORD":
      return Object.assign({}, state, {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        password: action.payload.password,
        currentStep: getNextStep(state)
      });
    case "SAVE_RECORD_TWO":
      return Object.assign({}, state, {
        address: action.payload.address,
        description: action.payload.description,
        phone: action.payload.phone,
        about: action.payload.about,
        currentStep: getNextStep(state)
      });

    case "NEXT_STEP":
      return Object.assign({}, state, { currentStep: getNextStep(state) });

    case "PREV_STEP":
      return Object.assign({}, state, { currentStep: getPrevStep(state) });
  }
  return state;
};

const getNextStep = state => {
  return ++state.currentStep;
};

const getPrevStep = state => {
  return --state.currentStep;
};

export default DataReducer;
