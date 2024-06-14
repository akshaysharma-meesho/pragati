import React, { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';

const ProfessionalSkills = () => {
  const router = useRouter();
  const [selectedSkills, setSelectedSkill] = useState<number[]>([]);

  const handleSkillCardClick = (id: number) => {
    setSelectedSkill((prevSelectedSkills) => {
      if (prevSelectedSkills.includes(id)) {
        // If the id exists in the array, remove it
        return prevSelectedSkills.filter((skillId) => skillId !== id);
      }
      // If the id does not exist in the array, add it
      return [...prevSelectedSkills, id];
    });
  };

  const products = [
    {
      id: 1,
      name: 'Delivery Boy',
      href: '#',
      price: '$48',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt:
        'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Delivery Boy',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt:
        'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Delivery Boy',
      href: '#',
      price: '$89',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt:
        'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Delivery Boy',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt:
        'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
      id: 5,
      name: 'Delivery Boy',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt:
        'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
      id: 6,
      name: 'Delivery Boy',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt:
        'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
  ];

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
              {products.map((product) => (
                <a
                  key={product.id}
                  onClick={() => handleSkillCardClick(product.id)}
                  className={`group ${
                    selectedSkills.indexOf(product.id) > -1 ? 'selected' : ''
                  }`}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700 px-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gray-900 px-2">
                    Income : {product.price} to {product.price}
                  </p>
                </a>
              ))}
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
            onClick={(e) => {
              e.preventDefault();
              router.push('/professional/live');
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfessionalSkills;
