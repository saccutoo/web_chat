import {
    Client,
    // Object that contains the type definitions of every API method
    RequestParams,
    // Interface of the generic API response
    ApiResponse,
} from '@elastic/elasticsearch';
import IConfig from '../../config-interface';
const config: IConfig = require('../../../../appConfig.json')
const client = new Client({ node: config.elasticSearch.node })
client.cluster.health((err: any, resp: any) => {
    // console.log("🚀 ~ file: elastic-search-config.ts ~ line 10 ~ client.cluster.health ~ err", err)
    // console.log("-- Client Health --", resp);
});
// client.count({ index: config.elasticSearch.index, type: 'constituencies' }, function (err, resp) {
//     // console.log("constituencies", resp);
// });

export default client;