export interface ILayout{
    subNavData :  ISubNavData[],
    heading: string;
    activeKey : string;
}

export interface ISubNavData {
    name : string;
    path : string;
}