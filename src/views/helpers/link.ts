import Handlebars from "handlebars";

export default (text: string, url: string) => {
  const parserUrl = Handlebars.escapeExpression(url);
  const parserText = Handlebars.escapeExpression(text);

  return new Handlebars.SafeString(`<a href="${parserUrl}">${parserText}</a>`);
};
