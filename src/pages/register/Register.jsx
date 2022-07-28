import Card from '../../components/card/Card';
import cardStyles from '../../components/card/card.module.css'
import formStyles from '../../styles/form.module.css';
import errorMessageConstats from '../../utils/messages/errorMessages';
import { Formik, ErrorMessage } from 'formik';
import {register} from './../../utils/services/authService';
import {Link, Navigate} from 'react-router-dom'
import { useState } from 'react';
import Button from '../../components/button/Button';

export default function Register(){

  const [errorMessages, setErrorMessages] = useState({email: '', password: '', confirmPassword: ''});
  const [navigate, setNavigate] = useState(false);

return(
    <Card className={cardStyles['card-wrapper-10p']}>
      {navigate && <Navigate to="/home" />}
      <Formik
       initialValues={{email: '', password: '', confirmPassword: ''}}
       validate={values => {
         const errors = {};

         if (!values.email) {
            errors.email = `Error: ${errorMessageConstats.emptyEmail}`;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = `Error: ${errorMessageConstats.invalidEmail}`;
          }
          if(!values.password){
           errors.password = `Error: ${errorMessageConstats.emptyPassword}`;
          } else if(values.password.length < 6){
           errors.password = `Error: ${errorMessageConstats.passwordMinLength}`;;
          }else if (values.password !== values.confirmPassword){
            errors.confirmPassword = `Error: ${errorMessageConstats.passwordsMatch}`;;
          }


          setErrorMessages(errors);
          return errors;
        }}
       onSubmit={(values, { setSubmitting, setFieldError }) => {

          register(values).then(() =>
          setNavigate(true)
          ).catch((err) => {
            setFieldError('server', err.message);
          }).finally(() => {
           setSubmitting(false);
          })
       }}
     >
       {({
         values,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit} className={formStyles['form']}>
          <label 
          name="email" 
          className={`${formStyles['form-label']} ${errorMessages.email ? formStyles['label-input-error'] : ''}`}>Email</label>
           <input
             type="email"
             name="email"
             id="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             className={`${formStyles['form-input']} ${errorMessages.email ? formStyles['form-input-error'] : ''}`}
           />
          <label 
          name="password" 
          className={`${formStyles['form-label']} ${errorMessages.password ? formStyles['label-input-error'] : ''}`}>Password</label>
           <input
             type="password"
             name="password"
             id="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             className={`${formStyles['form-input']} ${errorMessages.password ? formStyles['form-input-error'] : ''}`}
           />
           <label 
          name="confirmPassword" 
          className={`${formStyles['form-label']} ${errorMessages.confirmPassword ? formStyles['label-input-error'] : ''}`}>Confirm Password</label>
           <input
             type="password"
             name="confirmPassword"
             id="confirmPassword"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.confirmPassword}
             className={`${formStyles['form-input']} ${errorMessages.confirmPassword ? formStyles['form-input-error'] : ''}`}
           />
           <div className={`${formStyles['form-error']}`}>
           <ErrorMessage className={formStyles['error-message']} name="email" component="span" />
           <ErrorMessage className={formStyles['error-message']} name="password" component="span" />
           <ErrorMessage className={formStyles['error-message']} name="confirmPassword" component="span" />
           <ErrorMessage className={formStyles['error-message']} name="server" component="span" />
           </div>
           <div className={'d-flex justify-content-between'}>
              <Button 
               type="submit" 
               disabled={isSubmitting} 
               buttonStyle='btn-secondary'
               buttonSize='btn-small'>
                 Register
               </Button>
               <Button>
                 <Link to='/login'>
                  Login
                 </Link>
               </Button>
           </div>
         </form>
       )}
     </Formik>
    </Card>
  )
}