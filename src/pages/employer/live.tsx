import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';
import { formatDate } from '../../utils/utils';

const EmployerLive = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState('');

  const [employerData, setEmployerData] = useState<any>({});

  const fetchRecruiterDetails = async () => {
    const userId = localStorage.getItem('token');
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://35.200.228.175:8080/v1/user/get-recruiter-user-details?userId=${userId}`
      );
      setEmployerData(res.data);
    } catch (e: any) {
      setErrorData(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(isLoading);

  useEffect(() => {
    fetchRecruiterDetails();
  }, []);

  const activeJobRequests = employerData?.jobDetails?.filter(
    (jobs: any) => jobs?.jobStatus === 'IN_PROGRESS'
  );

  const previousJobRequests = employerData?.jobDetails?.filter(
    (jobs: any) => jobs?.jobStatus !== 'IN_PROGRESS'
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
                  {activeJobRequests?.[0]?.skill
                    ? activeJobRequests?.[0]?.skill.split('_').join(' ')
                    : 'DELIVERY AGENT'}
                </span>{' '}
                service at Pragati. Looking forward to help you soon.
              </p>
            </blockquote>
            <button
              type="submit"
              onClick={() => router.push('/employer')}
              className="mt-4 flex mx-auto items-center justify-center rounded-md border border-transparent theme-red-bg px-8 py-3 text-base font-medium text-white hover:theme-red-bg focus:outline-none focus:ring-2 focus:theme-red-bg focus:ring-offset-2"
            >
              Post New Job
            </button>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Active Consignments -
          {!activeJobRequests?.length ? (
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
              {activeJobRequests?.map((job: any, index: number) => (
                <>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    You have a active job requests of{' '}
                    <span className="text-blue-500">
                      {activeJobRequests?.[0]?.skill.split('_').join(' ')}
                    </span>
                  </p>

                  {job?.userDetailsEntityList?.map(
                    (user: any, index2: number) => (
                      <div className="flex min-w-0 gap-x-4 mt-6" key={index}>
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={'https://www.gravatar.com/avatar/?d=identicon'}
                          alt="avatar"
                        />
                        <div className="min-w-0 flex-auto" key={index2}>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {user?.name ? user?.name : 'Delivery Boy'}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {formatDate(job?.timeline?.startDate)}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </>
              ))}
            </>
          )}
        </h2>

        <div className="border-t border-gray-300 my-4"></div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Pending Consignments -
        </h2>
        {!previousJobRequests?.length ? (
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
              {previousJobRequests.map((job: any, index: number) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50 opacity-50 filter grayscale pointer-events-none"
                      src={'https://www.gravatar.com/avatar/?d=identicon'}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {job?.skill?.split('_').join(' ') || 'Delivery Boy'}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {formatDate(job?.timeline?.startDate)}
                      </p>
                    </div>
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
              Trusted by the world’s most innovative teams
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div>
        {errorData && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {errorData}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerLive;
