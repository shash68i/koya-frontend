import { useField } from "formik";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const creatableCustomStyles = {
  container: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    width: "100%",
    fontSize: "1.5rem",
    border: "none",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "1px solid hsl(0, 0%, 80%)",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    fontSize: "1.5rem",
  }),

  singleValue: (provided, state) => ({
    ...provided,
  }),

  input: (provided, state) => ({
    ...provided,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "15rem",
  }),
};

export default function FormikSelect(props) {
  const [options, setOptions] = useState([]);

  const [field, , helpers] = useField(props.field.name); // can pass 'props' into useField also, if 'props' contains a name attribute
  const { setValue } = helpers;

  const createOption = (label) => ({ label, value: label });

  const setFieldProps = (selectedOption, ActionTypes) => {
    if (ActionTypes.action === "create-option") {
      setOptions([...options, createOption(ActionTypes.option.value)]);
      setValue([...props.field.value, ActionTypes.option.value], true);
    } else {
      setValue(
        selectedOption.map((option) => option.value),
        true
      );
    }
  };


  return props.selectStyle === "Normal Select" ? (
    <Select
      styles={creatableCustomStyles}
      isMulti={false}
      placeholder={props.placeholder}
      name={field.name}
      onBlur={props.field.onBlur}
      onChange={(selectedOption) => setValue(selectedOption.value)}
      options={options}
      {...props}
    />
  ) : (
    <CreatableSelect
      styles={creatableCustomStyles}
      backspaceRemovesValue={true}
      isMulti
      blurInputOnSelect={props.field.onBlur}
      placeholder={props.placeholder}
      name={props.field.name}
      onBlur={field.onBlur}
      onChange={(selectedOption, ActionTypes) => {
        setFieldProps(selectedOption, ActionTypes);
      }}
      isClearable={false}
      options={options}
      {...props}
    />
  );
};
