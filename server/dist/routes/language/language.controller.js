function getTranslation(req, res) {
    const { page, language } = req.params;
    const url = `../../locale/${page}/${language}.json`;
    console.log(url);
}
export { getTranslation };
