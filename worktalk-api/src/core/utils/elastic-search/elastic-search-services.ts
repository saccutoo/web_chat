import IConfig from "../../config-interface";
import client from "./elastic-search-config";
import { IMessageSearch, ISearchResponse } from "./elastic-search-interface";
const config: IConfig = require('../../../../appConfig.json')


export const elasticSearchService = {
    insertElasticSearch: async (data: any) => {
        return await client.index({
            index: config.elasticSearch.index,
            type: config.elasticSearch.mapppingType,
            body: data
        });
    },
    searchElasticSearch: async (payload: any) => {
        return await client.search<ISearchResponse<IMessageSearch>>({
            index: config.elasticSearch.index,
            type: config.elasticSearch.mapppingType,
            body: payload
        });
    },
    updateElasticSearch: async (data: any) => {
        let body = {
            script: {
                lang: 'painless',
                source: 'ctx._source["house"] = "stark"'
            },
            query: {
                match: {
                    character: 'stark'
                }
            }
        }
        return await client.updateByQuery({
            index: config.elasticSearch.index,
            type: config.elasticSearch.mapppingType,
            body: data,
        });
    },
    countElasticSearch: async (data: any) => {
        return await client.count({
            index: config.elasticSearch.index,
            body: data
        })
    }

}
