'use client'

import { Marquee } from "./InfiniteSlider"

const Banner = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return (
        <>
            {!isLoggedIn && <Marquee className='bg-inverse-surface py-lg' reverse={true}>
                <span className='text-on-inverse-surface!'>برای مشاهده قیمت‌ها و پیشنهاد‌ات ویژه وارد حساب کاربری شوید</span>
            </Marquee>}
        </>
    )
}

export default Banner