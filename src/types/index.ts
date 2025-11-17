export interface IUser {
	_id: string;
	username: string;
	email: string;
}

export interface IRegisterData {
	username: string;
	email: string;
	password: string;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IAuthResponse {
	token: string;
	user: IUser;
}
