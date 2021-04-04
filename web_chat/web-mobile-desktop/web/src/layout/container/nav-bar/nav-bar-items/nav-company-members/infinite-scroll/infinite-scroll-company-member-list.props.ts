import { ICompanyMember } from "../company-member/company-member.props";

export interface IInfiniteScrollCompanyMemberList{
    showCompanyMemberList:(companyMember: ICompanyMember[]) => void,
    iconpanel:number,
    className: string,
    setCompanyMemList?:any,
    textSearch?: string,
}