const HOST = 'http://192.168.43.150:5151';
//const HOST = 'https://lw-line.glitch.me';

export function dataFetch(endpoint, params, options) {
  let stringifiedParams = '';

  if (params) {
    // TODO try using array..reduce
    for (const key in params) {
      stringifiedParams += `${key}=${params[key]}`;
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`${HOST}/${endpoint}/?${stringifiedParams}`)
      .then(res => res.json())
      .then(jsonRes => {
        resolve(jsonRes);
      })
      .catch(dataFetchError => {
        resolve('ERROR');
        console.log(`${dataFetchError} <= dataFetchError \n ** ${endpoint}`);
      });
  });
}