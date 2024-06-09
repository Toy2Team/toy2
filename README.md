# 💪 헬스 캘린더

<div>
  <a href="https://health-two-silk.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/배포  URL 바로가기-4CD964?style=for-the-badge&logoColor=white" alt="배포 URL 바로가기"/>
  </a>
</div>

#### 테스트 계정

```
ID : dev@email.com
PW : 12345678
```

<br>

## 💪 프로젝트 소개

개인 운동 정보를 기록하고 관리할 수 있는 플랫폼을 제작했습니다.<br>
캘린더를 통해 PT 수업 받은 내용을 기록할 수 있습니다. 개인 트레이닝 수업을 신청하고, 신청한 내역과 개인 정보 및 신체 정보를 확인할 수 있습니다.

- 개발 기간 : 2024.05.27 ~ 2024.06.08
- [GitHub 레포지토리](https://github.com/Toy2Team/toy2)
- [피그마 URL](https://www.figma.com/design/7lEvIfutwvA9yO1EfXj5Kq/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B82_%ED%97%AC%EC%8A%A4%EC%BA%98%EB%A6%B0%EB%8D%94?m=dev&node-id=65-422&t=tar3EgTOtHJbRak2-1)

<br>

## 💪 팀원 소개 및 역할

|  <img src="https://avatars.githubusercontent.com/u/157576281?v=4" width="150px"/>   | <img src="https://avatars.githubusercontent.com/u/110236953?v=4" width="150px" /> |        <img src="https://avatars.githubusercontent.com/u/98334298?v=4" width="150px" />         | <img src="https://avatars.githubusercontent.com/u/133548706?v=4" width="150px" /> |
| :---------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
|                       [박민주](https://github.com/minnug-dev)                       |                     [유현욱](https://github.com/YuHyeonWook)                      |                              [이동희](https://github.com/ldh9669)                               |                    [정보현](https://github.com/jeongbohyeoun)                     |
| 전체 디자인<br>PT신청, 신청 내역 페이지<br> 공통 컴포넌트(Button, Input)<br> 반응형 |      초기 개발 세팅</br>로그인 회원가입 기능구현</br> 마이페이지 프로필 구현      | 캘린더 이벤트 렌더링<br>이벤트 별로 색상 묶음 구현<br>이벤트 정량 초과 표현 및 미니 모달창 구현 |                   캘린더 페이지<br>일정 추가,삭제,수정 기능구현                   |

<br>

## 💪 사용한 기술 스택

|            | Stack                                                                                                                                                                                                                                                                                                                                      |
| :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 개발 환경  | <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">                                                                                                                                      |
|  유틸리티  | <img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=ESlint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black"> <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">             |
|   디자인   | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">                                                                                                                                                                                                                                       |
| 개발 언어  | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">                                                                                                                                                                                                                             |
| 라이브러리 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white"> |
|    서버    | <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">                                                                                                                                                                                                                                 |
|    배포    | <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>                                                                                                                                                                                                                                    |
|   협업툴   | <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">                                                                                                                                    |

<br>

## 💪 구현 사항

### ✔️ 로그인 & 회원가입

![image](https://github.com/FE8-Team6/test/assets/110236953/14d147c3-1ad5-4ffe-98b4-0a5c70d30a6f)

![image](https://github.com/FE8-Team6/test/assets/110236953/1780bfb4-4fd4-4870-88b3-8eb10efec731)

- firebase를 이용해서 로그인, 회원가입 기능 구현
- 유효성 검사 기능 구현
  <br><br>

---

### ✔️ 마이페이지

![image](https://github.com/FE8-Team6/test/assets/110236953/8b4e2617-2a2c-4964-9fb7-417a6759e91f)

![image](https://github.com/FE8-Team6/test/assets/110236953/96784f26-3519-41c8-9ed2-7e07f120fb54)

- Firebase의 realtime, storage를 이용하여 이미지 업로드 및 이메일, 닉네임, 생년월일, 전화번호 기능 구현함
- 유저 닉네임 data를 zustand를 활용하여 신청 내역에 보이도록 구현 및 로컬스토리지에 저장함
  <br><br>

---

### ✔️ 캘린더

![image](https://github.com/FE8-Team6/test/assets/110236953/8b738986-b55e-496e-9769-df5d19fc4259)

![image](https://github.com/FE8-Team6/test/assets/110236953/8ccb897c-4737-4a7e-9f5d-a8e39667c94c)

- Firebase 의 realtime database 를 이용하여 일정 추가, 삭제, 수정 기능 구현함
- Firebase 의 인증 객체를 활용하여 로그인 시 자신의 데이터만 볼 수 있게 구현함
- 일정의 시작 날짜가 종료 날짜보다 늦을 경우, 일정 추가와 수정 불가능하게 구현함
  <br><br>

### ✔️ 캘린더 이벤트 렌더링

![image](https://github.com/FE8-Team6/test/assets/110236953/7803b8a6-0a50-4f83-90f2-3b4a420e9d26)

- 운동추가 버튼으로 Firebase에 추가한 데이터를 불러와 시작일부터 종료일까지 해당하는 날짜에 이벤트들을 렌더링
- 이벤트 시작일과 종료일까지 이벤트를 id로 묶어 동일한 이벤트임을 선언하며 색상을 묶음으로 같은 이벤트임을 직관적으로 확인하기 쉽게 가시성을 높임
- 캘린더 날짜에 표시할 수 있는 이벤트 개수를 초과했을 시 +n more 버튼으로 숨겨진 이벤트가 몇 개 더 있는지 표시
- more 버튼을 누르면 미니 모달창으로 해당 날짜에 등록된 이벤트 전체 표시
- 미니 모달창에 렌더링 된 이벤트 클릭 시 수정 가능한 모달창 열림
  <br><br>

---

### ✔️ PT 신청 관리

![image](https://github.com/FE8-Team6/test/assets/110236953/5a08bda7-27fb-4012-8abc-fd824fa2ac81)

#### PT 신청

- Firebase 데이터베이스 및 인증 객체를 활용하여 로그인 시 현재 인증된 사용자 ID로 구분되어 특정 사용자 데이터 관리
- useState 훅 사용하여 신청 내용(날짜, 트레이너, 횟수, 비용) 상태 관리
- 원하는 횟수를 선택 시 해당 비용 자동적으로 업데이트

![image](https://github.com/FE8-Team6/test/assets/110236953/7e239954-a4fa-48d9-9e84-3a7d4790397d)

#### PT 신청 내역

- 사용자 ID가 변경될 때마다 Firebase 데이터베이스에서 신청 내역 데이터 관리
- 트레이너 이름에 따라 색상을 설정하는 함수를 사용하여 사용자의 직관성 높임
- 해당 내역이 5개 초과 시 페이지네이션 기능 구현

<br><br>

## 💪 요구사항 수행 체크

### 필수 요구사항

1. 급여 내역 확인 및 정정 신청 페이지 구현 ✅
   - 로그인을 통한 개인의 급여 내역 확인 구현
   - 확인 후, 업무 연장 / 무급 휴가 사용 / 휴일 근무 등 미반영에 대한 정정 신청 창 구현
     - 각 카테고리 선택 가능 혹은 입력 하여 진행 가능 구현
     - 신청 완료 or 불가 팝업 창 구현
     - 신청 내역 확인
2. 캘린더를 통한 업무 확인 페이지 구현 ✅
   - 일정 추가, 삭제, 수정 가능 구현
     - 캘린더 페이지 구현
   - 캘린더 안, 저장한 일정 확인
     - 일정이 있는 경우, 다른 일정과 구분 표시
3. netlify 등을 이용한 정적 페이지 배포 ✅

### 선택 요구사항

- useState / useReducer 을 활용한 상태관리 구현 ✅
- Sass / styled-component를 활용한 스타일 구현 ✅
- react 상태를 통한 할일 CRUD 구현 ✅
- 파이어베이스를 이용한 로그인 구현 ✅
- custom hook 을 통한 비동기 처리 구현 ✅
- redux를 통한 데이터 관리 구현
