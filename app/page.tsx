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
        id="1"
        name="My English Companion"
        topic="Articulations"
        subject="English Literature"
        duration={45}
        color="#A433"
        />
           <CompanionCard 
        id="2"
        name="My Science Companion"
        topic="Human Anatomy"
        subject="Biology"
        duration={45}
        color="#FF4F"
        />
           <CompanionCard 
        id="3"
        name="My Coding Companion"
        topic="Server and client Component"
        subject="React Js"
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