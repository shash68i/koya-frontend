import { ErrorMessage, Field, Form, Formik } from "formik";

import FormikSelect from "../../components/FormikSelect";
import {
  allLocationOptions
} from "../../location";
import "./CreatePost.css";
import useStateUtils from "./utils/useStateUtils";

// const creatableCustomStyles = {
//   container: (provided, state) => ({
//     // none of react-select's styles are passed to <Control />
//     ...provided,
//     width: "100%",
//     fontSize: "1.5rem",
//     border: "none",
//   }),
//   control: (provided, state) => ({
//     ...provided,
//     border: "none",
//     borderBottom: "1px solid hsl(0, 0%, 80%)",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     color: "black",
//     fontSize: "1.5rem",
//   }),

//   singleValue: (provided, state) => ({
//     ...provided,
//   }),

//   input: (provided, state) => ({
//     ...provided,
//   }),
//   indicatorsContainer: (styles) => ({
//     ...styles,
//     paddingTop: 7,
//     paddingBottom: 7,
//   }),
// };

// const selectCustomStyles = {
//   container: (provided, state) => ({
//     // none of react-select's styles are passed to <Control />
//     ...provided,
//     width: "50%",
//     fontSize: "1.5rem",
//     border: "none",
//   }),
//   control: (provided, state) => ({
//     ...provided,
//     border: "none",
//     borderBottom: "1px solid hsl(0, 0%, 80%)",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     color: "black",
//     fontSize: "1.5rem",
//   }),

//   singleValue: (provided, state) => ({
//     ...provided,
//   }),

//   input: (provided, state) => ({
//     ...provided,
//   }),
//   indicatorsContainer: (styles) => ({
//     ...styles,
//     paddingTop: 7,
//     paddingBottom: 7,
//   }),
// };

export default function CreatePost({ handleClose }) {
  const { postData, postSchema, handlePostSubmit } = useStateUtils({
    handleClose,
  });

  return (
    <div className="add-post-container">
      <div className="add-post-card">
        <div className="add-post-section">
          <Formik
            initialValues={postData}
            validationSchema={postSchema}
            enableReinitialize={true}
            validateOnChange={false}
            onSubmit={handlePostSubmit}
          >
            <Form className="add-post-fields">
              <div className="edit-form-heading">Create Post</div>
              <div className="add-post-group">
                <Field id="text" name="text" autoComplete="off">
                  {({ field, form, meta }) => {
                    return (
                      <textarea
                        rows="8"
                        name={field.name}
                        placeholder="Type something here..."
                        id={field.id}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage className="error" component="div" name="text" />
              </div>

              <div className="add-post-group">
                <Field
                  name="tags"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  placeholder="Add Tags #"
                  component={FormikSelect}
                />
                <ErrorMessage className="error" component="div" name="tags" />
              </div>

              <div className="add-post-group">
                <Field
                  name="location"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  component={FormikSelect}
                  selectStyle="Normal Select"
                  options={allLocationOptions}
                  placeholder="Location"
                />
                <ErrorMessage
                  className="error"
                  component="div"
                  name="location"
                />
              </div>

              <div className="add-post-group">
                <Field
                  name="images"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  formatCreateLabel={(inputText) => `Add Image -> ${inputText}`}
                  placeholder="Add Images Url (Atleast 1)"
                  component={FormikSelect}
                />
                <ErrorMessage className="error" component="div" name="images" />
              </div>

              <div className="edit-group-btn">
                <button onClick={handleClose} className="action-button cancel">
                  Cancel
                </button>
                <button type="submit" className="action-button save">
                  Post
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
