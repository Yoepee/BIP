![blueberrymain](https://user-images.githubusercontent.com/110077966/198212589-53111471-d79b-4ece-a60f-1285ee721531.png)

## 프로젝트 명 : BIP (Berry Important Promise)

 ![프로젝트 설명](https://user-images.githubusercontent.com/110077966/198213619-652adc49-1070-4a29-a212-61c60f69ffaf.jpg)
### 프로젝트 설명
- 올바른 약속 문화 만들기
- 상호 합의간에 조건을 걸고 조건을 지키면 서로 패널티가 없으나, 한쪽 상대방이 어기면 패널티를 지급하는 사이트
- 자신과의 약속, 상대방과의 약속, 팀과의 약속으로 구분하여 다양한 약속을 처리하는 기능

### 추가 주제 : 재능 기부 게시판을 통한 약속 나누기
- 재능 또는 도움이 필요한 사람들에게 도움을 나눠줄 수 있고, 나눔을 요청할 수 있는 기능 추가

 FE github : https://github.com/Yoepee/Week8.git

 BE github : https://github.com/LimeKIWI/Week8.git
 

<div align=center><h1>기술 📚 STACKS</h1></div>
<div>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
 <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">
  <img src="https://img.shields.io/badge/Material Design Icons-2196F3?style=for-the-badge&logo=materialdesignicons&logoColor=white">
  <img src="https://img.shields.io/badge/Material Design-757575?style=for-the-badge&logo=materialdesign&logoColor=white">
  <img src="https://img.shields.io/badge/Calendar-4285F4?style=for-the-badge&logo=googlecalendar&logoColor=white">
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=create React App&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/Kakao-FFCD00?style=for-the-badge&logo=Kakao&logoColor=black">
  <img src="https://img.shields.io/badge/Naver-03C75A?style=for-the-badge&logo=Naver&logoColor=white">
  <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=Gmail&logoColor=white">
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=for-the-badge&logo=Sourcetree&logoColor=white">
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
  <img src="https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
  <img src="https://img.shields.io/badge/ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=black">
  <img src="https://img.shields.io/badge/FileZilla-BF0000?style=for-the-badge&logo=FileZilla&logoColor=white">
</div>


    
## 프로젝트 구조

- 프로젝트 구조
    - 회원가입 & 로그인 (네이버 SENS, SMTP 문자 & 메일인증 구현 + Oauth 소셜 로그인 [ 네이버, 카카오 ], 슬라이드 [ MUI ])
    - 약속 리스트 (주간, 월간달력 [ React-Calendar, dayjs ], 실시간 날씨 정보 [ OpenWeather API ], 지도 [ KAKAO MAP, KAKAO GEOCODE, DAUM POSTCODE ])
    - 채팅방 ( WebSocket, STOMP, SockJS, 무한스크롤 [ Intersection Observer ] )
    - 재능기부 커뮤니티 (좋아요, 댓글, 신고하기, 이미지 리사이저 [ java-image-scaling ])
    - 멤버 리스트 (약속 상대 추가 [닉네임, 연락처 ], 친구 검색, 별명부여)
    - 나의 정보 ( 프로필, 신용점수 관리, 이용방법 )
    - 실시간 알림 ( 약속시간 하루, 1시간, 10분전 알림, 약속 초대, 채팅, 게시물 댓글 [ SSE ] )
    - 체크인
    - 반응형 웹 (PC, 모바일, PWA)
    - HTTPS ( EC2, CertBot, Nginx, node )
    
    #### 추가 기획안
    - 결제를 통한 약속 패널티 제공 기능 (기프티콘, 계좌이체 등)
    - 지도 검색 기능 개선
    - 관리자 페이지
    - GPS 연동
    - 구글, 애플 스토어 배포
    - 카카오 알림톡 약속 
    
  ### 프로젝트 가이드
  ![guide](https://user-images.githubusercontent.com/110077966/198209024-f88ced2c-1107-4ad1-8bef-f91c83f58b8f.png)

  
  # 프로젝트 계획 (9/16 ~ 10/28)

- SA 작성
- FE단 BE단 API작성
- 1주차
    - API설계, 화면구성 구체화
    - 아이디어 회의
    - 메인기능 구현 시작
- 2주차
    - 우선순위 기능 구현 시작
    - 기능구현 점검 및 추가 기능 구현
    - MVP 발표 준비
- 3주차
    - MVP 중간 발표
    - 서버 단 연결
    - 미흡사항 식별 및 조치
- 4주차
    - 최종 점검 및 버그 검사, 시뮬레이션 실시
- 5주차
    - 고객 유치 및 마케팅
    - 고객 반응 조사
    - 고객 참여 이벤트 개최
- 6주차
    - 최종 점검 및 마무리
    - 최종 발표 준비
