import React from 'react'
import { Icon } from '../Icons/Icon'
import { FOOTER_CONTENT } from './content'
import Link from 'next/link'


const Footer = () => {
    return (
        <footer className='bg-surface-container-lowest p-lg flex flex-col gap-2xl [&>*]:text-on-surface-variant'>
            <div className='grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-lg border-b border-dashed border-outline-variant pb-2xl'>
                <div className='flex flex-col items-center justify-start md:col-span-1 row-span-1 md:row-span-2 col-start-1 col-span-2 border-b md:border-b-0 border-dashed border-outline-variant'>
                    <Icon label='logoType' className='w-[150px] h-[60px]' />
                </div>
                {FOOTER_CONTENT.map((item, index) => (
                    <Link key={index} href={item.link} className='text-center text-on-surface-variant'>
                        {item.label}
                    </Link>
                ))}
            </div>
            <div className='flex flex-row items-center justify-center gap-sm'>
                <Icon label='youtubePlain' />
                <Icon label='twitterPlain' />
                <Icon label='instagramPlain' />
            </div>
            <span className='text-center text-on-surface-variant'>
                ©[Business Name], 2026.
            </span>
        </footer>
    )
}

export default Footer