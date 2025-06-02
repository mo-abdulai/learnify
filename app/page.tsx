import React from 'react'
import {Button} from "@/components/ui/button";
import CompanionCard from '@/components/CompanionCard';
import CompanionList from '@/components/CompanionList';

import { recentSessions } from '@/constants';
import Cta from '@/components/Cta';

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard 
        id="123"
        name="Mohammed"
        topic="Science"
        subject="English Literature"
        duration={45}
        color="#A45"
        />
           <CompanionCard 
        id="123"
        name="Mohammed"
        topic="sicenc"
        subject="Maths"
        duration={45}
        color="#FF4F"
        />
           <CompanionCard 
        id="123"
        name="Mohammed"
        topic="Science"
        subject="excercise"
        duration={45}
        color="#F4FF"
        />
        
      </section>
      <section className='home-section'>
      <CompanionList title="Recently COmpleted"
      companions={recentSessions} 
      classNames="w-2/3 max-lg:w-full"/>
      <Cta/>
      
      </section>
    </main>
  )
}

export default Page