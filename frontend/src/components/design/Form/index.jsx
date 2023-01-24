import styles from "./index.module.css";

const Form = (props) => {
  return (
    <div className={styles.form__page}>
      {props.form_construct.map((form, index) => (
        <div className={styles.form__component} key={index}>
          {form.input === "label" && (
            <label className={styles.form__label}>{form.label}</label>
          )}

          {/* RADIO Button */}
          {form.input === "radio" && (
            <div className={styles.radio__form}>
              <input
                type="radio"
                className={styles.input__radio}
                id={form.value}
                name={form.name}
                value={form.value}
                onChange={(e) => form.set_var(e.target.value)}
              />
              <label className={styles.form__label} for={form.name}>
                {form.label}
              </label>
            </div>
          )}

          {/* File button */}
          {form.input === "file" && (
            <div className={styles.file__form}>
              <label className={styles.form__label}>{form.label}</label>
              <input
                type="file"
                className={styles.input__file}
                value={form.denote_var}
                onChange={(e) => form.set_var(e.target.value)}
              />
            </div>
          )}

          {/* Text input */}
          {form.input === "textarea" && (
            <div className={styles.textarea__form}>
              <label className={styles.form__label}>{form.label}</label>
              <textarea
                className={`${styles.form__textarea} ${styles.textArea__test}`}
                value={form.denote_var}
                onChange={(e) => form.set_var(e.target.value)}
              />
            </div>
          )}

          {/* Text input */}
          {form.input === "input" && (
            <div className={styles.textarea__form}>
              <label className={styles.form__label}>{form.label}</label>
              <input
                required
                className={`${styles.form__input} ${styles.form__input__test}`}
                value={form.denote_var}
                onChange={(e) => form.set_var(e.target.value)}
              />
            </div>
          )}

          {form.input === "password" && (
            <div className={styles.textarea__form}>
              <label className={styles.form__label}>{form.label}</label>
              <input
                type="password"
                required
                className={`${styles.form__input} ${styles.form__input__test}`}
                value={form.denote_var}
                onChange={(e) => form.set_var(e.target.value)}
              />
            </div>
          )}

          {/* Submit button */}
          {form.input === "button" && (
            <div className={styles.button__div}>
              <button className={styles.button__submit} onClick={form.onclick}>
                {form.label}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
