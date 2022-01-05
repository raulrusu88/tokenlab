import { useAuth } from "@context/AuthContext";
import { Layout } from "@layouts/Layout";
import { FormEvent, useRef } from "react";

export default function SignUp() {
  const { createUserWithEmailAndPass } = useAuth();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleSubmit = (
    email: string,
    password: string,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    createUserWithEmailAndPass(email, password);
  };

  return (
    <Layout>
      <form
        onSubmit={(e) =>
          handleSubmit(emailRef.current.value, passwordRef.current.value, e)
        }
      >
        <input placeholder="email" ref={emailRef} type="email" />
        <input placeholder="password" ref={passwordRef} type="password" />
        <button type="submit">sign up</button>
      </form>
    </Layout>
  );
}
