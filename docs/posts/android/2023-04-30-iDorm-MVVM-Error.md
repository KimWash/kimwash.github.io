---
layout:  post
title: MVVM - Mutation 처리를 예쁘게, 제대로 해보아요.
category:  Android
date:  "2023-04-30"
---


### 시작하기 앞서

프로젝트 노션에 있던 문서를 그대로 블로그로 옮긴 것입니다. MVVM을 안드로이드 프로젝트에 도입하면서 어느정도 정착한 구조입니다. 심각한 최적화 문제가 있을 수도 있습니다. 함부로 적용하는 바보짓은 하지 마시고, 능력자분들께서는 부디 이 구조의 문제점에 대해 지적하고 더 나은 구조를 가져갈 수 있도록 알려주시면 감사하겠습니다 🙏 

React Query에서 쓰이는 단어가 네트워크 요청을 표현하기 좋아 보여 사용해봤어요. 

- Query: 단건/다건 등 조회가 이루어지는 로직
- Mutation: 생성/수정/삭제 등 DB 변동을 일으키는 로직

### UI 단에서 네트워크 요청의 성공/실패가 반영되는 법 `UIErrorHandler`

공통 에러를 제외하면 다음과 같다.

- Query
    1. UI에 표시 (커스텀 뷰에 데이터바인딩해서 선언적 에러 처리 가능, 명령적으로 처리 필요 X)
    2. Dialog/BottomSheet 등 Modal
    3. 예외
- Mutation
    - Dialog/BottomSheet 등 Modal
    - Toast
    - 예외

### 공통로직 레이어화

- Activity/Fragment별 성공시 공통 로직?
- MutableStateFlow별 성공시 공통 로직?

⇒ 

<aside>
❓ Mutation의 Request에 대한 정보를 갖고 있어야 할까요? 
혹시 모를 예외를 대비하기 위해 갖고 있는 것으로 할게요.

</aside>

1. MutableStateFlow에 emit 되는 Sealed Class MutationEvent의 SubClass 들은 Mutation Object에 `request` 와 `state` 를 갖고 있어 각 요청 별 상태 관리와 함께 기존 요청에 따른 액션 처리 또한 가능해요. 특히 이건 collector로 흐름이 이동함에 있어서 네트워크 요청 후에 요청에 담긴 데이터로 UI 변경이 필요한 경우 유용해요. 
    
    ex) 댓글 삭제 요청에서 삭제된 댓글을 UI에 반영하기 위해 request에 담겨 있던 댓글 id 꺼내 해당 부분 UI에서 제거
    
    ```kotlin
    sealed class MutationEvent {}
    sealed class UserMutationEvent(open val mutation: Mutation<*, *>) : MutationEvent() {
        class AddLikedMatchingInfo(override val mutation: Mutation<MutateFavoriteRequestDto, Boolean>) :
            UserMutationEvent(mutation)
    		class ReportMatchingInfo(override val mutation: Mutation<ReportRequestDto, Boolean>) :
            UserMutationEvent(mutation)
    		...
    }
    
    data class Mutation<P, R>(val request: P, val state: State<R>)
    ```
    
2. MutableStateFlow를 collect 하고 있는 collector에서 이벤트를 분기해 처리해주어요.
    
    ```kotlin
    lifecycleScope.launch {
                viewModel.userMutationEvent.collect { event ->
                    setLoadingState(event?.mutation?.state?.isLoading() ?: false)
                    when (event) {
                        is UserMutationEvent.AddLikedMatchingInfo -> {
                            if (event.mutation.state.isError())
                                binding.cardStackView.rewind()
                        }
                       is UserMutationEvent.ReportMatchingInfo -> {
                            if (event.mutation.state.isSuccess())
                                OkDialog("사용자를 신고했어요. 불편을 드려 죄송해요.", onOk = 
                                    modalBottomSheet.dismissAllowingStateLoss()
                                }).show(this@MatchingFragment.requireContext())
                            else if (event.mutation.state.isError())
                                OkDialog("사용자 신고에 실패했어요.", onOk = {
                                    modalBottomSheet.dismissAllowingStateLoss()
                                }).show(this@MatchingFragment.requireContext())
                        }
    									...
    						}
    }
    ```
    
3. 공통 작업을 처리 해주기 위해 collector 당 하나의 UIErrorHandler가 붙어요. 
4. UIErrorHandler는 주어진 특정 Event를 제외하고는 모두 공통 동작으로 동작하게 해요. (모달 등?)

### Infrastructure

- ResultUseCase
    
    runCatching을 이용해 성공일 경우 State.Success를, 실패할 경우 State.Error를 반환하는 abstract UseCase 클래스에요. 이 친구 덕에 미친듯이 중복되던 runCatching 코드를 줄이고, 여기서 나온 State를 바로 Mutation으로 wrap하고 emit할 수 있게 됐어요.
    
    ```kotlin
    abstract class ResultUseCase<P, R> {
        abstract suspend fun onExecute(params: P): R
    
        suspend fun run(params: P): State<R> {
            try {
                IDormLogger.d(this, "Running UseCase $this with following params: $params")
                return kotlin.runCatching {
                    State.Success(onExecute(params))
                }.getOrElse { State.Error(it) }
            } catch (e: Exception) {
                IDormLogger.e(
                    this,
                    "Exception ${e.javaClass.canonicalName} occurred while running UseCase: $this\nDetail: ${e.stackTraceToString()}"
                )
                throw e;
            }
        }
    }
    ```
    
- MutableStateFlow
    
    ```kotlin
    private val _userMutationEvent: MutableStateFlow<UserMutationEvent?> = MutableStateFlow(null)
        val userMutationEvent: MutableStateFlow<UserMutationEvent?>
            get() = _userMutationEvent
    ```
    

### 남겨진 숙제

MVVM 구조에서 에러 처리를 공통적으로 할 수 있는건 빼내기 위해 노력해봤어요. 

- 개발을 빠르게 진행하고 싶어서 막 하다보니 비슷한 아키텍처로 UiState, presentation.board.State 클래스와 함께 resultState 들이 나뉘어져 개발된 등 여러 시행착오로 남은 상처들이 있어요.
    
    이러한 이유로 일부 코드에서 패키지까지 적혀있어 코드가 더러워졌어요. 극혐이네요.
    
    ```kotlin
    } else if (it is org.appcenter.inudorm.util.State.Error) {
    ```
    
- 에러 내용/성공 데이터 가져올 때 캐스팅 필수
    
    아래 코드에서 if 문을 이용해 state가 State.Error 임이 명확해졌음에도 명시적으로 type casting을 해야 해요. 이건 코틀린 제네릭에 대한 이해가 부족한 채로 개발해서 생긴 문제 같은데, 어떻게 해결할 방법이 있지 않을까요? 해결법을 아시는 분은 댓글에 달아주시면 깊이 감사하겠습니다.
    
    ```kotlin
    private val userMutationCollector = FlowCollector<UserMutationEvent> {
            IDormLogger.i(this, it.toString())
            when (it) {
                is UserMutationEvent.DeleteDislikedMatchingInfo,
                is UserMutationEvent.DeleteLikedMatchingInfo,
                -> {
                    if (it.mutation.state.isSuccess()) viewModel.getMates()
                    else if (it.mutation.state is State.Error) {
                        **OkDialog((it.mutation.state as State.Error).error.message ?: "알 수 없는 오류입니다.")**
                    }
                }
                is UserMutationEvent.ReportMatchingInfo -> {}
                else -> {}
            }
        }
    ```