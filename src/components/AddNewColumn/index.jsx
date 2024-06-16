import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from './addNewColumn.module.scss';

const columnTypes = ["text", "date", "select", "checkbox", "email"];

const AddNewColumn = ({ onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Column name is required"),
    type: Yup.string().oneOf(columnTypes, "Invalid column type").required("Column type is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", type: "text" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={style.form}>
          <div className={style.form__field}>
            <label htmlFor="name">Column Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className={style.form__field}>
            <label htmlFor="type">Column Type</label>
            <Field as="select" name="type">
              {columnTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Field>
            <ErrorMessage name="type" component="div" className="error" />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Add
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewColumn;