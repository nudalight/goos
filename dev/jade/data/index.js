module.exports.data = {
  formContent: {
    name: {
      element: 'input',
      label: 'Name',
      type: 'text',
      required: true,
      validators: {
        validateMe: true
      },
      error: 'Should be between 2 and 15 chars'
    },
    surname: {
      element: 'input',
      label: 'Surname',
      type: 'text',
      required: true,
      validators: {
        validateMe: true
      },
      error: 'Should be between 2 and 20 chars'
    },
    birthday: {
      element: 'datepicker',
      label: 'Day of birth',
      placeholder: 'yyyy-mm-dd',
      required: true,
      validators: {
        validateMe: true
      },
      error: 'You must be 18 years old',
      errorDate: 'Date format must be yyyy-mm-dd'
    },
    phone: {
      element: 'input',
      label: 'Phone',
      type: 'text',
      required: true
    },
    country: {
      element: 'input',
      label: 'Country',
      type: 'text',
      required: true
    },
    city: {
      element: 'input',
      label: 'City',
      type: 'text',
      required: true
    },
    street: {
      element: 'input',
      label: 'Street',
      type: 'text'
    },
    username: {
      label: 'Username',
      element: 'input',
      type: 'text',
      required: true,
      validators: {
        validateMe: true
      },
      error: 'Must contain 6-15 chars'
    },
    password: {
      element: 'input',
      label: 'Password',
      type: 'password',
      validators: {
        validateMe: true
      },
      required: true,
      error: 'Minimum 6 letters, needs to have at least one capital letter and number, allowed characters are only letters and numbers'
    },
    repassword: {
      element: 'input',
      label: 'Confirm password',
      type: 'password',
      required: true,
      validators: {
        sameAs: 'password'
      },
      error: 'Must be equal to password field'
    },
    employmentStatus: {
      label: 'Employment Status',
      element: 'select',
      required: true,
      data: [
        {
          value: 'employed',
          label: 'Employed'
        },
        {
          value: 'unemployed',
          label: 'Unemployed'
        },
        {
          value: 'student',
          label: 'Student'
        }
      ],
      error: 'Required'
    },
    employmentPlace: {
      element: 'select',
      label: 'Place of employment',
      display: 'employmentStatus == "employed"',
      required: 'employmentStatus == "employed"',
      data: [
        {
          value: 'ms',
          label: 'Microsoft'
        },
        {
          value: 'apple',
          label: 'Apple'
        }
      ],
      error: 'ERROR'
    },
    annualIncome: {
      label: 'Annual Inconme',
      element: 'select',
      data: [
        {
          value: '100',
          label: '$100.000 / year'
        },
        {
          value: '200',
          label: '$200.000 / year'
        },
        {
          value: '300',
          label: '$300.000 / year'
        }
      ],
      required: true
    },
    favouriteSport: {
      label: 'Favourite Sport',
      element: 'input',
      type: 'text'
    },
    acceptTerms: {
      label: 'I accept terms and conditions',
      element: 'checkbox',
      required: true
    }
  }


  ,




  upper: function(str){

  }




};
