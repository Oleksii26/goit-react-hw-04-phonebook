import css from '../Phonebook/PhoneBook.module.css'

 const Filter = ({value, onChange}) => {
return <input className={css.input} type="text" name="filter" value={value} onChange={onChange}/>
}
export default Filter