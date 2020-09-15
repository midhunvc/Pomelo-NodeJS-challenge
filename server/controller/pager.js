'use-strict';
const request = require('request')

exports.pagination = async (body) => {
    return new Promise(async(resolve,reject) => {
        let datas=[];
            let data;
            let endpoint = "https://api.github.com/search/code?q=addClass+user:mozilla&per_page=1000";
            await request.get(endpoint,{ headers: { "User-Agent": "request" } },
                function(err, res, body) {
                    for(i=0;i<JSON.parse(body).items.length;i++){
                        data=JSON.parse(body).items[i];
                        delete data['repository'];
                        delete data['git_url'];
                        delete data['html_url'];
                        delete data['url'];
                        data=JSON.stringify(data);
                        datas.push(data)
                    }
                    resolve(datas);
                    return true;
                }
            );
    });
};
