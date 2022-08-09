# SimpleBlog  
## API 명세서  
#### 회원 가입
method: POST  
URL: /user/join   
body: { email, name, password }    
response: {}  
  
#### 로그인
method: POST  
URL: /user/login  
body: { email, password }  
response: { token }  
  
#### 게시글 작성  
method: POST  
URL: /post/create/:userId  
body: { content }  
response: {}  
  
#### 게시글 조회  
method: GET  
URL: /post  
body: {}  
response: { posts }  
  
#### 게시글 상세 조회  
method: GET  
URL: /post/:postId  
body: {}  
response: { post }  
  
#### 게시글 수정  
method: PUT 
URL: /post/:postId  
body: { userId, content }  
response: {}  
  
#### 게시글 삭제  
method: DELETE  
URL: /post/:postId  
body: { userId }  
response: {}  
  
#### 댓글 생성  
method: POST  
URL: /comment/:postId  
body: { userId, content }  
response: {}  
  
#### 댓글 목록 조회  
method: GET  
URL: /comment/:postId  
body: {}  
response: { comments }  
  
#### 댓글 수정  
method: PUT  
URL: /comment/:commentId  
body: { userId }  
response: {}  
  
#### 댓글 삭제  
method: DELETE  
URL: /comment/:commentId  
body: { userId }  
response: {}  
  
#### 게시글 좋아요  
method: POST  
URL: /post/like/:postId  
body: { userId }  
response: {}  
  
#### 게시글 좋아요 취소 
method: DELETE  
URL: /post/like/:postId  
body: { userId }
response: {}  
  
  









