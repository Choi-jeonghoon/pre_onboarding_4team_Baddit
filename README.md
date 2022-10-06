# Bodit_API

## 📌 개요
- 회원관리 및 운동 능력 기록 앱에 대한 RESTful API 서버


## 📌 구현 기능
```
1. 회원
    - 회원 정보 등록하기
    - 회원 목록 가져오기
    - 특정 회원 정보 가져오기
    - 특정 회원 정보 수정하기
    - 특정 회원 삭제하기
        - 회원 정보는 실제로 삭제하지 않고, 비식별화 처리합니다.
        - 회원의 측정 데이터는 삭제되어서는 안됩니다.
```
```
2. 측정 기록
    - 특정 회원의 측정 기록들(목록) 가져오기
    - 특정 측정 기록 및 측정 데이터 가져오기
    - 특정 회원에 대한 측정 기록과 측정 데이터 생성
    - 측정 기록 삭제하기
        - 반드시 연결되어 있는 측정 데이터도 같이 삭제되어야 합니다.
```
## 📌 기능 구현에 대한 조건 및 제약 사항

- 측정 기록은 반드시 하나 이상의 측정 데이터와 맵핑됩니다.
    - 따라서, 측정 기록 업로드 시에 측정 데이터 또한 같이 업로드 되어야 합니다.
- 하나의 측정 기록에 대해서 맵핑되는 측정 데이터의 종류가 중복되는 경우는 없습니다.
    - ex) 측정 기록 하나에는 손목 가동성이 하나이거나 없을 수는 있지만, 둘 이상일 수는 없습니다.
- 어깨 굴곡과 어깨 신전은 반드시 한 세트입니다.
    - 측정 기록 하나에는 어깨 굴곡과 어깨 신전이 둘 다 없거나 둘 다 하나씩 있습니다.
- 값의 유효성 검사는 필수입니다.
    - ex) 보행은 0 ~ 100의 정수값입니다. 이 범위를 벗어나거나 타입이 다르면 에러 응답(400)을 리턴합니다.
    
## 📌 적용 기술

- 사용언어 : `Javascript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `Mysql`

## 실행방법

### 1.해당 레포지토리를 clone합니다.

```
git clone https://github.com/Choi-jeonghoon/pre_onboarding_4team_Bodit
```

### 2. 다운 받으신 폴더로 들어갑니다

```
cd pre_onboarding_4team_Bodit
```

### 3. 의존성들을 설치합니다.

```
npm i
```

### 4. 실행시킵니다!

```
npm start
```

### 📌DB 모델링 및  조건 및 졔약사항
<img width="883" alt="스크린샷 2022-10-06 오후 5 18 06" src="https://user-images.githubusercontent.com/68211978/194260270-3588bed9-7693-410b-aa85-261f176cfb35.png">



- 조건 및 제약사항
    - 회원과 측정 기록은 1:N 관계입니다.
    - 측정 기록과 측정 데이터는 1:N 관계입니다.
    - 하나의 측정 기록에 대해서 측정 데이터의 종류가 중복되는 경우는 없습니다.
        - ex) 측정 기록 하나에 손목 가동성이 하나이거나 없을 수는 있지만, 둘 이상일 수는 없습니다.


## 📌 프로젝트 구조
Layered achitecture으로 routers - controllers - services - models
```
📦Baddit
 ┣ 📂controllers
 ┣ 📂database
 ┣ 📂middleware
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂services
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```
## ⚙ 패키지
```json
{
  "name": "-pre_onboarding_4team_baddit",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mysql": "^2.18.1",
    "mysql2": "^2.3.3",
    "typeorm": "^0.3.10"
  },
  "devDependencies": {
    "dotenv": "^16.0.3",
    "nodemon": "^2.0.20"
  }
}
```

## 📌 구현 기능 소개 및 API 명세
- 박 지은 - 회원 목록 가져오기
     - 탈퇴한 회원을 포함한 전체 회원 목록뿐 아니라 필터링 기능을 추가하여 탈퇴한 회원을 포함하지 않은 목록도 조회할 수 있도록 구현했습니다.
요청에 query로 filter = active가 들어올 경우에는 로직 내의 if문에 따라, filter 변수에 WHERE문이 할당되어 회원 이름이 ***인 경우를 제외한 목록만 조회하도록 했습니다.
query가 없는 경우와 filter = active를 제외한 나머지의 경우 에러 처리했습니다. 
<img width="459" alt="스크린샷 2022-10-06 오후 6 05 23" src="https://user-images.githubusercontent.com/68211978/194272328-6edd69be-cf7e-40ec-9247-47b8775db076.png">


- 안 수철 - 회원 등록/삭제
    - 회원 정보는 실제로 삭제하지 않고, 비식별화 처리합니다.
    - 회원의 측정 데이터는 삭제되어서는 안됩니다.
        - 회원가입 
            - 필수입력 데이터가 입력 되지않은 경우 적절한 에러 처리. 
            - 입력 데이터의 타입이 맞지 않은 경우 적절한 에러 처리. 
            - 핸드폰 번호의 경우 01012345678이 원하는 형식이지만 010-1234-5678도 입력 가능, 데이터베이스에 저장 시 01012345678으로 저장, 10자리 또는 11자리가 아닌 경우 적절한 에러 처리
        - 회원 탈퇴(데이터 삭제가 아닌 비식별화) 
            - query로 입력된 회원PK값이 숫자가 아닌 다른 값이 들어온 경우 적절한 에러 처리. 
            - 존재하지 않는 회원PK값의 경우 에러 처리. 이미 비식별화 된 회원인 경우 에러 처리.
<img width="1303" alt="스크린샷 2022-10-06 오후 6 19 12" src="https://user-images.githubusercontent.com/68211978/194275964-2cc77c31-5fd0-46a0-b269-7717c382966f.png">


- 이 해연 - 특정 회원 정보 가져오기(조회)/수정


- 김 현정 - 특정 회원에 대한 측정 기록과 측정 데이터 생성(등록) 및 삭제
    - 특정 회원에 대한 측정 기록과 측정 데이터 생성(등록)
: 유효성 검사 후 측정 기록과 측정 데이터 값이 들어가도록 기능을 구현하였습니다. 아래는 유효성 검사 목록입니다.
    - 측정 데이터가 하나 이상 들어가는지 검사
    - 측정 데이터 종류의 중복 여부 검사
    - 해당 측정 데이터의 종류가 존재하는지 검사
    - 어깨 굴곡& 어깨 신전의 값이 둘 중 하나만 들어오는지 검사
    - 측정 데이터의 값이 정수인지 검사
    - 각 측정 데이터의 범위 값을 넘어 섰는지 확인
    - 특정 회원에 대한 측정 기록과 측정 데이터 삭제
  : 측정 기록의 id값을 가지고와서 연관된 측정 데이터들이 삭제되도록 기능을 구현
  
- 기능을 구현하면서 고려하였던 점
유지보수성을 염두해두고 기능을 구현하였습니다.
예시로 처음에는 측정 데이터의 값 범위를 하드코딩으로 구현을 하였지만, 코드가 지저분 해질 뿐더러 나중에 유지보수를 할 때도 불편할 것 같아 데이터베이스에 최소 범위와 최대 범위 값을 지정 해둔 뒤, 해당 쿼리로 검사를 할 수 있게 기능을 수정하였습니다.
처음에 switch 문으로 일일이 값 범위를 검사하던 코드에서 측정 데이터의 id값과 입력된 값을 쿼리에 보내기만 하면 되는 코드로 간편하게 수정되었습니다.

<img width="1292" alt="스크린샷 2022-10-06 오후 6 26 20" src="https://user-images.githubusercontent.com/68211978/194277380-404cf9a3-86b8-4997-9d82-9227ae738cad.png">

- 최 정훈 - 특정 측정 기록 및 측정 데이터 가져오기
    - 회원이 가지고 있는 측정 데이터값이 여러개 이기때문에 JSON_ARRAYAGG(JSON_OBJECT()사용
      했으며, 특정 회원의 기록값을 보기 위해 회원과 기록의 ID값을 이용하여 아래와 같이 구현했습니다.
<img width="515" alt="스크린샷 2022-10-06 오후 6 01 58" src="https://user-images.githubusercontent.com/68211978/194271286-20125ff5-8b64-4c63-84ec-72cc5c1e4f34.png">

- 안 상현 - 특정 회원의 측정 기록들(목록) 가져오기
    - 특정 회원의 측정 기록(측정 날짜, 측정시 몸무게) 목록을 가져오게 구현 했습니다.
    - 존재하지 않는 회원의 아이디가 전달될 경우 적절한 에러 처리를 했습니다. 
<img width="1311" alt="스크린샷 2022-10-06 오후 6 38 51" src="https://user-images.githubusercontent.com/68211978/194280251-1083f5ef-3391-4d96-894d-16d9b0a0b133.png">

## 📌 Commit Convention
```
Feat(Add) : 새로운 기능 추가 
Fix : 버그 수정 
Docs : 문서 수정 
Style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 
Refactor: 코드 수정
Test : 테스트 코드, 리펙토링 테스트 코드 추가 
Comment: 필요한 주석 추가 및 변경
Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
Remove: 파일을 삭제하는 작업만 수행하는경우

```
