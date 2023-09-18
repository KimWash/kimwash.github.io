---
layout:  post
title:  H4Pay 개발기 - Flutter에서 검색을 하는법
category:  H4Pay
date:  "2022-01-21"
---

### 이제서야 검색을 해보게 된 이유
사실 지금까지는 프로젝트 단에서 검색을 구현할 필요가 크게 없었다. 플랫폼에서 오고가는 데이터 양이 적었기 때문이다. 하지만 다중 학교 지원 개발을 진행하면서 이 생각이 완전 바뀌게 되었다. 학교가 여러개로 늘어날 경우 검색을 해야하기 때문이다.

### Stream과 StreamController
자, 그럼 Flutter에서 검색버튼 없이 검색을 하기 위한 과정을 떠올려보자. TextField에서 뭔가 값이 변하면, 그 변한 값을 body에 포함해 API 요청을 보내고, 결과값을 사용자에게 표시해주면 끝이다. 이때 이 변한 값을 받아서 API 요청을 날려주는 친구가 바로 **Stream**이다. Stream. 말 그대로 흐름이다. 데이터를 만드는 곳과 소비하는 곳을 나눠 만들어진 데이터(검색쿼리)를 관찰하고 이에 대한 데이터를 네트워크에서 받아와 바뀐점을 알려줄 때 주로 사용한다. 나는 Retrofit과 FutureBuilder로 모든 API 요청을 일원화한 만큼 평상시에는 쓸 일이 없었고 지금처럼 검색을 하는 등의 특수한 상황에서 사용할 것 같다. 또, Stream은 원래 매번 listen 했다가 cancel 해줘야하는데 꽤나 비효율적이라 여러 스트림을 관리하기 위해 StreamController를 이용해 보다 깔끔하게 처리할 수 있다. StreamController와 Stream에서 관찰한 것을 UI에 반영하는 위젯인 StreamBuilder를 이용해 아래와 같이 코드를 작성할 수 있다. 핵심만 간단하게 적었으니 더 자세한 설명은 [여기](https://software-creator.tistory.com/9)에서 확인하시길 바란다.
```dart
final StreamController _searchStream = StreamController.broadcast();
...
@override
Widget build(BuildContext context) {
  return Column(
    children: [
      TextField(
        onChanged: (value) {
          _searchStream.add(value);
        }
      ),
      StreamBuilder(
        stream:_searchStream.stream,
        builder:(BuildContext context, AsyncSnapshot streamSnapshot) {
          if (streamSnapshot.hasData) {
            return FutureBuilder(
              future: service.getSchools(name: streamSnapshot.data);
              builder: ...
            )
          }
        }
      )
    ]
  )    
```

### 생각보다는 쉽네? 아 물론 백엔드는 고생하세요..
검색 기능을 구현하는 것이 생각보다는 쉬웠다. 백엔드에서는 MongoDB의 검색 기능을 이용해 검색을 처리할 수 있을 것이기 때문에 앱에서만 작업을 해주면 됐다. 고생할 백엔드에게 박수를.. 👏👏