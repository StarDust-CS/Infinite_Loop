


// Blank LogIn Form
export const blankLogInForm = {
  email: '',
  password: '',
  remember: true,
};

// Blank Registration Form
export const blankRegisterForm = {
  cohort: 0,
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  code: '',
};

// Blank Ticket Form
export const blankTicketForm = {
  createdAt: Date.now(),
  studentID: 0,
  status: 'Open',
  category: '',
  title: '',
  problem: '',
  expect: '',
  tried: '',
  hypo: '',
};

// Pre-LogIn Blank User
export const blankUser = {
  loggedIn: false,
  firstName: '',
  lastName: '',
  role: '',
  userID: 0,
};

// Pre-LogIn Blank Ticket Array
export const blankTicketDisplay = {
  notStarted: [],
  inProgress: [],
  closed: [],
};

// Pre-LogIn Form Display (default: show page 1 of login form)
export const defaultFormDisplay = {
  showForm: true,
  formName: 'login',
  formPage: 1,
};


// TODO: DELETE - Sample Tickets
export const sampleTicket1 = {
  status: 'OPEN',
  ticketID: 3,
  title: 'Data Rendering in React',
  studentFullName: 'Joel Perkins',
  createdAt: new Date(),
  fellowFullName: '',
  category: 'React/Redux',
  problem: 'trouble getting data to render on the page',
  expect: 'updating state with incoming data, using thunk to wait for the data. It console logs aftert it arrives however we are unsure if it is saving to the state properly',
  tried: 'google, console logging data..console logs come back as undefined',
  hypo: 'dispatch is not firing to update the store properly',
};

export const sampleTicket2 = {
  status: 'IN PROGRESS',
  ticketID: 2,
  title: 'React Component Reuse',
  studentFullName: 'Ha-Rry Kim',
  createdAt: new Date(),
  fellowFullName: 'Stephanie Fong',
  category: 'React/Redux',
  problem: 'Having trouble reusing same component for react',
  expect: 'Render on browser',
  tried: 'Make separate component to pass down the prop',
  hypo: 'It is not recognizing props?',
};

export const sampleTicket3 = {
  status: 'CLOSED',
  ticketID: 1,
  title: 'Website Code Loading',
  studentFullName: 'Elliot Kim',
  createdAt: new Date(),
  fellowFullName: '',
  category: 'JS Fundamentals',
  problem: 'Load our code onto webpage',
  expect: 'Code loading onto webpage',
  tried: 'Tried to research errors and also tried commenting out things to figure out why it is not loading',
  hypo: 'Because I am a WINNER (thanks Sam), just not this time',
};