export const joinURL = (base, path) => {
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '').replace(/\\/g, '/')}`;
};


  