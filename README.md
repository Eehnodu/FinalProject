# 🎧 음악하세(팀명: 도개발윷모)
![logo](https://github.com/Eehnodu/FinalProject/assets/155136516/07cf47d0-5747-48c2-aeda-164d28d4f8be)


## 👀 서비스 소개
* 서비스명: AI를 활용한 음악 추천 서비스 반응형 웹
* 서비스설명: 사용자가 입력한 현재 상태 정보를 기반으로 AI를 이용하여 플레이리스트를 추천 및 다양한 플레이리스트 제공, 차트를 활용한 사용자 개인 데이터 시각화
<br>


## 📅 프로젝트 기간
2024.05.01 ~ 2024.06.20 (6주)
<br>

## ⭐ 주요 기능
* 기능1 : 선호도 및 사용자 상태 파악 질문
* 기능2 : 선호도 평가 질문 제시(회원가입 시)
* 기능3 : 질문을 통한 사용자 분석 및 AI를 활용한 플레이리스트 추천
* 기능4 : 계절 및 장르별 자동 추천
* 기능5 : Chart.js를 활용한 개인 및 사용자 데이터 시각화
* 기능6 : 음원 및 큐레이션 데이터 크롤링
* 기능7 : 검색 기능
* 기능8 : 머신러닝(XgBoost)를 활용한 AI 개발
<br>

<details>
<summary><b>주요 기능 설명 펼치기</b></summary>
<div markdown="1">

* 기능1 : 선호도 및 사용자 상태 파악 질문
  <br>선호도 질문
  ```
  # DB에 저장된 정보 가져오기
  @RequestMapping("/joiningSurvey")
	public List<SurveyVO> joiningSurvey(HttpSession session) {
		if (session != null) {
			session.invalidate();
		}

		List<SurveyVO> SurveyList = surveyMapper.joiningSurvey();

		return SurveyList;
	}
  
  # ajax를 통해 반환
  $.ajax({
            url: `${cpath}/joiningProcess`,
            type: "post",
            data: $("form").serialize(),
            success: function(response) {
               // console.log(response);
               $.ajax({
                  url: `${cpath}/joiningSurvey`,
                  type: "post",
                  success: function(result) { // 결과 성공 콜백함수
                     window.history.pushState({}, '', `${cpath}/`);
                     console.log(response);
                     console.log(result);
                     
                     // console.log(response); response 가져
                     // 선언된 변수에 초기 HTML 구조를 설정합니다.
                     
                     // 선호도 조사 꾸미기
                     let htmlContent = `
  
    <form id="toggleForm" onsubmit="handleSubmit(event)">
      <fieldset class="checkbox-group">
      <h4 class="h4survey">선호도 조사</h4>
        <legend class="checkbox-group-legend">Choose your favorites</legend>
        <legend class="three">최대 3개까지 선택해주세요</legend>
`;
  ```
  <br>상태파악 질문
  ```
@GetMapping("/AIrecommend")
	public String AIrecommend(Model model) {
		Random ran = new Random();
		List<SurveyVO> Que = surveyMapper.aiQuestion();
		List<SurveyVO> Ans = surveyMapper.aiAnswer();
		Map<String, List<SurveyVO>> questionMap = new HashMap<>();
		Map<String, List<SurveyVO>> answerMap = new HashMap<>();

		// 카테고리 초기화
		String[] categories = { "emotion", "situation", "place", "people", "genre" };
		for (String category : categories) {
			questionMap.put(category, new ArrayList<>());
			answerMap.put(category, new ArrayList<>());
		}

		// 질문을 카테고리별로 분류
		for (SurveyVO que : Que) {
			if (questionMap.containsKey(que.getSurItem())) {
				questionMap.get(que.getSurItem()).add(que);
			}
		}

		// 답변을 카테고리별로 분류
		for (SurveyVO ans : Ans) {
			if (answerMap.containsKey(ans.getSurItem())) {
				answerMap.get(ans.getSurItem()).add(ans);
			}
		}

		// 랜덤 질문을 모델에 추가
		for (String category : categories) {
			List<SurveyVO> ques = questionMap.get(category);
			if (!ques.isEmpty()) {
				model.addAttribute(category + "Que", ques.get(ran.nextInt(ques.size())));
			}
		}

		// 모든 답변을 모델에 추가
		for (String category : categories) {
			model.addAttribute(category + "Ans", answerMap.get(category));
		}

		return "AIrecommend";
	}

  ```
* 기능2 : 선호도 평가 질문 제시(회원가입 시)
* 기능3 : 질문을 통한 사용자 분석 및 AI를 활용한 플레이리스트 추천
* 기능4 : 계절 및 장르별 자동 추천
* 기능5 : Chart.js를 활용한 개인 및 사용자 데이터 시각화
* 기능6 : 음원 및 큐레이션 데이터 크롤링
* 기능7 : 검색 기능
* 기능8 : 머신러닝(XgBoost)를 활용한 AI 개발

</div>
</details>

## ⛏ 기술스택
<table>
    <tr>
        <th>구분</th>
        <th>내용</th>
    </tr>
    <tr>
        <td>사용언어</td>
        <td>
            <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/>
            <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>
            <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
	    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>라이브러리</td>
        <td>
	<img src="https://img.shields.io/badge/AJAX-FFFFFF?style=for-the-badge"/>
	<img src="https://img.shields.io/badge/BootStrap-7952B3?style=for-the-badge&logo=BootStrap&logoColor=white"/>
          <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
        </td>
    </tr>
    <tr>
        <td>개발도구</td>
        <td>
	    <img src="https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=Eclipse&logoColor=white"/>
            <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/>
	    <img src="https://img.shields.io/badge/Jupyter%20Notebook-F37626.svg?&style=for-the-badge&logo=Jupyter&logoColor=white"/> 
        </td>
    </tr>
    <tr>
        <td>서버환경</td>
        <td>
            <img src="https://img.shields.io/badge/Apache Tomcat-D22128?style=for-the-badge&logo=Apache Tomcat&logoColor=white"/>
            <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white"/> 
        </td>
    </tr>
    <tr>
        <td>데이터베이스</td>
        <td>
            <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
        </td>
    </tr>
    <tr>
        <td>협업도구</td>
        <td>
            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
        </td>
    </tr>
</table>


<br>

## ⚙ 시스템 아키텍처
![아키텍처](https://github.com/Envoy-VC/awesome-badges/assets/155121578/85619e76-a6f6-4cd8-8680-18dd34177faa)
<br>

## 📌 SW유스케이스
![유스케이스](https://github.com/Eehnodu/Project/assets/155121578/3f63bc55-87c4-45ad-ad3d-eac5cff29e1f)
<br>

## 📌 서비스 흐름도
![서비스흐름도 drawio](https://github.com/Eehnodu/FinalProject/assets/155136516/f075a2c5-248b-4966-a844-db612f811ac3)
<br>

## 📌 ER다이어그램
<img width="741" alt="ERD(ver Aquery)" src="https://github.com/Eehnodu/crawling_test/assets/155121578/a98b1740-c2f2-487b-992e-c85420a637b6">
<br>

## 🖥 화면 구성







|🎞 서비스 소개 페이지 |
|:---:|
| ![image](https://github.com/Eehnodu/Eumakase/assets/155121578/a22a46ae-acdb-4455-84a9-b0f377d9a605)|

|🎞 메인 페이지 |🎞 메인 페이지 |
|:---:|:---:|
|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/9057a45d-6694-455e-a970-f9c8904096ea)|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/f5b4c6e5-13eb-4595-94b2-720216f13287)|

|🎞 AI 추천 페이지 |🎞 AI 추천 결과 페이지 |
|:---:|:---:|
|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/359e8810-c346-4b05-8cdb-68b24220d6cc)|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/dcfd1290-0e16-4909-9f69-ec93ea146815)|

|🎞 마이 페이지 |🎞 마이 페이지 |
|:---:|:---:|
|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/74621c9a-d005-4682-8b9a-0ba228bd5f6a)|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/881db3e7-0880-4fed-a740-02eb900da717)|

|🎞 플레이리스트 상세 페이지 |
|:---:|
|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/d8e56db6-9f4c-4926-be85-9988ae7505f5)|

|🎞 곡 상세 정보 페이지 |
|:---:|
|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/7cbf260f-c910-4d3b-993a-adaa6d7db39d)|

|🎞 검색 페이지 |
|:---:|
|![image](https://github.com/Eehnodu/Eumakase/assets/155121578/697a3821-bc2a-45f7-9bc5-80bfe9651b10)|



## 👨‍👩‍👦‍👦 팀원 역할
<table>
  <tr>
    <td align="center"><img src="https://i.namu.wiki/i/GirsrnQUH-q5qbVv871h4zLg_H1X25k25qY-Vr5DcO6xV8MWdcENwySAA0M62Xyurjt3ezZUbPm7GoVYJRRXWGIAXpWJ0_zsEH0mxNsLH2S_GX54w9exBaOg6io06JjbYZRHQiPSyUwPoLzRFA5aeQ.webp" width="100" height="100"/></td>
    <td align="center"><img src="https://mb.ntdtv.kr/assets/uploads/2019/01/Screen-Shot-2019-01-08-at-4.31.55-PM-e1546932545978.png" width="100" height="100"/></td>
    <td align="center"><img src="https://github.com/2024-SMHRD-KDT-BigData-23/FitNeeds/assets/155136709/60cfda0f-23f4-4e5d-a953-12565033b91b" height="100"/></td>
    <td align="center"><img src="https://i.pinimg.com/236x/ed/bb/53/edbb53d4f6dd710431c1140551404af9.jpg" width="100" height="100"/></td>
    <td align="center"><img src="https://pbs.twimg.com/media/B-n6uPYUUAAZSUx.png" width="100" height="100"/></td>
  </tr>
  <tr>
    <td align="center"><strong>김동현</strong></td>
    <td align="center"><strong>엄희수</strong></td>
    <td align="center"><strong>우동희</strong></td>
    <td align="center"><strong>조범수</strong></td>
    <td align="center"><strong>정규원</strong></td>
  </tr>
  <tr>
    <td align="center"><b>Back-end, DB</b></td>
    <td align="center"><b>Front-end</b></td>
    <td align="center"><b>Back-end, DB, Modeling</b></td>
    <td align="center"><b>Front-end, Back-end</b></td>
    <td align="center"><b>Front-end</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/dohdark" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/heesooooooo" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/Eehnodu" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/beomsu-j" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/Jungkyuwonnn" target='_blank'>github</a></td>
  </tr>
  <tr>
    <td align="center"><b>Crawling 및 데이터 전처리<br><br>마이페이지 구현<br><br>플레이리스트 상세페이지 DB에서 정보 가져오기 구현<br><br>동기, 비동기 검색 구현<br><br>플레이리스트 CRUD 기능<br></td>
    <td align="center"><b>UI/UX 디자인<br><br>소개 페이지 구현<br><br>AI 음악추천, 곡 정보 페이지 구현<br><br>검색창, 검색 결과 페이지 구현<br><br>회원관리 기능 구현<br></td>
    <td align="center"><b>PM<br><br>DB 설계 및 구축<br><br>XgBoost를 활용한 AI 개발<br><br>Crawling<br><br>Flask를 통한 AI 추천 결과 연동<br><br>다른 사용자 플레이리스트 화면 구현<br><br>곡 정보 페이지 Youtube iframe 구현<br><br>계절 및 장르별 추천 플레이리스트<br></td>
    <td align="center"><b>Crawling<br><br>OpenCV를 통한 색감 정보 추출<br><br>Google Vision, Transtation API를 활용한 이미지 객체 인식 구현<br><br>텍스트마이닝을 통한 큐레이션 데이터 분석<br><br>Chart.js를 통한 개인 및 사용자 데이터 시각화<br></b></td>
    <td align="center"><b>UI/UX 디자인<br><br>메인 페이지, 마이페이지 구현<br><br>AI 음악 추천 및 결과 페이지 구현<br><br>곡 정보, 플레이리스트 페이지 구현<br></b></td>
  </tr>
</table>

## 🤾‍♂️ 트러블슈팅


<details>
<summary>
### 🔨 Chart.js 로딩 속도 문제<br>
</summary>
- 문제<br>
	
  STS와 MySQL 연결 및 시각화의 어려움
  Value Object와 컨트롤러 호출의 빈번함
  Chart를 불러오는 과정에서 화면에 늦게 출력되는 시간이 10초 이상 걸림.

- 원인<br>

  STS에서 Mybatis를 이용하여 데이터를 가져옴
  데이터의 볼륨과 거치는 테이블이 많아서 속도 저하가 된다고 생각함.
 
- 해결방안<br>

  Pymysql에서 SQL쿼리문으로 해결하여 flask를 통해 값을 받아옴.
 
- 코드<br>
```
# pymysql 연결
def get_connection():
    return pymysql.connect(
        host='project-db-cgi.smhrd.com',
        port=3307,
        user='ehroqkfdbcah',
        password='q1w2e3!@#',
        db='ehroqkfdbcah',
        charset='utf8',
        cursorclass=pymysql.cursors.DictCursor
    )

# 값을 불러오는 sql문
def get_my_genre(input_memid):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            get_context_sql = """
                SELECT s.surDesc, COUNT(*) as count
                FROM tb_context c
                JOIN tb_survey s ON c.surIdx = s.surIdx
                WHERE c.memId = %s
                  AND s.surType = 'A'
                  AND s.surItem = 'genre'
                GROUP BY s.surDesc
                ORDER BY count DESC
                LIMIT 3;
            """
            cursor.execute(get_context_sql, (input_memid))
            results = cursor.fetchall()
            mygenre_list = [{'surDesc': row['surDesc'], 'count': row['count']} for row in results]
            return mygenre_list
    finally:
        conn.close()

# sts와 flask 연결
@app.route('/getmygenre', methods=['POST'])
def get_my_genre_endpoint():
    content = request.json
    input_memid = content['memid']
    genre_data = get_my_genre(input_memid)
    return jsonify(genre_data).

```

</details>



