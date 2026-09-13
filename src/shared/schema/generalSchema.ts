import { z } from 'zod';

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function toEnglishDigits(value: string) {
    return value.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)));
}

export const mobileSchema = z
    .string()
    .trim()
    .min(1, 'شماره موبایل الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^09\d{9}$/.test(value), 'شماره موبایل معتبر نیست');

export const nationalIdSchema = z
    .string()
    .trim()
    .min(1, 'کدملی الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^\d{10}$/.test(value), 'کدملی باید ۱۰ رقم باشد');

export const postalCodeSchema = z
    .string()
    .trim()
    .min(1, 'کدپستی الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^\d{10}$/.test(value), 'کدپستی باید ۱۰ رقم باشد');
