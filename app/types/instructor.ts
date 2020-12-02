export interface IInstructor {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  shortBio: string;
  bio: string;
  picture: string;
  access_token?: string;
}

export interface IInstructorLoginDTO {
  username: string;
  password: string;
}

export interface INewInstructorDTO {
  username: string;
  email: string;
  picture: string;
  firstName: string;
  lastName: string;
  password: string;
  bio: string;
  shortBio: string;
}

export interface IUpdateInstructorDTO {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  picture?: string;
  lastName?: string;
  newPassword?: string;
  currentPassword?: string;
}
