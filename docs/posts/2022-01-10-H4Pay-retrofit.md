---
layout:  post
title:  H4Pay 개발기 - Retrofit, 드디어 적용하다
category:  H4Pay
date:  "2022-01-10"
---
### 경고
>이 글은 Retrofit의 사용법보다는 개인의 경험을 중심적으로 서술해놓았습니다. 감안하고 읽어주셨으면 합니다. 
### Retrofit이 뭔데?
![Retrofit logo](https://blog.kakaocdn.net/dn/dp0clO/btqNMNsUs4c/uIt6J39kVlDx0KqnNfOoMK/img.png)
Retrofit에 대한 정의나 설명은 다른 훌륭한 분들이 적어놓으셨다. [여기](https://todaycode.tistory.com/38)에 의하면 "서버와 클라이언트 간 http 통신을 위한 라이브러리" 라고 하는데.. 내가 이해한 바에 의하면 그것을 도와주는 라이브러리에 더 가까웠다. 왜냐하면 Retrofit도 결국 클라이언트로는 OkHttp를 사용하고 있기 때문이다. 근데 굳이 이걸 쓰는 이유는, 심각하게 코드를 단축시킬 수 있기 때문이다. 
### 자기반성 Time
나는 나름 실제 프로덕트를 개발하고 있음에도 정말이지 "끔찍하다"라는 말이 아깝지 않게 진행해왔다. 아래는 주문번호를 이용해 주문 데이터를 불러오는 API를 호출하는 부분이다. 극혐 삼박자가 딱 맞아 떨어진다.
![code.](https://lh3.googleusercontent.com/FQ-uktP9qDgSPJ17-fnQBePVspc2VtjzYqgAt1nTZd7kdjAZE2JhFOs33r6FvqOggNSJdjnB2aEgXEB8Kq2s0kwoib4WoM4KGSL8dLQy2TEXbjE6bBFe1Pv5TbVQ94gTXYx8Fsj1uOS6w8jWP2O1nn1ZKTNnj6kVL3XMPudf2r8_9kDbS02LebVuqvX9v5Sb7eifiHC_SEdPOGSZt_gbHM7XV7kmnuT4uSN-cpXbqtuQKxAcyk972Z9L0fGgsMzFsa0Io6YQwuY1Z0lk1yZtBX09l2tuk3-vQhNLZglmlkwq-s8NpBKGfY4gC2CesKI1FQQmATgkm7OSsxxEohrMONvzw2wTghkYzqeyL1aHXKcDCM6b9QAZ5NK-bPocUj-K0X6AU4qYTzNFhiPJAy7bGE-eOYjHdXJedRstGYBqGQ5c5IIySw1PRQml3uB_htVImeQC4sx_hU-KuLJ-Lm6AK8QphJ4EDguosgIUOQ9xSYMxNzf2WkfnFacOcKTEXwVsL-U2SCpV4jYMLaLw0OdCnA-aZq7OpR0fP5IvjJnXUtTMOe73lsHKBGaTP4jWQ7UY52KzztXJDrZcblx32nyr_phowxojAjN7cqdQogor1SMgkFkn7SVhHSZlKvaQmZEtIimcHOMnwXwVnrYOgCLrsMAX_mK5g_qpI8mx00pU7GaBiQeMqTj_JSNKFKlWIwM5op4kRCqp9dsJRIYc4YipJFfD=w1220-h730-no?authuser=0)
조금만 알면 바로 문제가 보이시리라고 생각되지만, 스스로 복기하기 위해무엇이 문제인지 적어본다..
1. deprecate된 AsyncTask를 쓰고 있다. 하하...
2. 있을지 없을지 확실하지 않은 field를 불러오고 있다.
3. 제일 심각한, **예외 처리가 안돼있다.**

![uh...](https://media3.giphy.com/media/kBI5aLB6wlw4zNnecN/giphy.gif?cid=ecf05e473l19xepe1rrq40b4uuqkbkfi75d0b8en0qtw7bdn&rid=giphy.gif&ct=g)

### 사실.. 오래전부터 널 지켜보고 있었어..
Retrofit이 안드로이드에서 많이 쓰이는 건 알고 있었다. 하지만 적용해보지 못한 이유 중 하나가, 우리 백엔드 API의 데이터 구조다. response body를 파싱하면 status, message, result key가 있고 실제 결과값은 result key에 대응되는 구조라서 result의 데이터형에 따라 경우의 수가 나뉘어서 짜증난다. 사실 관련 자료가 많이 나와 있는데 검색을 열심히 해보지 않았던 것 같다. 또 다시 반성한다..
>문제 해결에 [이 글](https://medium.com/mj-studio/%EC%84%9C%EB%B2%84-%EC%9D%91%EB%8B%B5-cherry-pick-okhttp-interceptor-eaafa476dc4d)의 도움을 많이 받았다. 감사합니다 😅
### 큰 흐름
위의 솔루션을 몰랐을 때는 그냥 Response 클래스에 result:T?를 지정해두고 진행하려고 하다보니 직렬화가 사실상 불가능하다는걸 깨닿고, 다시 검색을 해보기로 했다. 그 결과 위의 글을 발견했다.
큰 흐름은 다음과 같다.
1. OkHttp의 기능 중 하나인 Interceptor를 이용해 response를 중간에 intercept한다 
```kotlin:MainActivity.kt
val client = OkHttpClient.Builder()  
    .addNetworkInterceptor(networkInterceptor) 
    .build()
```
2. 그 response를 ResponseWrapper 객체로 만들고, ResponseWrapper의 result를 역직렬화 한 다음 새로운 response body에 집어넣는다.
```kotlin:NetworkInterceptor.kt
val type = object:TypeToken<ResponseWrapper<*>>() {}.type  
val res = try {  
    val result = gson.fromJson<ResponseWrapper<*> (rawJsonResponse, type) ?: throw JsonParseException("Failed to parse json")  
    if (!result.status) ResponseWrapper<Any>(response.code, false) else result  
} catch (e:JsonParseException) {  
    ResponseWrapper(-900, false, "Failed to parse json")  
} catch (t: Throwable) {  
    ResponseWrapper(-901, false, "Unknown Error")  
}
```
4. 해당 response body를 반환해준다.

사실 생각보다 간단하다. 중간에 처리를 해주는 중간자를 넣는 것 뿐이다. 
### 이제 플러터에도 적용해볼까?
Flutter용 Retrofit에서 사용하는 클라이언트, dio에서도 interceptor를 지원한다. 다음 포스트 소재가 될 것 같다.