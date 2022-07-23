import SecondaryBtn from '../button/SecondaryBtn';

function SearchBar(props){
    return (
    <form class="row g-3">
    <div class="col-auto">
        <label for="" class="visually-hidden">Find User</label>
        <input onChange={(e) => {props.setEnteredSearchParams(e.target.value)}} 
        type="text" 
        class="form-control" 
        placeholder={props.placeholder}/>
    </div>
    <div class="col-auto">
        <SecondaryBtn action={props.handleSearchParams} content={'Search'}/>
    </div>
    </form>)
}
export default SearchBar;