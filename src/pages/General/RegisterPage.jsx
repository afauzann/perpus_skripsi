import React from "react";
import { Link, useNavigate } from "react-router-dom";

// import icon from "../../assets/img/svg/Icon.svg";
import { PulseLoader } from "react-spinners";
import Register from "../../hooks/useRegister";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";

const MySwal = withReactContent(Swal);

const Alert = MySwal.mixin({
	toast: false,
	showConfirmButton: true,
	customClass: {
		container: "custom-toast",
	},
});

const RegisterPage = () => {
	const baseValue = {
		name: "",
		email: "",
		password: "",
		role: "siswa",
	};

	const baseErrors = {
		name: "",
		email: "",
		password: "",
	};

	const [values, setValues] = useState(baseValue);
	const [errors, setErrors] = useState(baseErrors);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const register = Register();

	const regexNameValidation = /^[a-zA-Z\s]*$/;
	const regexEmailValidation =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const regexPasswordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});

		validation(name, value);
	};

	const validation = (name, value) => {
		if (name === "name") {
			if (!regexNameValidation.test(value)) {
				setErrors({ ...errors, name: "Nama harus berupa huruf" });
			} else {
				setErrors({ ...errors, name: "" });
			}
		}

		if (name === "email") {
			if (!regexEmailValidation.test(value)) {
				setErrors({ ...errors, email: "Email tidak sesuai" });
			} else {
				setErrors({ ...errors, email: "" });
			}
		}

		if (name === "password") {
			if (!regexPasswordValidation.test(value)) {
				setErrors({ ...errors, password: "Password harus berisi huruf kapital dan angka" });
			} else if (value.length <= 8) {
				setErrors({ ...errors, password: "Password harus lebih dari 8 karakter" });
			} else {
				setErrors({ ...errors, password: "" });
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await register(values.name, values.email, values.password, values.role);
			setTimeout(() => navigate("/"), 2000);
			setLoading(false);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				setTimeout(
					() =>
						Alert.fire({
							icon: "error",
							title: <strong>Maaf!</strong>,
							text: "Email sudah digunakan, coba daftarkan email yang lain",
							background: "#fecaca",
							confirmButtonColor: "#fee2e2",
						}),
					2000
				);
			}
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
			{/* <Helmet>
				<title>Register Page</title>
				<meta name="description" content="Melakukan rekap nilai" />
			</Helmet> */}
			{/* <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:max-w-xl xl:p-0">
				<Link to="/" className="flex items-center justify-center pt-6 text-2xl font-semibold text-gray-900">
					<img src={icon} className="h-12 w-12" alt="Logo" />
				</Link> */}
				<form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8 md:space-y-6">
					<h1 className="pb-2 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Register</h1>
					<div className="md:col-span-2">
						<div className="space-y-4 md:space-y-6">
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Nama</span>
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Masukkan nama"
										required
										autoFocus
										value={values.name}
										onChange={handleChange}
									/>
									{errors.name && <span className="mt-2 block text-sm text-red-700">{errors.name}</span>}
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Email</span>
									</label>
									<input
										type="email"
										name="email"
										id="email"
										placeholder="Masukkan nama belakang"
										className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										required
										value={values.email}
										onChange={handleChange}
									/>
									{errors.email && <span className="mt-2 block text-sm text-red-700">{errors.email}</span>}
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Password</span>
									</label>
									<input
										type="password"
										name="password"
										id="password"
										className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Masukkan password"
										required
										value={values.password}
										onChange={handleChange}
									/>
									{errors.password && <span className="mt-2 block text-sm text-red-700">{errors.password}</span>}
								</div>
							</div>
							{loading ? (
								<button className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
									<PulseLoader size={7} color={"#ffffff"} />
								</button>
							) : (
								<button
									type="submit"
									className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
									Register
								</button>
							)}
							<p className="text-center text-sm font-light text-gray-500 ">
								Sudah memiliki akun?
								<Link to="/" className="ml-1 font-medium text-indigo-600 hover:underline">
									Login
								</Link>
							</p>
						</div>
					</div>
				</form>
			{/* </div> */}
		</div>
	);
};

export default RegisterPage;
