export interface IModal {
    headerContent: string,
    children: React.ReactElement,
    context?: React.ReactElement
    contextHasClose?: any,
    hasPadding: boolean,
    open: boolean,
    funtionCloseNew?: any,

}