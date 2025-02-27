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

export interface UserEditModel{
    password: string
}

export interface RequestListModel{
    requestsList: RequestShortModel[]
}

export interface RequestShortModel{
    createTime: string,
    id: string,
    // reasonId нужно будет потом убрать
    reasonId?: string,
    status: string,
    username: string,
    userType: string,
    absenceDateFrom: string,
    absenceDateTo: string
}

export interface RequestData{
    
}

export interface PhotoCard{
    photo: File
}

//Под вопросом
// export interface CreateRequestModel{
//     absenceDateFrom: string,
//     absenceDateTo: string,
//     description: string,
//     photos?: object[]
// };