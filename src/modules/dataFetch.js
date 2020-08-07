//const HOST = 'https://lw-line-backend.glitch.me';
const HOST = 'http://localhost:5151';

export function dataFetch(endpoint, params, options) {
  let stringifiedParams = '';

  if (params) {
    // TODO try using array..reduce
    for (const key in params) {
      stringifiedParams += `${key}=${params[key]}&`;
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`${HOST}/${endpoint}/?${stringifiedParams}`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.status === 'ERROR') {
          reject(new Error("Couldn't fetch"));
          return;
        }
        resolve(jsonRes.data);
      })
      .catch(dataFetchError => {
        console.log('Thorwing erro in catch');
        reject(new Error("Couldn't fetch"));
        console.log(`${dataFetchError} <= dataFetchError \n ** ${endpoint}`);
      });
  });
}
