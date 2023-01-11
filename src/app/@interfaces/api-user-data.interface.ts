export interface IApiUserData {
  uuid: string,
  email: string,
  fullName: string,
  role: {
    id: number,
    authority: string
  },
  password?: string,
  color?: string
}
