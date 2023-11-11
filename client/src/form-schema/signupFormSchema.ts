import * as yup from 'yup';

const passwordPattern = /^.{8,}$/;

export const signupFormSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  username: yup.string().required('This field is required'),
  email: yup.string().email('Email must be a valid email').required('This field is required'),
  password: yup
    .string()
    .matches(passwordPattern, 'Password must be atleast 8 characters')
    .required('This field is required'),
});
