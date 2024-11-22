import Image from 'next/image';
import React from 'react';
import GDGLogo from "../../../../public/images/GDG_Logo.png"


const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center min-h-screen bg-gray-50'>
      <div className='w-[600px] bg-white h-screen'>
        <header className="flex px-6 py-4">
          <Image src={GDGLogo} alt="GDG 로고 이미지" width={46} height={27} />
        </header>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;