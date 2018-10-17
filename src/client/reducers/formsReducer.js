
import * as types from '../constants/actionTypes';
import * as forms from '../forms';

const initialState = {
  logInFormFields: forms.blankLogInForm,
  registerFormFields: forms.blankRegisterForm,
  ticketFormFields: forms.blankTicketForm,
  ticketDisplay: [forms.sampleTicket1, forms.sampleTicket2, forms.sampleTicket3 ],
  formDisplay: forms.defaultFormDisplay,
};


const ticketsReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.SHOW_FORM:
      {
        //Copy initial state
        const newState = Object.assign({}, state);
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
        console.log(action.payload)
        const newState = Object.assign({}, state);
        if (action.payload.target.name === 'remember') {
          newState.LogInFormFields[action.payload.target.name] = action.payload.target.checked;
        } else {
          newState.LogInFormFields[action.payload.target.name] = action.payload.target.value;
        }

        return {
          ...state,
          logInFormFields: newState.LogInFormFields,
        }

      }

    case types.UPDATE_REGISTER_FORM:
      {

        //Copy initial state
        const newState = Object.assign({}, state);

        if (action.payload.event.target.name === 'cohort') {
          newState.registerFormFields[action.payload.event.target.name] = Number(action.payload.event.target.value);
        } else {
          newState.registerFormFields[action.payload.event.target.name] = action.payload.event.target.value;
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

        newState.ticketFormFields[action.payload.event.target.name] = action.payload.event.target.value

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

export default ticketsReducer;