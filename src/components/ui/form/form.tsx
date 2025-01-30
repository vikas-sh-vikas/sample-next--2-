import React, { ReactNode } from "react";
import styles from "./form.module.css";

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
  className?: string;
};

export default function Form(props: FormProps) {
  const { children, className = "", ...formProps } = props;
  return (
    <form
      {...formProps}
      action="return false"
      className={`${styles.form} ${styles[className]} ${className}`}
    >
      {children}
    </form>
  );
}

export function FormContent(props: Pick<FormProps, "children" | "className">) {
  return (
    <section className={`${styles.formContent} ${props.className}`}>
      {props.children}
    </section>
  );
}

export function FormHeader(props: Pick<FormProps, "children" | "className">) {
  return (
    <header className={`${styles.formHeader} ${props.className}`}>
      {props.children}
    </header>
  );
}

export function FormFooter(props: Pick<FormProps, "children" | "className">) {
  return (
    <footer className={`${styles.formFooter} ${props.className}`}>
      {props.children}
    </footer>
  );
}
