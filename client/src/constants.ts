export const FriendStatus = {
  ACCEPTED: "ACCEPTED", // 수락
  BLOCKED: "BLOCKED", // 차단
  REQUESTED: "REQUESTED", // 요청
  REJECTED: "REJECTED", // 거절
  NONE: "NONE",
} as const;

export type TFriendStatus = (typeof FriendStatus)[keyof typeof FriendStatus];

export const FollowStatus = {
  REQUESTED: "REQUESTED", // 요청
  FOLLOWED: "FOLLOWED", // 수락
  REJECTED: "REJECTED", // 거절
  BLOCKED: "BLOCKED", // 차단
  NONE: "NONE",
} as const;

export type TFollowStatus = (typeof FollowStatus)[keyof typeof FollowStatus];
