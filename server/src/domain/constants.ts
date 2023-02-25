export const USER_CONSTANT = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 10,
  MIN_NICKNAME_LENGTH: 1,
  MAX_NICKNAME_LENGTH: 10,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 14,
};

export const DIRECT_CONSTANT = {
  MIN_MESSAGE_LENGTH: 1,
  MAX_MESSAGE_LENGTH: 100,
};

export const FriendStatus = {
  REQUESTED: "REQUESTED", // 요청
  ACCEPTED: "ACCEPTED", // 수락
  REJECTED: "REJECTED", // 거절
  BLOCKED: "BLOCKED", // 차단
} as const;

export type TFriendStatus = typeof FriendStatus[keyof typeof FriendStatus];

export const FollowStatus = {
  REQUESTED: "REQUESTED", // 요청
  FOLLOWED: "FOLLOWED", // 수락
  REJECTED: "REJECTED", // 거절
  BLOCKED: "BLOCKED", // 차단
} as const;

export type TFollowStatus = typeof FollowStatus[keyof typeof FollowStatus];
