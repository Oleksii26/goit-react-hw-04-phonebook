import css from '../Phonebook/PhoneBook.module.css'

export const Filter = ({value, onChange}) => {
return <input className={css.input} type="text" name="filter" value={value} onChange={onChange}/>
}
