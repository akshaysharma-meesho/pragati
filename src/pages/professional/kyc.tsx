import React, { useState } from 'react';

import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Loader } from '../../components/Loader';
import Navbar from '../../components/Navbar';

const ProfessionKYC = () => {
  const router = useRouter();
  const userType = localStorage.getItem('userType') ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    aadharNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    localStorage.setItem('kycData', JSON.stringify(formData));

    setIsLoading(true);

    const dataPayload = {
      userId: localStorage.getItem('token'),
      address: {
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
      },
      markKyc: true,
      skillList: [],
    };

    try {
      const response = await axios.post(
        'http://35.200.228.175:8080/v1/user/edit-professional-user-details',
        dataPayload
      );

      if (userType === 'PROFESSIONAL') {
        if (response.data.kycVerified) {
          localStorage.setItem('isKYCDone', response.data.kycVerified);
        }

        if (!response.data.kycVerified) {
          setErrorData('Please try again after sometime!!!');
          return;
        }

        if (response.data.skills.length === 0) {
          router.push('/professional/skills');
          return;
        }

        if (response.data.skills.length > 0 && response.data.kycVerified) {
          router.push('/professional/live');
          return;
        }
      }
    } catch (error: any) {
      setErrorData(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Head>
        <title>Pragati Professional KYC Portal</title>
        <meta name="description" content="Pragati Professional KYC Portal" />
      </Head>
      <Navbar />
      <div className="flex min-h-full mx-auto max-w-4xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>Complete your KYC to start earning money</p>
            </blockquote>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="mobileNo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="mobileNo"
                      id="mobileNo"
                      autoComplete="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="aadharNo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Aadhar Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="aadharNo"
                      name="aadharNo"
                      type="text"
                      autoComplete="aadharNo"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full  px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="address-level1"
                      value={formData.state}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      autoComplete="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload File
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      name="file-upload"
                      id="file-upload"
                      className="block w-full px-2 py-1.5 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <>
                  <Loader /> Loading ...
                </>
              ) : (
                'Proceed'
              )}
            </button>
          </div>
          {errorData && (
            <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {errorData}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfessionKYC;
