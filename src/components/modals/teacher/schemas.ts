import zod from 'zod';

const phoneNumberRegex = /\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/;

export const teacherSchema = zod.object({
  firstName: zod
    .string({ required_error: "Введіть ім'я" })
    .min(1, 'Закоротка назва')
    .max(64, 'Завелика назва'),
  lastName: zod
    .string({ required_error: 'Введіть прізвище' })
    .min(1, 'Закоротка назва')
    .max(64, 'Завелика назва'),
  middleName: zod
    .string({ required_error: "Введіть ім'я по-батькові" })
    .min(1, 'Закоротка назва')
    .max(64, 'Завелика назва'),
  email: zod
    .string({ required_error: 'Введіть пошту' })
    .email({ message: 'Введіть пошту коректно' })
    .max(320, 'Занад-то довга пошта'),
  phoneNumber: zod
    .string({ required_error: 'Введіть номер телефону' })
    .regex(phoneNumberRegex, 'Введіть номер телефону коректно'),
});
