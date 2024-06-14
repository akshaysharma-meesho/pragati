import React, { useEffect, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Employer = () => {
  const router = useRouter();
  const [selected, setSelected] = useState({
    skillName: 'Choose job',
    imageUrl: '',
  });
  const [minWage, setMinWage] = useState(200);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    numberOfWorkers: '',
    totalDays: '',
    wage: '',
  });

  const [allSkills, setAllSkills] = useState<any>([]);

  const fetchAllSkills = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://35.200.228.175:8080/v1/data/skill');
      setSelected(res.data.skills[0]);
      setAllSkills(res.data.skills);
    } catch (error: any) {
      setErrorDetails(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSkills();
  }, []);

  const handleJobSelect = (e: any) => {
    setSelected(e);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRequestSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      job_type: selected.skillName,
      start_date: '2024-06-14',
      end_date: '2024-06-20',
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      max_rate: minWage,
      required_professionals: formData.numberOfWorkers,
    };

    setIsLoading(false);

    try {
      const res = await axios.post(
        'http://35.200.228.175:8080/v1/recruiter/post-job',
        payload,
        {
          headers: {
            recruiter_id: localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        router.push('/employer/live');
      }
    } catch (error: any) {
      setErrorDetails(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pragati Professional Portal</title>
        <meta name="description" content="Pragati Professional Portal" />
      </Head>
      <Navbar />
      <div className="flex min-h-full mx-auto max-w-4xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              Your all <br />
              <span className="text-blue-500">PROFESSIONAL</span> needs at
              Pragati with charges range from <br />
              <span className="text-blue-500">₹99 to ₹999</span>.
            </p>
          </blockquote>
        </div>

        <form className="mt-12" onSubmit={handleRequestSubmit}>
          <Listbox value={selected} onChange={handleJobSelect}>
            {({ open }) => (
              <>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Select Profession
                </label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <img
                        src={selected?.imageUrl}
                        alt=""
                        className="h-5 w-5 flex-shrink-0 rounded-full"
                      />
                      <span className="ml-3 block truncate">
                        {selected?.skillName}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {allSkills.map((skill: any, index: number) => (
                        <Listbox.Option
                          key={index}
                          className={({ focus }: any) =>
                            classNames(
                              focus ? 'bg-indigo-600 text-white' : '',
                              !focus ? 'text-gray-900' : '',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                          }
                          value={skill}
                        >
                          {({
                            selected2,
                            focus,
                          }: {
                            selected2: any;
                            focus: any;
                          }) => (
                            <>
                              <div className="flex items-center">
                                <img
                                  src={skill.imageUrl}
                                  alt=""
                                  className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                                <span
                                  className={classNames(
                                    selected2 ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate'
                                  )}
                                >
                                  {skill.skillName}
                                </span>
                              </div>

                              {selected2 ? (
                                <span
                                  className={classNames(
                                    focus ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <div className="col-span-full mt-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
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

          <div className="sm:col-span-2 sm:col-start-1 mt-6">
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
                autoComplete="city"
                value={formData.city}
                onChange={handleChange}
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 mt-6">
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
                autoComplete="state"
                value={formData.state}
                onChange={handleChange}
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 mt-6">
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

          <div className="sm:col-span-3 mt-6">
            <label
              htmlFor="numberOfWorkers"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of workers
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="numberOfWorkers"
                id="numberOfWorkers"
                autoComplete="numberOfWorkers"
                value={formData.numberOfWorkers}
                onChange={handleChange}
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3 mt-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Total days
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="totalDays"
                id="totalDays"
                autoComplete="totalDays"
                value={formData.totalDays}
                onChange={handleChange}
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3 mt-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Wages per member
            </label>
            <div className="mt-2 justify-center flex flex-center items-center">
              <MinusCircleIcon
                className="h-8 w-8 text-gray-400 mr-4"
                aria-hidden="true"
                onClick={() => {
                  if (minWage > 0) {
                    setMinWage(minWage - 10);
                  }
                }}
              />
              <p className="text-3xl tracking-tight text-gray-900">
                ₹ {minWage > 0 ? minWage : 0}
              </p>
              <PlusCircleIcon
                className="h-8 w-8 text-gray-400 ml-4"
                aria-hidden="true"
                onClick={() => {
                  setMinWage(minWage + 10);
                }}
              />
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm w-full font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Employer;
