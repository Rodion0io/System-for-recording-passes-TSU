export interface LogInDatas{
    email: string,
    password: string
}

export interface registrationDatas{
    name: string,
    email: string,
    password: string
};

export interface userSliceDatas{
    token: string | null,
    logIn: boolean
};

export interface UserModel{
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    userType: string
};