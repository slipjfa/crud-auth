import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../lib/validate";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [show, setShow] = useState({ password: false, cpassword: false });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}` + "/api/auth/signup",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`);
      });
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-5/6 lg:w-3/4 mx-auto flex flex-col gap-2 lg:gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold lg:text-4xl">Register</h1>
          <p className="w-4/5 mx-auto text-gray-400 text-xs lg:text-xl">Get in!</p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : "dark:border-[#1E5128]"
            }`}
          >
            <input
              type="text"
              name="Username"
              placeholder="Name"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="incon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {/* {formik.errors.username && formik.touched.username ? (
            <span className="text-xs text-rose-500">
              {formik.errors.username}
            </span>
          ) : (
            <> </>
          )} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : "dark:border-[#1E5128]"
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
                : "dark:border-[#1E5128]"
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="incon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? (
            <span className="text-xs text-rose-500">
              {formik.errors.password}
            </span>
          ) : (
            <> </>
          )} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : "dark:border-[#1E5128]"
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="incon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-xs text-rose-500">
              {formik.errors.cpassword}
            </span>
          ) : (
            <> </>
          )} */}

          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-700">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}
