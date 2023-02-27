# social-chatting-service-test

- [사용 기술](#사용-기술)
- [실행 방법](#실행-방법)
- [API 목록](#API-목록)

## 사용 기술
### Server
- Node.js + Typescript
- Express + Inversify
- TypeORM
- Socket.io

### Client
- React + Typescript + ESLint
- TailwindCSS
- Zustand
- Socket.io

### Database
- MySQL

## 실행 방법
1. [Client](./client) 폴더 이동
2. npm run build 실행 (server 폴더에 build 결과물 생성)
3. [Server](./server) 폴더 이동
4. .env.local 파일 생성
5. 환경 변수 편집  
DB_HOST=[DB_HOST]  
DB_DATABASE=[DB_DATABASE]  
DB_USERNAME=[DB_USERNAME]  
DB_PASSWORD=[DB_PASSWORD]  
SESSION_SECRET=[SESSION_SECRET]  
SESSION_EXPIRES=[SESSION_EXPIRES]  
5. npm run dev 실행
6. http://localhost:5000 접속

## DB 설계
[ERD Cloud 링크](https://www.erdcloud.com/d/E4YnHS2C6SzgNxAjS)
![image](https://user-images.githubusercontent.com/84849202/221701305-913a62c7-31cf-4023-8a8a-a7c43bd4cf26.png)

## API 목록
### Auth (/api/users)
1. POST /signup
- 회원가입
- Body
  - name: 이름(Login ID)
  - password: 비밀번호
3. POST /login
- 로그인
- Body
  - name: 이름(Login ID)
  - password: 비밀번호
4. POST /logout

### User (/api/users)
1. GET /
- 전체 사용자 조회 (Query 개선 필요)
2. GET /:userId
- userId 사용자 정보 조회
3. GET /:userId/friends
- userID 사용자 친구 목록 조회
4. GET /:userId/followers
- userID 사용자 팔로워 목록 조회
5. GET /:userId/following
- userID 사용자 팔로잉 목록 조회

### Friend (/api/friends)
1. GET /
- 현재 세션 사용자의 친구 목록 조회
3. PUT /api/:friendId
- friendId 사용자에게 친구 요청
5. DELETE /:friendId
- friendId 사용자 친구 목록에서 삭제
7. GET /requests
- 현재 세션 사용자의 받은 친구요청 목록 조회
9. PATCH /requests/:userId
- userId가 보낸 친구요청 수락/거절/차단
- body
  - status: "ACCEPTED"(수락) | "REJECTED"(거절) | "BLOCKED"(차단)
