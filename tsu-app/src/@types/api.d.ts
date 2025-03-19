export interface LogInDatas{
    email: string,
    password: string
}

export interface UserRegisterModel{
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    password: string
};

export interface userSliceDatas{
    token: string | null,
};

export interface requestSliceData{
    requestId: string
}

export interface UserModel{
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    userTypes: string[]
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
    status: string,
    username: string,
    absenceDateFrom: string,
    absenceDateTo: string
}

export interface RequestData{
    description: string,
    absenceDateFrom: Date | null,
    absenceDateTo: Date | null,
    photos: File[]
}

export interface PhotoCard{
    photo: File | string,
    id: number,
    remover?: (id: number) => void,
    isShown: boolean,
    isDeleted: boolean
}

export interface FilterModel{
    sortType: string,
    requestStatus: string,
    dateFrom: string,
    dateTo: string,
    userName?: string
}

export interface RequestModel{
    createTime: string,
    id: string,
    status: string,
    firstName: string,
    middleName: string,
    lastName: string,
    checkerUsername: string,
    description: string,
    images: string[],
    userId: string,
    absenceDateFrom: string,
    absenceDateTo: string
}

export interface RequestEditModel{
    status?: string,
    images?: string[],
    description: string,
    absenceDateFrom: string,
    absenceDateTo: string,
    newImages?: File[]
}

export interface TokenResponseModel{
    accessToken: string,
    refreshToken: string
}

export interface RefreshTokenRequestToken{
    userId: string,
    refreshToken: string
}

export interface UserFullModel{
    user: UserModel,
    requests: RequestModel[];
}

export interface ExportUserInforamtion{
    id: string,
    firstName: string,
    middleName?: string,
    lastName: string
}

export interface ExportDatas{
    targetUsersId: string[],
    dateFrom: string,
    dateTo: string
}

export interface selectedValue{
    value: string,
    id: string
}