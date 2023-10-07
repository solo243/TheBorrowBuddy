const apicall = async (endpoint) => {
  const call = await fetch(endpoint);
  const real = await call.json();
  const data = real;
  return data;
};

export const ProfilePreview = (uid) => {
  const newa = `https://server7-wb1d.onrender.com/v3/profileview/${uid}`;
  return apicall(newa);
};

export const ProfilePosts = (uid) => {
  const url = `https://server7-wb1d.onrender.com/v4/profilepost/${uid}`;
  return apicall(url);
};

export const Category = (item) => {
  const CategorySearch = `https://server7-wb1d.onrender.com/v9/categoryposts/${item}`;
  return apicall(CategorySearch);
};

export const popularfetch = () => {
  const url = "https://server7-wb1d.onrender.com/v12/popular/post";
  return apicall(url);
};

export const SearchQ = (quary) => {
  const url = `https://server7-wb1d.onrender.com/v10/posts/search/${quary}`;
  return apicall(url);
};

export const ProductDetail = (id) => {
  const url = `https://server7-wb1d.onrender.com/v11/postdetail/${id}`;
  return apicall(url);
};

export const Deals = () => {
  const url = `https://server7-wb1d.onrender.com/v14/deals`;
  return apicall(url);
};

export const ProfileUpdate = (id) => {
  const url = `https://server7-wb1d.onrender.com/v7/updateprofile/${id}`;
  return apicall(url);
};

export const Checkreqest = (id) => {
  const url = `https://server7-wb1d.onrender.com/r3/checkrequest/${id}`;
  return apicall(url);
};
