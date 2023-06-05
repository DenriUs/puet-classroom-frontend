import zod from 'zod';

const phoneNumberRegex = /\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/;

export const teacherSchema = zod.object({
  firstName: zod
    .string({ required_error: "Введіть ім'я" })
    .min(2, "Закоротке ім'я")
    .max(64, "Занадто довге ім'я"),
  lastName: zod
    .string({ required_error: 'Введіть прізвище' })
    .min(2, 'Закоротке прізвище')
    .max(64, 'Занадто довге прізвище'),
  middleName: zod
    .string({ required_error: "Введіть ім'я по-батькові" })
    .min(2, "Закоротке ім'я по-батькові")
    .max(64, "Занадто довге ім'я по-батькові"),
  email: zod
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Введіть пошту коректно' })
    .max(320, 'Занад-то довга пошта'),
  phoneNumber: zod
    .string({ required_error: 'Введіть номер телефону' })
    .regex(phoneNumberRegex, 'Введіть номер телефону коректно'),
});
