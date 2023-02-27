# social-chatting-service-test

- [사용 기술](#사용-기술)
- [실행 방법](#실행-방법)

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
