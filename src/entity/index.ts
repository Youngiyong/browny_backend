import AdminUser from './AdminUser';
import QnaAggregation from './QnaAggregation';
import QnaComment from './QnaComment';
import QnaLike from './QnaLike';
import Qna from './Qnas';
import QnaTag from './QnaTag';
import SocialAccount from './SocialAccount';
import Tag from './Tag';
import User from './User';
import UserFollow from './UserFollow';
import UserProfile from './UserProfile';

const entities = [
  User,
  UserProfile,
  UserFollow,
  AdminUser,
  SocialAccount,
  QnaTag,
  QnaAggregation,
  QnaLike,
  QnaComment,
  Qna,
  Tag
];

export default entities;
