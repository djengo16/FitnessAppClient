import Card from '../../components/card/Card';
import cardStyles from '../../components/card/card.module.css'
import styles from './login.module.css';
import { Formik, ErrorMessage } from 'formik';
import {login} from './../../utils/services/authService';
import {Navigate} from 'react-router-dom'
import { useState } from 'react';

export default function Login(){

  const [errorMessages, setErrorMessages] = useState({email: '', password: ''});
  const [navigate, setNavigate] = useState(false);

  function onFormSubmit (data){
    login(data)
    .then((user) => {
      setNavigate(true);
    }).catch((error) => {

    });
  }

return(
    <Card className={cardStyles['card-wrapper-10p']}>
      {navigate && <Navigate to="/home" />}
      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};

         if (!values.email) {
           errors.email = 'Error: Email must not be empty!';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Error: Invalid email address';
         }
         if(!values.password){
          errors.password = 'Error: Password must not be empty!';
         } else if(values.password.length < 6){
          errors.password = 'Error: Password must be at least 6 characters long!';
         }
         setErrorMessages(errors);
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           onFormSubmit(values);
           setSubmitting(false);
         }, 400);
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
         <form onSubmit={handleSubmit} className={styles['form']}>
          <label 
          name="email" 
          className={`${styles['form-label']} ${errorMessages.email ? styles['label-input-error'] : ''}`}>Email</label>
           <input
             type="email"
             name="email"
             id="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             className={`${styles['form-input']} ${errorMessages.email ? styles['form-input-error'] : ''}`}
           />
          <label 
          name="password" 
          className={`${styles['form-label']} ${errorMessages.password ? styles['label-input-error'] : ''}`}>Password</label>
           <input
             type="password"
             name="password"
             id="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             className={`${styles['form-input']} ${errorMessages.password ? styles['form-input-error'] : ''}`}
           />
           <div className={`${styles['form-error']}`}>
           <ErrorMessage className={styles['error-message']} name="email" component="span" />
           <ErrorMessage className={styles['error-message']} name="password" component="span" />
           <ErrorMessage className={styles['error-message']} name="server" component="span" />
           </div>
           <button 
           type="submit" 
           disabled={isSubmitting} 
           className={`${styles.btn} ${styles['btn-login']} `}>
             Login
           </button>
           <button 
           className={`${styles.btn} ${styles['btn-register']} `}>
            Register
           </button>
         </form>
       )}
     </Formik>
    </Card>
  )
}