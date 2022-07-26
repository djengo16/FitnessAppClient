import styles from './searchbar.module.css'
import React from 'react';
import Button from '../button/Button';

const SearchBar = React.forwardRef((props, ref) =>{
    return (
    <form className={`row g-3`}>
    <div className={`${styles['form-col']} col-auto`}>
        <label for="" class="visually-hidden">Find User</label>
        <input 
        ref={ref} 
        type="text" 
        class="form-control" 
        placeholder={props.placeholder}/>
    </div>
    <div className={`${styles['form-col']} col-auto`}>
        <Button onClick={props.handleSearchParams} 
        buttonStyle="btn-secondary"
        buttonSize="btn-small">Search</Button>
    </div>
    </form>)
})
export default SearchBar;