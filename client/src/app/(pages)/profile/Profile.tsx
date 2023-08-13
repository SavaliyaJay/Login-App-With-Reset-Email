/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import avatar from "../../../assets/profile.png";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
interface ProfileProps {
  firstName: string;
  lastName: string;
  mobileNumber?: number;
  email: string;
  address: string;
}
function convertToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
const Profile: React.FC = () => {
  const [file, setFile] = useState();

  const formik = useFormik<ProfileProps>({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: undefined,
      email: "",
      address: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      mobileNumber: yup
        .string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Phone Number is required."),
      email: yup.string().email().required("Email is required"),
      address: yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      toast.success("Profile saved!");
      const profile: any = file ? file : "";
      const data = {
        ...values,
        profile,
      };
      console.log(data);
    },
  });

  const onUpload = async (e: any) => {
    const base64: any = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="my-20 inset-0 flex items-center justify-center">
      <div className="relative flex w-[30rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Profile
          </h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-center">
            Happy to Join you
          </div>
          <div className="flex flex-col  p-6">
            <div className="profile flex flex-col gap-4 justify-center items-center">
              <Image
                src={file || avatar}
                alt="avatar"
                width={100}
                height={100}
                className="rounded-[15rem] w-[6rem] h-[6rem] border-4 border-white shadow-md shadow-blue-950/40"
              />
              <label
                className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                tabIndex={0}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-600">
                    files to Attach, or
                    <span className="text-blue-600 underline"> browse</span>
                  </span>
                </span>
                <input
                  id="photo-dropbox"
                  type="file"
                  className="sr-only"
                  onChange={onUpload}
                />
              </label>

              {/* <input type="file" onChange={onUpload} /> */}
            </div>
            <div className="flex flex-col gap-[2.5rem] p-6">
              <div className="flex flex-row gap-4">
                <div className="basis-1/2 relative h-11 w-1/2 ">
                  <input
                    {...formik.getFieldProps("firstName")}
                    type="text"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    First Name
                  </label>
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-600 mt-1">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="basis-1/2 relative h-11 w-1/2 ">
                  <input
                    {...formik.getFieldProps("lastName")}
                    type="text"
                    maxLength={6}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Last Name
                  </label>
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-600 mt-1">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="basis-1/2 relative h-11 w-1/2">
                  <input
                    {...formik.getFieldProps("mobileNumber")}
                    type="number"
                    maxLength={10}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Mobile Number
                  </label>
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div className="text-red-600 mt-1">
                      {formik.errors.mobileNumber}
                    </div>
                  ) : null}
                </div>
                <div className="basis-1/2 relative h-11 w-1/2 ">
                  <input
                    {...formik.getFieldProps("email")}
                    type="text"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="relative h-11 w-full">
                  <input
                    {...formik.getFieldProps("address")}
                    type="text"
                    maxLength={10}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Address
                  </label>
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-600 mt-1">
                      {formik.errors.address}
                    </div>
                  ) : null}
                </div>
              
              </div>
            </div>
          </div>
          <div className="p-6 pt-0 mt-5">
            <button
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Update
            </button>
            <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              Come back later?
              <Link
                href="/"
                className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 antialiased"
              >
                Logout
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
