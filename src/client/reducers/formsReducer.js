
import * as types from '../constants/actionTypes';
import * as forms from '../forms';

const initialState = {
  logInFormFields: forms.blankLogInForm,
  registerFormFields: forms.blankRegisterForm,
  ticketFormFields: forms.blankTicketForm,
  ticketDisplay: [forms.sampleTicket1, forms.sampleTicket2, forms.sampleTicket3 ],
  formDisplay: forms.defaultFormDisplay,
};


const formsReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.SHOW_FORM:
      {
        //Copy initial state
        const newState = JSON.parse(JSON.stringify(state));
        //create new user 
        const newFormDisplay = {
          showForm: true,
          formName: action.payload.target.value,
          formPage: 1
        }

        if (action.payload.target.value === 'ticket') {
          newState.ticketFormFields = userInfo.userID
        }

      }
      return {
        ...state,
        formDisplay: newFormDisplay,
        ticketFormFields: newState.ticketFormFields,

      }
    case types.UPDATE_FORM:
      {
        //Copy initial state
        const newState = JSON.parse(JSON.stringify(state));
        if (action.payload.target.name === 'remember') {
          newState.logInFormFields[action.payload.target.name] = action.payload.target.checked;
        } else {
          console.log('in else', action.payload.target.value)
          console.log('current state', state)
          newState.logInFormFields[action.payload.target.name] = action.payload.target.value;
          console.log('nestate', newState.logInFormFields[action.payload.target.name])
        }

        return {
          ...state,
          logInFormFields: newState.logInFormFields,
        }

      }

    case types.UPDATE_REGISTER_FORM:
      {

        //Copy initial state
        const newState = JSON.parse(JSON.stringify(state));

        if (action.payload.event.target.name === 'cohort') {
          newState.registerFormFields[action.payload.target.name] = Number(action.payload.target.value);
        } else {
          newState.registerFormFields[action.payload.target.name] = action.payload.target.value;
        }

        return {
          ...state,
          registerFormFields: newState.registerFormFields
        }

      }

    case types.SIGNUP_CHANGED_HANDLER:
      {
        //Copy initial state
        const newState = Object.assign({}, state);

        /**
         * singup_changed_handler doesnt do anything.
         * updates state.role which doesnt exist
         */
        return {
          ...state,
        }



      }
    case types.SUBMIT_TICKET:
      {
        //Copy initial state
        const newState = Object.assign({}, state);

        if (action.payload.event.target.value === 'Continue') {
          newState.newFormDisplay.formPage += 1;
          newState.newFormFields.createdAt = Date.now();
        } else if (action.payload.event.target.value === 'Submit') {
          newState.formDisplay = forms.defaultFormDisplay
          newState.ticketFormFields = forms.blankTicketDisplay
        }
        return {
          ...state,
          newFormDisplay: newState.newFormDisplay,
          formDisplay: newState.formDisplay,
          ticketFormFields: newState.ticketFormFields
        }
      }

    case types.UPDATE_TICKET_FORM:
      {
        //Copy initial state
        const newState = Object.assign({}, state);

        newState.ticketFormFields[action.payload.target.name] = action.payload.target.value

        return {
          ...state,
          ticketFormFields: newState.ticketFormFields
        }
      }
    
    case types.FETCH_DATA: 
    {
      //Copy initial state
      const newState = Object.assign({}, state);

      


    }

    default:
      return state;
  }
};

export default formsReducer;