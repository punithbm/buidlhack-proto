export interface IUserInfo {
    jwt: string;
    user: User;
}
export interface User {
    email: string;
    firstVisit: string;
    id: string;
    lastVisit: string;
    newUser: boolean;
    projectEnvironmentId: string;
    verifiedCredentials?: null[] | null;
}

class LocalStorageClass {
    userInfo = {
        set: (userInfo: IUserInfo) => {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
        get: (): IUserInfo | null => {
            try {
                const userInfoString = localStorage.getItem("userInfo");
                if (userInfoString) {
                    return JSON.parse(userInfoString) as IUserInfo;
                }
                return null;
            } catch (err) {
                return null;
            }
        },
        delete: () => {
            localStorage.removeItem("userInfo");
        },
    };
}

const localStorageService = new LocalStorageClass();

export { localStorageService };
