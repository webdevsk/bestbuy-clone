import { Button, Typography } from '@material-tailwind/react';
import React from 'react'

const Hero = () => {
  return (
    <section className='bg-gradient-to-b from-[#fcc31e] to-[#f9e319]'>
        <div className="container py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className='col-start-1'>
                    <Typography variant='h3' className='font-serif text-theme leading-0 font-bold'>Boxing Day</Typography>

                    <Typography variant='h3' className='font-serif font-bold leading-0'>in Summer</Typography>
                </div>

                <div className='row-span-full col-start-1 md:col-start-2 md:row-span-4 flex items-center'>
                    <img src='src/assets/images/computing-20230803-feature-fg-bdis-computers-tablets-and-accessories-m.webp' />
                </div>

                <div className='col-start-1'>
                    <Typography variant='h2' className='font-serif leading-0'>Get hot summer deals on select computers, tablets, accessories, and more.</Typography>
                </div>
                <div className='col-start-1'>
                    <Button size='lg' >Shop Deals</Button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero