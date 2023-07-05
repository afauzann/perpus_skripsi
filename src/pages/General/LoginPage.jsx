import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../hooks/useLogin";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Alert = MySwal.mixin({
  toast: false,
  showConfirmButton: true,
  customClass: {
    container: "custom-toast",
  },
});

const LoginPage = () => {
  const baseValue = {
    email: "",
    password: "",
    role: "",
  };

  const baseErrors = {
    email: "",
  };

  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = Login();

  const regexEmailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "email") {
      if (!regexEmailValidation.test(value)) {
        setErrors({ ...errors, email: "Email tidak sesuai" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const uid = await login(values.email, values.password);
      await login(values.email, values.password);
      setTimeout(() => navigate("/dashboard"), 1000);
      // if (uid) {
      //   navigate(`/${uid}/dashboard`);
      // }
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setTimeout(
          () =>
            Alert.fire({
              icon: "error",
              title: <strong>Maaf!</strong>,
              text: "Password yang Anda masukkan salah",
              background: "#fef2f2",
              confirmButtonColor: "#fecaca",
            }),
          1000
        );
      }
      if (error.code === "auth/user-not-found") {
        setTimeout(
          () =>
            Alert.fire({
              icon: "error",
              title: <strong>Maaf!</strong>,
              text: "Email yang Anda masukkan belum terdaftar, mohon registrasi terlebih dahulu",
              background: "#fef2f2",
              confirmButtonColor: "#fecaca",
            }),
          1000
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="pb-2 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Masukkan email"
              required
              autoFocus
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && (
              <span className="mt-2 block text-sm text-red-700">
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Masukkan password"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
              onChange={handleChange}
              value={values.password}
            />
          </div>
          {loading ? (
            <button className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              <PulseLoader size={7} color={"#ffffff"} />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Login
            </button>
          )}
          <p className="text-center text-sm font-light text-gray-500 ">
            Belum memiliki akun?
            <Link
              to="/register"
              className="ml-1 font-medium text-indigo-600 hover:underline"
            >
              Daftar
            </Link>
           <br/>
            <Link
              to="/lupa-password"
              className="ml-1 font-medium text-indigo-600 hover:underline"
              >
              Lupa Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
