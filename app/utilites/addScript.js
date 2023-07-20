const AddScript = (url, async,crossOrigin) => {
    async = async || false;
    crossOrigin = crossOrigin || false;
    const script = document.createElement("script");
    script.src = url;
    script.async = async;
    if (crossOrigin)
        script.crossOrigin = crossOrigin;
    document.body.appendChild(script);
};
export default AddScript;