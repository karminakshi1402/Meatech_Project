import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate =  useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values: {
  username: string;
  password: string;
}) => {
  try {
    const res = await axios.post("/login", values);

    dispatch(loginSuccess(res.data.token));
    navigate('/dashboard');
  } catch (error: any) {
    console.log(error.response?.data?.message);
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-4">
            {/* Username */}
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="text-red-500 text-sm">{serverError}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}