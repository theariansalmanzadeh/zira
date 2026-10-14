import { z } from 'zod';

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function toEnglishDigits(value: string) {
    return value.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)));
}

/** Keeps digits only (Persian digits converted to English). */
export function onlyNumber(value: string) {
    return toEnglishDigits(value).replace(/\D/g, '');
}

export const mobileSchema = z
    .string()
    .trim()
    .min(1, 'شماره موبایل الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^09\d{9}$/.test(value), 'شماره موبایل معتبر نیست');

export function isValidIranianNationalId(value: string) {
    if (!/^\d{10}$/.test(value)) return false
    if (/^(\d)\1{9}$/.test(value)) return false

    const digits = value.split('').map(Number)
    const sum = digits
        .slice(0, 9)
        .reduce((total, digit, index) => total + digit * (10 - index), 0)
    const remainder = sum % 11
    const check = remainder < 2 ? remainder : 11 - remainder
    return check === digits[9]
}

export const nationalIdSchema = z
    .string()
    .trim()
    .min(1, 'کدملی الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^\d{10}$/.test(value), 'کدملی باید ۱۰ رقم باشد')
    .refine(isValidIranianNationalId, 'کدملی معتبر نیست');

export const postalCodeSchema = z
    .string()
    .trim()
    .min(1, 'کدپستی الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^\d{10}$/.test(value), 'کدپستی باید ۱۰ رقم باشد');
