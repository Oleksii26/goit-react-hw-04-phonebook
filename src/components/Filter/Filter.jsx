import css from '../Phonebook/PhoneBook.module.css'

const Filter = ({filter, onChange}) => {
return <input className={css.input} type="text" name="filter" value={filter} onChange={({target}) => onChange(target.value)}/>
}
export default Filter