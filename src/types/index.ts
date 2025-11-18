export interface IUser {
	_id: string;
	id?: string;
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

export interface IChannel {
	_id: string;
	name: string;
	owner: IUser;
	participants: IUser[];
	createdAt: string;
}

export interface ICreateChannelData {
	name: string;
}

export interface IMessage {
	_id: string;
	channelId: string;
	sender: IUser;
	text: string;
	createdAt: string;
}

export interface ISendMessageData {
	channelId: string;
	text: string;
}

export interface IGetChannelParticipantsResponse {
	participants: IUser[];
	owner: IUser;
}
