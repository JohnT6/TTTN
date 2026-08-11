export type registerData = {
  name: string;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
};

export type loginData = {
  email: string;
  password: string;
};

export type userProfileData = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  role: string;
  address?: string | null;
  createdAt: Date;
};