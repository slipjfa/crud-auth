import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_BASE_URL });
  }

  async function handleGithubSignIn() {
    signIn("github", { callbackUrl: process.env.NEXT_PUBLIC_BASE_URL });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-6">
        <div className="title">
          <h1 className="text-gray-800 text-4xl dark:text-gray-200 font-bold">
            Explore
          </h1>
          <p className="w-4/5 mx-auto text-gray-400 dark:text-gray-400 text-sm">
            Take a look around. It works!
          </p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="incon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? (
            <span className="text-xs text-rose-500">{formik.errors.email}</span>
          ) : (
            <> </>
          )} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="incon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? (
            <span className="text-xs text-rose-500">
              {formik.errors.password}
            
          ) : (
            <> </>
          )} */}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={styles.button_custom}
            >
              Sign In with Google{" "}
              <Image
                src={"/assets/google.svg"}
                width={20}
                height={20}
                alt="google"
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGithubSignIn}
              className={styles.button_custom}
            >
              Sign In with Github{" "}
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
                alt="github"
              ></Image>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm">
          No account?{" "}
          <Link href={"/register"} className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
}
