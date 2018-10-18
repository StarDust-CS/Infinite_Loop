export default {
  // Blank LogIn Form
  blankLogInForm: {
    email: '',
    password: '',
    remember: true,
  },

  // Blank Registration Form
  blankRegisterForm: {
    cohort: 0,
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    code: '',
  },

  // Blank Ticket Form
  blankTicketForm: {
    createdAt: Date.now(),
    studentID: 0,
    status: 'Open',
    category: '',
    title: '',
    problem: '',
    expect: '',
    tried: '',
    hypo: '',
  },

  // Pre-LogIn Blank User
  blankUser: {
    loggedIn: false,
    firstName: '',
    lastName: '',
    role: '',
    userID: 0,
  },

  // Pre-LogIn Form Display (default: show page 1 of login form)
  defaultFormDisplay: {
    showForm: true,
    formName: 'login',
    formPage: 1,
  },

  // Default Filters
  defaultFilterConfig: {
    status: 'ANY STATUS',
    category: 'ANY CATEGORY',
  },
};
