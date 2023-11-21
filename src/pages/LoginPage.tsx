import ky from "ky";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ky.post(`${config.apiAdminBaseUrl}/login`, {
      json: {
        ...formData,
      },
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data: any = await res.json();
          localStorage.setItem("user", JSON.stringify(data.data));
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-field flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-heading">Venue Admin Login</p>
      <input
        name="username"
        required
        className="w-full bg-transparent border-grayed focus:border-secondary border rounded-md focus:outline-none px-4 py-2"
        placeholder="Username"
        onChange={handleInputChange}
      />
      <input
        name="password"
        required
        className="w-full bg-transparent border-grayed focus:border-secondary border rounded-md focus:outline-none px-4 py-2"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <button
        disabled={!formData.username || !formData.password}
        type="submit"
        className="w-full rounded-md py-3 px-4 my-2 bg-primary disabled:bg-opacity-60 disabled:bg-grayed">
        Sign In
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-full rounded-md py-3 px-4 my-2">
        New Registration?
      </button>
    </form>
  );
};

export default LoginPage;
