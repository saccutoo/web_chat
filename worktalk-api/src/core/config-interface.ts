export default interface IConfig {
    configId: {
        nodeServer: string,
        objTable: {
            [key: string]: string
        }
    },
    serverFile: {
        baseUrl: string,
        isUseDefaultName: string,
        subFolderPath: string
    },
    consul: {
        host: string,
        serviceName: string,
        port: string
    },
    elasticSearch: {
        node: string,
        index: string,
        mapppingType: string
    }
}