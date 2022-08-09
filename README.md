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
