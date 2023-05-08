import en from '../../locale/product/ar.json' assert { type: 'json' };

function getTranslation(req, res) {
  const { page, language } = req.params;
  const url = `../../locale/${page}/${language}.json`;
  console.log(url);

  console.log(en);
  return res.json(en);
}

export { getTranslation };
