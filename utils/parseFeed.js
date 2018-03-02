import selectN from 'selectn';
import moment from 'moment';
import { trim, truncate, flowRight } from 'lodash';

const scrubText = text =>
  text ? text.replace(/(<\/?[^>]+(>|$))|(&(.*?);)/g, '') : '';

const getRawList = (parsed = {}) =>
  selectN('feed.entry', parsed) || selectN('rss.channel[0].item', parsed) || [];

const getTitle = article =>
  selectN('title[0]._', article) || selectN('title[0]', article);

const getDescription = article =>
  selectN('description[0]', article) || selectN('content[0]._', article);

const getDatePublished = article =>
  selectN('pubDate[0]', article) || selectN('published[0]', article);

const getLink = article =>
  selectN('link[0].$.href', article) || selectN('link[0]', article);

const formatString = flowRight(
  text =>
    truncate(text, {
      length: 500,
      separator: ' ',
    }),
  trim,
  scrubText,
);

const formatTitle = flowRight(formatString, getTitle);

const formatDescription = flowRight(formatString, getDescription);

const formatDate = flowRight(
  date => date && moment(date).fromNow(),
  getDatePublished,
);

const createUniqueKey = article =>
  `${getDatePublished(article)}-${truncate(
    scrubText(getTitle(article), {
      length: 2,
      separator: ' ',
    }),
  )}`;

const getArticleInfo = article => ({
  title: formatTitle(article),
  description: formatDescription(article),
  datePublished: formatDate(article),
  link: getLink(article),
  key: createUniqueKey(article),
});

const removeDuplicateEntries = articles =>
  articles.filter(
    (article, index, list) =>
      index === list.findIndex(a => a.key === article.key),
  );

export default flowRight(
  removeDuplicateEntries,
  (rawList = []) => rawList.map(getArticleInfo),
  getRawList,
);
