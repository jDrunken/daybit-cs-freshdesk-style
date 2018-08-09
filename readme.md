# freshdesk style builder




## 개발환경 설정하기
업로드 환경이 web form을 통해서 할 수 밖에 없는 상황이라 두가지 방법을 둘 다 채택하도록 합니다.






###	skin setting

빈 스타일시트를 하나 불러들여 이를 통해 파이핑을 할거에용.
포털관리에 들어가서 `포털 사용자정의 > 스타일시트`에 빈 스타일을 import 합시다.

``` css
@import '../style.css';
```

이렇게 하면 됩니다.
반드시 빈 스타일시트가 textarea에 추가되어 있는지 확인하세용.


###	chrome devtools 설정하기

1.	chrome의 개발자도구를 엽니다.
2.	source tab을 엽니다.
3.	왼쪽에 보이는 page / file system / Overrides / Content script 등등의 패널이 있는데 두개만 씁니다.
4.	Overrides tab을 눌러 추가할 파일의 폴더 위치를 잡아줍니다.
	여기서 sass builld repo의 폴더를 매핑합니다.
5.	page 탭을 눌러봅시다.
	오버라이딩할 스타일 파일을 저장합니다. (save for ovverrides)
6.	여기까지 진행하면 기초 개발준비는 끝난거에요.




####	주의사항

문법에 맞지않는 css 구문이 감지되면 스타일 파일이 그냥 죽어버립니다. 주의하세용.
elements에서 css 선언 수정하지 마세용. 계속 리로딩되는 버그가 있습니당.




###	sass build 환경 설정하기

```
npm install
```

실행은
```
gulp
```

### sass file 배포하기

```
gulp release
```

