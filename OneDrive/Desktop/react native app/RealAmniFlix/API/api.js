// endpoints
const Baseurl = `https://api.consumet.org/meta/anilist`;
const random = `${Baseurl}/random-anime`;


const apicall = async (endpoint) => {
  let ff = await fetch(endpoint);
  let ss = await ff.json();
  let data = ss;
  return data;
};

export const fetchtrending = (page) => {
  const updatedTrandingEndpoint = `${Baseurl}/trending?page=${page}`;
  return apicall(updatedTrandingEndpoint);
};
export const idfetch = () => {
  return apicall(info);
};
export const fetchpopular = (page) => {
  const updatedPopularEndpoint = `${Baseurl}/popular?page=${page}`;
  return apicall(updatedPopularEndpoint);
};
export const fetchrandom = () => {
  return apicall(random);
};
export const fetchrecent = (page) => {
  const updatedRecentEndpoint = `${Baseurl}/recent-episodes?page=${page}`;
  return apicall(updatedRecentEndpoint);
};

export const info = (aniid) => {
  const updateidinfo = `https://api.consumet.org/meta/anilist/info/${aniid}`;
  return apicall(updateidinfo);
};

export const fetchwatch = (watchid) => {
  const updatewatch = `https://api.consumet.org/meta/anilist/watch/${watchid}`;
  return apicall(updatewatch);
};
