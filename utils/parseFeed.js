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

const formatTitle = flowRight(scrubText, getTitle);

const formatDescription = flowRight(
  text =>
    truncate(text, {
      length: 500,
      separator: ' ',
    }),
  trim,
  scrubText,
  getDescription,
);

const formatDate = flowRight(
  date => date && moment(date).fromNow(),
  getDatePublished,
);

const getArticleInfo = article => ({
  title: formatTitle(article),
  description: formatDescription(article),
  datePublished: formatDate(article),
  link: getLink(article),
});

export default flowRight(
  (rawList = []) => rawList.map(getArticleInfo),
  getRawList,
);
