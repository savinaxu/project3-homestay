import React from 'react';
import { Field, reduxForm } from 'redux-form';

const RegisterForm = props => {
    // const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    // return (
    //   <form onSubmit={handleSubmit(submitCb)}>
    //     <Field
    //       name="username"
    //       type="text"
    //       label='Username'
    //       className='form-control'
    //     //   component={BwmInput}
    //     />
    //     <Field
    //       name="email"
    //       type="email"
    //       label='Email'
    //       className='form-control'
    //     //   component={BwmInput}
    //     />
    //     <Field
    //       name="password"
    //       type="password"
    //       label='Password'
    //       className='form-control'
    //     //   component={BwmInput}
    //     />
    //     <Field
    //       name="passwordConfirmation"
    //       type="password"
    //       label='Password Confirmation'
    //       className='form-control'
    //     //   component={BwmInput}
    //     />
    //     <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
    //       Register
    //     </button>
    //     {/* <BwmResError errors={errors} /> */}
    //   </form>
    // )

    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <div>
                    <Field
                        name="username"
                        component="input"
                        type="text"
                        placeholder="Username"
                        className='form-control'
                    />
                </div>
            </div>
            
            <div>
                <label>Email</label>
                <div>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                        className='form-control'
                    />
                </div>
            </div>

            <div>
                <label>Password</label>
                <div>
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        className='form-control'
                    />
                </div>
            </div>

            <div>
                <label>Confirmation Password</label>
                <div>
                    <Field
                        name="passwordConfirmation"
                        component="input"
                        type="password"
                        className='form-control'
                    />
                </div>
            </div>
            
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
}
  
  const validate = values => {
    const errors = {};
  
    if (values.username && values.username.length < 4) {
      errors.username = 'Username min length is 4 characters!';
    }
  
    if (!values.email) {
      errors.email = 'Please enter email!';
    }
  
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Please enter password confirmation!';
    }
  
    if (values.password !== values.passwordConfirmation) {
      errors.password = 'Passwords must be the same';
    }
  
    return errors;
  }
  
  export default reduxForm({
    form: 'registerForm',
    validate
  })(RegisterForm)