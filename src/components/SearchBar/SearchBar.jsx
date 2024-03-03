import css from './SearchBar.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const searchBarSchema = Yup.object().shape({
  query: Yup.string()
    .min(3, 'Too short!')
    .max(10, 'Too long!')
    .required('Required!'),
});

export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: '' }}
      validationSchema={searchBarSchema}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <Form>
        <Field name="query" />
        <ErrorMessage className={css.error} name="query" as="span" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}

// const [query, setQuery] = useState('');

// const handleSubmit = e => {
//   e.preventDefault();
//   if (!query.trim() === '') {
//     alert('Please enter a search query');
//     return;
//   }
//   onSubmit(query);
//   setQuery('');
// };

// return (
//   <header className={css.header}>
//     <form onSubmit={handleSubmit} className={css.form}>
//       <input
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//       <button type="submit">Search</button>
//     </form>
//   </header>
// );
