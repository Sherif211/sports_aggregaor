const AddStyleSheet = (url, async) => {
    async = async || false;
    const script = document.createElement("link");
    script.href = url;
    script.async = async;
    document.head.appendChild(script);
};
export default AddStyleSheet;