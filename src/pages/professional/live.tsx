import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Head from 'next/head';

import { Loader } from '../../components/Loader';
import Navbar from '../../components/Navbar';

const ProfessionalLive = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  const [proferssionalDetails, setProfessionalDetails] = useState<any>({});

  const fetchProfessionalDetails = async () => {
    const id = localStorage.getItem('token');
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://35.200.228.175:8080/v1/user/get-professional-user-details?userId=${id}`
      );
      setProfessionalDetails(response.data);
    } catch (error: any) {
      setErrorDetails(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionalDetails();
  }, []);

  if (!proferssionalDetails || isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  const hasActiveJob = proferssionalDetails?.jobDetails?.some(
    (job: any) => job.status === 'ACTIVE'
  );
  const hasPreviousJob = proferssionalDetails?.jobDetails?.some(
    (job: any) => job.status !== 'ACTIVE'
  );

  return (
    <>
      <Head>
        <title>Pragati Professionals</title>
        <meta name="description" content="Pragati Professionals" />
      </Head>
      <Navbar />
      <div className="flex min-h-full mx-auto max-w-4xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl sm:text-center">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                You have opted for <br />
                <span className="theme-red-color">
                  {proferssionalDetails?.skills?.[0].skill.split('_').join(' ')}
                </span>{' '}
                service at Pragati with charges of&nbsp;
                <span className="theme-red-color">
                  ₹{proferssionalDetails?.skills?.[0].rate}
                </span>
              </p>
            </blockquote>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Active Job -
          {!hasActiveJob?.length ? (
            <div className="text-center">
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                No Active Job
              </h1>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Please check back later for active jobs.
              </p>
            </div>
          ) : (
            <>
              <div className="flex min-w-0 gap-x-4 mt-6">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  }
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Carpenter
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    Saturday, 15th June 24
                  </p>
                </div>
              </div>
            </>
          )}
        </h2>

        <div className="border-t border-gray-300 my-4"></div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Previous Job -
        </h2>
        {!hasPreviousJob?.length ? (
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              No Active Job
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Please check back later for active jobs.
            </p>
          </div>
        ) : (
          <>
            <ul role="list" className="divide-y divide-gray-100">
              {hasPreviousJob.map((prevjob: any) => (
                <li
                  key={prevjob.email}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50 opacity-50 filter grayscale pointer-events-none"
                      src={prevjob.imageUrl}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {prevjob.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {prevjob.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {prevjob.role}
                    </p>
                    {prevjob.lastSeen ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Last seen{' '}
                        <time dateTime={prevjob.lastSeenDateTime}>
                          {prevjob.lastSeen}
                        </time>
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="border-t border-gray-300 my-4"></div>
        <div className="bg-white py-12 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              Trusted by the world’s most innovative firms
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://i.pinimg.com/736x/2c/64/6a/2c646ab2bff83408b14c2ab90a065713.jpg"
                alt="meesho"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://www.itln.in/h-upload/2024/02/08/1600x960_62502-valmo082.webp"
                alt="Reform"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div>

        {errorDetails && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {errorDetails}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfessionalLive;
