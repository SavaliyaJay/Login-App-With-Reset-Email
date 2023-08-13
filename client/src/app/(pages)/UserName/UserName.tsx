/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { use, useEffect } from "react";
import toast from "react-hot-toast";
import avatar from "../../../assets/profile.png";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";

interface UserNameProps {
  username: string;
}

const UserName: React.FC = () => {
  const formik = useFormik<UserNameProps>({
    initialValues: {
      username: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      toast.success("Username saved!");
      console.log(values);
    },
  });

  return (
    <div className="fixed my-20 inset-0 flex items-center justify-center">
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Sign In
          </h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-center">
            Explore More by connecting with us.
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="profile flex justify-center ">
              <Image
                src={avatar}
                alt="avatar"
                className="rounded-[15rem] w-[6rem] h-[6rem] border-4 border-white shadow-md shadow-blue-950/40"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...formik.getFieldProps("username")}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Username
              </label>
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600 mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
          </div>
          <div className="p-6 pt-0 mt-5">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Let&#39;s Go
            </button>
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Not a Member ?
              <Link
                href="/register"
                className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 antialiased"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserName;
