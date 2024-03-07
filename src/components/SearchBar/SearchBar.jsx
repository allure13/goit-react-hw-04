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
    <header className={css.header}>
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
    </header>
  );
}
