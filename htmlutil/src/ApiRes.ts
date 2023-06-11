
type ApiRes = {
    message: string;
    result: City[];
}

type City = {
    prefCode: string;
    prefName: string;
}

export {ApiRes, City}