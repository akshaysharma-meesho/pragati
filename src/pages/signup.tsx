import React, { useState } from 'react';

import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Loader } from '../components/Loader';

const Signup = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('PROFESSIONAL');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState('');

  const handleClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchProfessionalData = async (id: string) => {
    setIsLoading(false);
    try {
      const response = await axios.get(
        `http://35.200.228.175:8080/v1/user/get-professional-user-details?userId=${id}`
      );

      if (response.data.userType === 'RECRUITER') {
        router.push('/employer');
        return;
      }

      if (!response.data.kycVerified) {
        router.push('/professional/kyc');
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
    } catch (error: any) {
      setErrorData(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const dataPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.mobile,
      type: selectedOption,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://35.200.228.175:8080/v1/user/login-register',
        dataPayload
      );
      localStorage.setItem('userType', selectedOption);
      localStorage.setItem('token', response.data.userId);

      if (selectedOption === 'PROFESSIONAL') {
        fetchProfessionalData(response.data.userId);
      } else {
        router.push('/employer');
      }
    } catch (error: any) {
      setErrorData(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pragati Signup</title>
        <meta name="description" content="Pragati Signup page" />
      </Head>
      <html className="h-full bg-white">
        <body className="h-full">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-30 w-auto"
                src="/assets/images/logo.png"
                alt="Pragati"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <div className="flex justify-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleClick('PROFESSIONAL')}
                      className={`px-4 py-2 rounded-md w-full transition-colors focus:outline-none ${
                        selectedOption === 'PROFESSIONAL'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      Professional
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClick('RECRUITER')}
                      className={`px-4 py-2 rounded-md  w-full transition-colors focus:outline-none ${
                        selectedOption === 'RECRUITER'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      Recruiter
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="mobile"
                      name="mobile"
                      type="number"
                      autoComplete="number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader /> Loading ...
                      </>
                    ) : (
                      'Sign up'
                    )}
                  </button>
                </div>
              </form>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a user?{' '}
              <Link href="/login" passHref>
                <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Login
                </a>
              </Link>
            </p>
            {errorData && (
              <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
                {errorData}
              </div>
            )}
          </div>
        </body>
      </html>
    </>
  );
};

export default Signup;
