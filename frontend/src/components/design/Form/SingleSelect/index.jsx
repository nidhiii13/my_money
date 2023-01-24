import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// styles
import styles from "../index.module.css";

const SingleSelect = ({ options, title, label, setVal, valueSetter }) => {
  return (
    <div>
      <label className={styles.form__label}>{label}</label>
      <Autocomplete
        disablePortal
        options={options}
        getOptionLabel={(option) => option[title]}
        className={styles.singleSelect}
        onChange={(event, value) => {
          valueSetter ? setVal(value[valueSetter]) : setVal(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            className={styles.singleSelectField}
          />
        )}
      />
    </div>
  );
};

export default SingleSelect;
