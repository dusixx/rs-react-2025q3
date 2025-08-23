export const Gender = {
  Male: 'male',
  Female: 'female',
} as const;

export type User = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: (typeof Gender)[keyof typeof Gender];
  country: string;
  avatar: string;
};

export type UserWithConfirm = User & {
  agreement: boolean;
  confirm: string;
};

export const LabelName: Record<Capitalize<keyof UserWithConfirm>, string> = {
  Name: 'name',
  Age: 'age',
  Email: 'email',
  Password: 'password',
  Gender: 'gender',
  Country: 'country',
  Avatar: 'avatar',
  Agreement: 'agreement',
  Confirm: 'confirm',
} as const;
