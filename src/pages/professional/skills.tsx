import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Loader } from '../../components/Loader';
import Navbar from '../../components/Navbar';

const ProfessionalSkills = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkill] = useState<any[]>([]);
  const [skillsList, setSkillsList] = useState<any[]>([]);

  const handleSkillCardClick = (product: any) => {
    setSelectedSkill((prevSelectedSkills) => {
      if (prevSelectedSkills.some((p) => p.skillName === product.skillName)) {
        // If the product name exists in the array, remove it
        return prevSelectedSkills.filter(
          (p) => p.skillName !== product.skillName
        );
      }
      // If the product name does not exist in the array, add it
      return [...prevSelectedSkills, product];
    });
  };

  const fetchAllSkills = async () => {
    setIsLoading(true);
    try {
      // Fetch all the skills
      const res = await axios.get('http://35.200.228.175:8080/v1/data/skill');
      if (res.data.skills.length > 0) {
        setSkillsList(res.data.skills);
      }
    } catch (error: any) {
      setErrorDetails(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSkills();
  }, []);

  const handleSkillsSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const dataPayload = {
      userId: localStorage.getItem('token'),
      skillList: selectedSkills,
    };
    try {
      const response = await axios.post(
        'http://35.200.228.175:8080/v1/user/edit-professional-user-details',
        dataPayload
      );

      if (response && response.data.userType === 'PROFESSIONAL') {
        router.push('/professional/live');
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
        <title>Pragati Professional Skills Portal</title>
        <meta name="description" content="Pragati Professional Skills Portal" />
      </Head>
      <Navbar />
      <div className="flex min-h-full mx-auto max-w-4xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Select your relevant skills
          </h1>
        </div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {skillsList.map((product, index) => (
                <a
                  key={index}
                  onClick={() => handleSkillCardClick(product)}
                  className={`group ${
                    selectedSkills.some(
                      (p) => p.skillName === product.skillName
                    )
                      ? 'selected'
                      : ''
                  }`}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageUrl}
                      alt={product.skillName}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700 px-2">
                    {product.skillName}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gray-900 px-2">
                    Income : Min. {product.rate}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSkillsSubmit}
            className="rounded-md theme-red-bg px-3 w-full py-2 text-sm font-semibold text-white shadow-sm hover:theme-red-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <div className="flex flex-center justify-center">
                <Loader /> Loading ...
              </div>
            ) : (
              'Proceed'
            )}
          </button>
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

export default ProfessionalSkills;
