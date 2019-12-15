export const request = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
};